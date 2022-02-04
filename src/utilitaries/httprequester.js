export default {
    setToken(requester, token) {
        requester.authenticated().defaults.headers.common["Authorization"] = "Bearer " + token;
    },
    removeToken(requester) {
        requester.authenticated().defaults.headers.common["Authorization"] = "";
    }
}