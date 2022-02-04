<template>
	<b-container fluid>
		<Options :title="'Detalhes link ' + this.urlId" :showStatus="false" :searchOptions="searchOptions" :searchResult="searchResult" @onLoad="load" @onPaginate="goToPage" class="mb-4" />
		<b-table class="p-2" striped hover :fields="fields" :items="items"/>
	</b-container>
</template>

<script>
import Options from "@/components/list/Options";
import formatter from "@/utilitaries/formatter";

export default {
	name: "Home",
	components: { Options },
	created() {
		this.load()
	},
	data() {
		return {
			searchOptions: {
                page: 1,
                limit: 20,
                order: "dateAccess",
                direction: "desc",
                status: this.$status.enable,
                term: ""
            },
            searchResult: {
                totalRecords: 0,
                totalPages: 0
            },
			fields: [
				{ key:'id', label:'Id' }, 
				{ key:'device', label:"Dispositivo" }, 
				{ key:'address', label:"Endereço" }, 
				{ key:'access', label:"Acesso" }
			],
			items: []
		}
	},
	computed: {
		urlId() {
			return this.$route.params.urlId;
		}
	},
	methods: {
		async load() {
			try {
				const response = await this.$http.authenticated().get(this.$pathapi.url.view.paged(this.urlId), { params: { ...this.searchOptions } });
				if (response && response.data) {
					this.handlerContent(response.data)
					this.handlerSearchResult(response.data)
					this.handlerSearchOptions(response.data)
				} else {
					this.searchOptions.page = 1;
				}				
			} catch (error) {
				console.log(error.response ?? error)
				alert("Erro ao carregar os detalhes de acesso!")
			}
		},
		handlerContent(data){
			this.items = data.content.map(this.buildModel)
		},
		handlerSearchResult(data){
			this.searchResult = {
				totalRecords: data.totalRecords ?? 0,
				totalPages: data.totalPages ?? 0
			};
		},
		handlerSearchOptions(data){
			if (data.currentPage == 0)
				this.searchOptions.page = 1;
			else if (this.searchOptions.page > data.totalPages)
				this.searchOptions.page = data.currentPage;
		},
		buildModel(item) {
			return {
				id: item.id,
				device: item.deviceName,
				address: item.remoteAddress,
				access: formatter.dateTimeToBrazilianFormat(item.dateAccess),
			}
		},
		goToPage(page) {
            this.searchOptions.page = page;
            this.load();
        }
	}
}
</script>