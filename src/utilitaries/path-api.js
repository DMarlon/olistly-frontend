import Vue from "vue";

const pathapi = {
    auth: {
        login: () => "/login",
        logout: () => "/logout",
        create: () => "/public/user/create",
        activate: (hash) => "public/user/activate/" + (hash ?? ""),
        user: {
            me: () => "/user/info",
            session: {
                all: () => "/user/session",
                delete: (id) => "/user/session/" + (id ?? ""),
            }
        }
    },
    url: {
        shorten: () => "url/shorten",
        paged: () => "url/paged",
        changeStatus: (id, status) => "/url/" + (id ?? "") + "/" + (status ?? ""),
        view: {
            hash: (hash) => "/public/url/view/" + (hash ?? ""),
            paged: (urlId) => "/url/" + urlId + "/view/paged"
        }
    }
};

Vue.use({
    install(Vue) {
        Vue.prototype.$pathapi = pathapi;
    }
});
