<template>
	<b-container fluid>
		<b-table class="p-2" striped hover :fields="fields" :items="items">
            <template v-slot:cell(remove)="data">
                <span class="pointer" title="Remover sessão"><b-icon icon="trash" @click="removeSession(data.item)"/></span>
            </template>
        </b-table>
	</b-container>
</template>

<script>
import httpstatus from "http-status-codes";
import formatter from "@/utilitaries/formatter";

export default {
	name: "Session",
	created() {
		this.load()
	},
	data() {
		return {
			fields: [
                { key:'id', label:'Id' }, 
                { key:'device', label:"Dispositivo" }, 
                { key:'address', label:"Endereço" }, 
                { key:'lastAccess', label:"Último acesso" },
                { key:'expiration', label:"Expiração" },
                { key:'current', label:"Atual" },
                { key:'remove', label:"Remover" },
            ],
			items: []
		}
	},
	methods: {
		async load() {
			try {
				const response = await this.$http.authenticated().get(this.$pathapi.auth.user.session.all());
				if (response && response.data) {
					this.handlerContent(response.data)
                }
			} catch (error) {
				console.log(error.response ?? error)
                alert("Erro ao carregar sessões!")
			}
		},
		handlerContent(data){
			this.items = data.map(this.buildModel)
		},
		buildModel(item) {
			return {
				id: item.id,
				device: item.deviceName,
				address: item.remoteAddress,
                lastAccess: formatter.dateTimeToBrazilianFormat(item.lastAccess),
				expiration: formatter.dateTimeToBrazilianFormat(item.expiration),
                current: item.current ? "Sim" : "Não",
                remove: false
			}
		},
        async removeSession(item) {
            try {
                const confirm = window.confirm("Deseja remover o sessão?");
				if (confirm) {
                    const response = await this.$http.authenticated().delete(this.$pathapi.auth.user.session.delete(item.id));
                    if (response && response.status == httpstatus.OK) {
                        alert("Sessão removida com sucesso!")
                        this.load()
                    }
                }
            } catch (error) {
				console.log(error.response ?? error)
                alert("Erro ao remover sessão!")
			}
        }
	}
}
</script>