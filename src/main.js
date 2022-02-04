import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'

import "./plugins/axios";
import "./plugins/bootstrap-vue";

import "./utilitaries/status";
import "./utilitaries/path-api";

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
