import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/admin",
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("@/view/admin/index.vue"),
    },
  ],
});
