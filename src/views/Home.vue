<template>
  <b-container fluid>
      <b-row class="vh-100" align-v="center" align-h="center">
          <b-col md="3">
                <b-form-group id="inputgroup-shorten" label="Encurtar" label-for="shorten">
                <b-form-input id="shorten" v-model="original" type="text" placeholder="Informe o link" />
                </b-form-group>

                <b-button variant="primary" @click="shorten">Encurtar</b-button>
                <b-button variant="danger" @click="reset">Limpar</b-button>
          </b-col>
      </b-row>
  </b-container>
</template>


<script>
import validator from 'validator';

export default {
	name: 'Shorten',
	data() {
		return {
			original: ""
		}
	},
	methods: {
		async shorten() {
			try {
				if (validator.isURL(this.original)) {
					const response = await this.$http.authenticated().post(this.$pathapi.url.shorten(), { original: this.original });
					if (response && response.data)
						this.original = `${process.env.VUE_APP_FRONT_URL}/${response.data}`;
				} else {
					alert("Informe uma URL válida!")
				}
					
			} catch (error) {
				console.log(error.response ?? error)
				alert("Erro ao gerar URL reduzida!");
			}
		},
		reset() {
			this.original = "";
		}
	}
}
</script>
