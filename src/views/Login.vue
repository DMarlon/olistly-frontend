<template>
  <b-container fluid>
      <b-row class="vh-100" align-v="center" align-h="center">
          <b-col md="3">
                <b-form-group id="inputgroup-login" label="Login" label-for="login">
                <b-form-input id="login" v-model="form.login" type="email" placeholder="Informe o login" />
                </b-form-group>

                <b-form-group id="inputgroup-2" label="Senha" label-for="password">
                    <b-form-input id="password" v-model="form.password" type="password" placeholder="Informe a senha" />
                </b-form-group>

                <b-button variant="primary" @click="submit">Entrar</b-button>
                <b-button variant="danger" @click="reset">Limpar</b-button>
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
        } 
        
        this.$store.dispatch("session/setUser", null);
    },
    data() {
        return {
            form: {
                login: "",
                password:""
            },
        }
    },
    methods: {
        async submit() {
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
                console.log(error.response)
                if (error.response.status == httpstatus.FORBIDDEN) {
                    alert("Usuário ou senha inválidos!")
                }
            }
        },
        reset() {
            this.form.login = "";
            this.form.password = "";
        }
    }
}
</script>