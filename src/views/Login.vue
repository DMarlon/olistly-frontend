<template>
    <b-container fluid>
        <b-row class="vh-100"  align-v="center" align-h="center">
            <b-col md="3">
                <b-card v-if="isLogin" header="Olistly" class="text-center">
                    <b-card-text class="pt-4">
                        <b-input-group size="lg" class="mb-2">
                            <b-form-input id="login" v-model.trim="form.login" type="email" placeholder="Informe o login" />
                            <template v-slot:prepend>
                                <b-input-group-text><b-icon-person-fill /></b-input-group-text>
                            </template>
                        </b-input-group>

                        <b-input-group size="lg" class="mb-2">
                            <template v-slot:prepend>
                                <b-input-group-text><b-icon-lock-fill /></b-input-group-text>
                            </template>
                            <b-form-input id="password" v-model.trim="form.password" @keyup.enter="login" type="password" placeholder="Informe a senha" />
                        </b-input-group>

                        <b-button variant="primary" @click="login">Entrar</b-button>
                        <b-button variant="danger" @click="reset">Limpar</b-button>

                        <div class="py-4 text-center">
                            <b-link @click="resetpassword">Esqueceu a senha?</b-link>
                        </div>
                        <div class="py-4 text-center">
                            <b-link @click="isLogin = !isLogin">Primeiro acesso?</b-link>
                        </div>
                    </b-card-text>
                </b-card>           

                <b-card v-else header="Cadastro Olistly" class="text-center">
                    <b-card-text class="pt-4">
                        <b-input-group size="lg" class="mb-2">
                            <b-form-input id="name" :disabled="isSignup" v-model.trim="formSignup.name" placeholder="Informe seu nome completo" />
                            <template v-slot:prepend>
                                <b-input-group-text><b-icon-person-circle /></b-input-group-text>
                            </template>
                        </b-input-group>

                        <b-input-group size="lg" class="mb-2">
                            <b-form-input id="login" :disabled="isSignup" v-model.trim="formSignup.login" type="email" placeholder="Informe o login" />
                            <template v-slot:prepend>
                                <b-input-group-text><b-icon-person-fill /></b-input-group-text>
                            </template>
                        </b-input-group>

                        <b-input-group size="lg" class="mb-2">
                            <template v-slot:prepend>
                                <b-input-group-text><b-icon-lock-fill /></b-input-group-text>
                            </template>
                            <b-form-input id="password" :disabled="isSignup" v-model.trim="formSignup.password" type="password" placeholder="Informe a senha" />
                        </b-input-group>

                        <b-input-group size="lg" class="mb-2">
                            <template v-slot:prepend>
                                <b-input-group-text><b-icon-lock-fill /></b-input-group-text>
                            </template>
                            <b-form-input id="confirmPassword" :disabled="isSignup" v-model.trim="confirmPassword" type="password" placeholder="Confirme a senha" />
                        </b-input-group>

                        <b-button variant="primary" :disabled="isSignup" @click="signup">Cadastrar</b-button>
                        <b-button variant="danger" :disabled="isSignup" @click="reset">Limpar</b-button>

                        <div class="py-4 text-center">
                            <b-link :disabled="isSignup" @click="isLogin = !isLogin">Login?</b-link>
                        </div>
                    </b-card-text>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import validator from 'validator';
import httpstatus from "http-status-codes";
import cookies from "@/utilitaries/cookies";
import httprequester from "@/utilitaries/httprequester";

export default {
    name: "Login",
    created() {
        if (this.$route.name != "login") {
            this.$router.push({ name: "login" })
        } else {
            this.logout();
        }
    },
    data() {
        return {
            isLogin: true,
            form: {
                login: "",
                password:""
            },
            formSignup: {
                name: "",
                login: "",
                password: "",
            },
            isSignup: false,
            confirmPassword: ""            
        }
    },
    methods: {
        async login() {
            try {
                if (validator.isEmail(this.form.login)) {
                    const user = await this.$http.unauthenticated().post(this.$pathapi.auth.login(), this.form);

                    httprequester.setToken(this.$http, user.data.token)

                    const userInfo = await this.$http.authenticated().get(this.$pathapi.auth.user.me());
                    this.$store.dispatch("session/setUser", userInfo.data ?? null);
                    cookies.setJWTCookie(user.data.token);
                    this.$router.push({ name: "home" })
                } else {
                    alert("Informe um e-mail válido!");
                }
            } catch (error) {
                console.log(error.response ?? error)
                if (error.response.status == httpstatus.FORBIDDEN) {
                    alert("Usuário ou senha inválidos!")
                }
            }
        },
        async signup() {
            try {
                this.isSignup = true;
                if (!validator.isEmail(this.formSignup.login)) {
                    alert("Informe um e-mail válido!");
                } else if (this.formSignup.password != this.confirmPassword) {
                    alert("A confirmação de senha não confere com a senha informada!");
                } else if (await this.$http.unauthenticated().post(this.$pathapi.auth.create(), this.formSignup)) {
                    alert("Um e-mail de confirmação foi enviado para o e-mail informado!");
                    this.isLogin = true;
                } else {
                    alert("Erro ao cadastrar o usuário, contate o suporte!")
                }
                this.isSignup = false;
            } catch (error) {
                console.log(error.response ?? error)
                alert(error?.response?.data?.message ?? "Houve um erro ao se cadastrar!")
                this.isSignup = false;
            }
        },
        resetpassword() {
            alert("Função apenas disponivel na API, não implementada no front!");
        },
        async logout() {
            await this.$http.authenticated().get(this.$pathapi.auth.logout());

            cookies.removeJWTCookie();
            httprequester.removeToken(this.$http);
            this.$store.dispatch("session/setUser", null);
        },
        reset() {
            this.form.login = "";
            this.form.password = "";
            this.formSignup.name = "";
            this.formSignup.login = "";
            this.formSignup.password = "";
            this.confirmPassword = "";
        }
    }
}
</script>