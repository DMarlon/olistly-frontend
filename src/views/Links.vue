<template>
	<b-container fluid>
		<Options title="Meus links" :searchOptions="searchOptions" :searchResult="searchResult" @onLoad="load" @onPaginate="goToPage" class="mb-4" />
		<b-table class="p-2" striped hover :fields="fields" :items="items" @row-dblclicked="showDetail">
			<template v-slot:cell(status)="data">
                <span class="pointer" :title="data.item.status ? 'Inativar' : 'Ativar'"><b-icon :icon="data.item.status ? 'check-circle' : 'circle'" @click="changeStatus(data.item)" /></span>
            </template>
		</b-table>
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
                order: "id",
                direction: "asc",
                status: this.$status.enable,
                term: ""
            },
            searchResult: {
                totalRecords: 0,
                totalPages: 0
            },
			fields: [{ key:'id', label:'Id' }, { key:'original', label:"Original" }, { key:'shortened', label:"Encurtada" }, { key:'created', label:"Criado" }, { key:'views', label:"Visualizações" }, { key:'status', label:"Ativo" }],
			items: []
		}
	},
	methods: {
		async load() {
			try {
				const response = await this.$http.authenticated().get(this.$pathapi.url.paged(), { params: { ...this.searchOptions } });
				if (response && response.data) {
					this.handlerContent(response.data)
					this.handlerSearchResult(response.data)
					this.handlerSearchOptions(response.data)
				} else {
					this.searchOptions.page = 1;
				}				
			} catch (error) {
				console.log(error)
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
				original: item.originalUrl,
				shortened: `${process.env.VUE_APP_FRONT_URL}/${item.shortenedHash}`,
				created: formatter.dateTimeToBrazilianFormat(item.dateCreated),
				views: item.views,
				status: this.$status.enable == item.status
			}
		},
		showDetail(item) {
			this.$router.push({ name: 'detail', params: { urlId: item.id } });
		},
		async changeStatus(item) {
			try {
				const confirm = window.confirm(`Deseja ${item.status ? 'inativar' : 'ativar'} o link?`);
				if (confirm) {
					await this.$http.authenticated().delete(this.$pathapi.url.changeStatus(item.id, item.status ? this.$status.disable : this.$status.enable));
					this.load();
				}
            }
            catch (error) {
                console.log(error.response)                
            }
        },
		goToPage(page) {
            this.searchOptions.page = page;
            this.load();
        }
	}
}
</script>

<style>
.pointer {
    cursor: pointer;
}
</style>