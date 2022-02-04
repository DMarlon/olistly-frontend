import Vue from "vue";

const status = {
    enable: "ENABLE",
    disable: "DISABLE"
};

Vue.use({
    install(Vue) {
        Object.defineProperties(Vue.prototype, {
            $status: {
                get() {
                    return status;
                }
            }
        });
    }
});
