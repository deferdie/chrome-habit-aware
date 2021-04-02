import Vue from "vue";
import VueRouter from "vue-router";
import Domains from "../views/components/Domains.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/domains",
    name: "Domains",
    component: Domains,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
