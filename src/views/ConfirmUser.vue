<template>
  <b-container fluid>
      <b-row class="vh-100" align-v="center" align-h="center">
			<b-col md="3">
				<h1>{{ mensagem }}</h1>
			</b-col>
      </b-row>
  </b-container>
</template>


<script>
import httpstatus from "http-status-codes";

export default {
  name: 'ConfirmUser',
	created() {
		this.confirm();
	},
    data() {
        return {
            mensagem: "Ativação de usuário!"
        }
    },
	computed: {
		userHash() {
			return this.$route.params.userHash;
		}
	},
	methods: {
		async confirm() {
			try {
				const response = await this.$http.unauthenticated().get(this.$pathapi.auth.activate(this.userHash));

                if (response && response.status == httpstatus.NO_CONTENT) {
                    alert("Usuário não encontrado!");
				} else if (response && response.data && response.data.name) {
					alert(`Usuário ${response.data.name} ativado com sucesso!`);
                    this.$router.push({ name: "login" });
                }
			} catch (error) {
				console.log(error.response ?? error)
			}
		},
		reset() {
			this.original = "";
		}
	}
}
</script>
