import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export const adminRoutes = [
  {
    path: "/",
    redirect: "/admin",
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("@/view/admin/index.vue"),
  },
];
