import Vue from "vue";
import Router from "vue-router";

import { h5Routes } from "./h5Routes";
import { adminRoutes } from "./adminRoutes";

Vue.use(Router);

export default new Router({ routes: h5Routes.concat(adminRoutes) });
