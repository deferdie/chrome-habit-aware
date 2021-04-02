import Vue from "vue";
import VueRouter from "vue-router";
import DomainList from "../js/components/DomainList.vue";

const routes = [
  {
    path: "/src/views/domains.html",
    name: "DomainList",
    component: DomainList,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
