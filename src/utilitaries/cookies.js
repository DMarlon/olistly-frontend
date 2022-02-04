const COOKIE_OAUTH = "olistly-auth";

export default {
    getCookie(name) {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? match[2] : "";
    },
    setCookie(name, value, path, expires) {
        path = path ?? "/";

        if (expires == null) {
            const now = new Date();
            expires = new Date(now.getTime() + (1000 * 60 * 60 * 24 * 30));
        }

        document.cookie = name + "=" + value + "; Path=" + path + "; Expires=" + expires + "; SameSite=None; Secure";
    },
    deleteCookie(name) {
        const expires = new Date(0);
        document.cookie = name + "=; Path=/; Expires=" + expires + "; SameSite=None; Secure";
    },
    setJWTCookie(token) {
        const claim = JSON.parse(Buffer.from(token.split(".")[1], "base64"));
        var expires = new Date();
        expires.setTime(claim.exp * 1000);
        
        this.setCookie(COOKIE_OAUTH, token, "/", expires);
    },
    getJWTCookie() {
        return this.getCookie(COOKIE_OAUTH);
    }
};
