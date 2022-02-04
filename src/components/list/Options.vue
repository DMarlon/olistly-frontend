<template>
    <b-container fluid class="p-0">
        <b-row align-v="center">
            <b-col cols="12" sm="6" class="m-0 text-center text-sm-left font-weight-bold">
                <h1>{{ title }}</h1>
            </b-col>
            <b-col cols="12" sm="6" class="m-0 text-center text-sm-right">
                <template v-if="totalRecords == 0">Nenhum item encontrado!</template>
                <template v-else>{{ showSingularPlural(totalRecords, "item", "itens") }}<span v-if="totalPages > 0">, exibindo página {{ currentPage }} de {{ totalPages }}</span></template>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12" sm="6">
                <b-container fluid class="p-0">
                    <b-row class="justify-content-sm-start" :class="$slots.options ? 'justify-content-between' : 'justify-content-center'">
                        <b-col cols="auto" class="mt-2">
                            <b-button variant="primary" :disabled="currentPage == 1" @click="pageBegin"><b-icon-chevron-bar-left /></b-button>
                            <b-button variant="primary" :disabled="currentPage == 1" @click="pageBack"><b-icon-chevron-left /></b-button>
                            <b-button variant="primary" :disabled="currentPage >= totalPages" @click="pageNext"><b-icon-chevron-right /></b-button>
                            <b-button variant="primary" :disabled="currentPage >= totalPages" @click="pageEnd"><b-icon-chevron-bar-right /></b-button>
                        </b-col>
                    </b-row>
                </b-container>
            </b-col>
            <b-col cols="12" sm="6">
                <b-container fluid class="p-0">
                    <b-row class="justify-content-sm-end justify-content-between">
                        <b-col v-show="showStatus" cols="auto" class="mt-2">
                            <b-form-select v-model="searchOptions.status" @change="load">
                                <b-select-option :value="$status.enable">Ativo</b-select-option>
                                <b-select-option :value="$status.disable">Inativo</b-select-option>
                            </b-form-select>
                        </b-col>
                        <b-col cols="auto" class="mt-2">
                            <b-input-group>
                                <b-form-input ref="searchTerm" v-model="searchOptions.term" @keydown.enter="load" @keydown.esc="clearSearch" autofocus placeholder="Procurar..." />
                                <template v-slot:append>
                                    <b-button @click="load" variant="primary"><b-icon-search /></b-button>
                                    <b-button @click="clearSearch" variant="warning" :disabled="searchOptions.term == ''"><b-icon-x /></b-button>
                                </template>
                            </b-input-group>
                        </b-col>
                    </b-row>
                </b-container>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ""
        },
        showStatus: {
            type: Boolean,
            default: true
        },
        searchOptions: {
            required: true
        },
        searchResult: {
            required: true
        }
    },
    computed: {
        currentPage() {
            return this.searchOptions.page;
        },
        totalRecords() {
            return this.searchResult.totalRecords;			
        },        
        totalPages() {
            return this.searchResult.totalPages;
        }
    },
    methods: {
        load() {
            this.$emit("onLoad");
        },
        showSingularPlural(value, singular, plural, nothing) {
            if (nothing && value < 1)
                return nothing;

            return value + " " + (value < 2 ? singular : plural);
        },
        goToPage(page) {
            this.$emit("onPaginate", page);
        },
        pageBegin() {
            this.goToPage(1);
        },
        pageBack() {
            this.goToPage(this.currentPage > 1 ? this.currentPage - 1 : 1);
        },
        pageNext() {
            this.goToPage(this.currentPage < this.totalPages ? this.currentPage + 1 : this.totalPages);
        },
        pageEnd() {
            this.goToPage(this.totalPages);
        },
        clearSearch() {
            this.searchOptions.term = "";
            this.load();
            this.$refs.searchTerm.focus();
        }
    }
}
</script>

<style>
</style>