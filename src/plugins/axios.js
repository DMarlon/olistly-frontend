import Vue from "vue";
import axios from "axios";
import cookies from "@/utilitaries/cookies";

const axiosAuthenticated = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    timeout: 60 * 1000,
});

const token = cookies.getJWTCookie();
if (token)
    axiosAuthenticated.defaults.headers.common["Authorization"] = "Bearer " + token;

const axiosUnauthenticated = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    timeout: 60 * 1000,
});

const a = {
    get() {
        return {
            authenticated () {
                return axiosAuthenticated;
            },
            unauthenticated () {
                return axiosUnauthenticated;
            }
        }
    }
}

Vue.use({
    install(Vue) {
        Object.defineProperties(Vue.prototype, {
            $http: a
        });
    }
});
