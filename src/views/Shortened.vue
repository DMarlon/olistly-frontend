<template>
  <b-container fluid>
      <b-row class="vh-100" align-v="center" align-h="center">
			<b-col md="3">
				<b-form-group id="inputgroup-original" label="Orinal Link" label-for="original">
				<b-form-input id="original" v-model="original" type="text" placeholder="" />
				</b-form-group>

				<b-button variant="primary" @click="access">Acessar</b-button>
				<b-button variant="danger" @click="reset">Limpar</b-button>
			</b-col>
      </b-row>
  </b-container>
</template>


<script>
export default {
  name: 'Shorten',
	data() {
		return {
			original: ""
		}
	},
	created() {
		this.shorten();
	},
	computed: {
		shortenedHash() {
			return this.$route.params.shortenedHash;
		}
	},
	methods: {
		access() {
			window.location.href=this.original;
		},
		async shorten() {
			try {
				const response = await this.$http.unauthenticated().get(this.$pathapi.url.view.hash(this.shortenedHash));
				if (response && response.data)
					this.original = response.data

			} catch (error) {
				console.log(error.response ?? error)
				alert("Erro ao recuperar link!")
			}
		},
		reset() {
			this.original = "";
		}
	}
}
</script>
