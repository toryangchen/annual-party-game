import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/h5",
    },
    {
      path: "/h5",
      name: "h5",
      component: () => import("@/view/h5/index.vue"),
    },
  ],
});
