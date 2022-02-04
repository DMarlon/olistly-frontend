import Vue from "vue";

const pathapi = {
    auth: {
        login: () => "/login",
        logout: () => "/logout",
        create: () => "/public/user/create",
        user: {
            me: () => "/user/info",
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
