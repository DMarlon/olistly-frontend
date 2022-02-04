import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import session from "@/stores/session";

export default new Vuex.Store({
    modules: {
        session
    }
});
