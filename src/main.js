import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueRouter from "vue-router";
import moment from "moment";

Vue.use(VueRouter);

window.axios = axios;
window.moment = moment;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
