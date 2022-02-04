export default {
    namespaced: true,
    state: {
        user: null,
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        }
    },
    actions: {
        setUser(context, user) {
            context.commit("setUser", user);
        }
    },
    getters: {
        getUser(state) {
            return state.user ?? null;
        }
    }
}
