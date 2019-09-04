import '@babel/polyfill';
import Vue from 'vue';
import App from './App.vue';
import { createStore } from './store';
import { createRouter } from './router';
import { sync } from 'vuex-router-sync';
import titleMixin from './utils/title';
import * as filters from './utils/filters';
import axios from 'axios';
import conf from '../../config/app';

Vue.prototype.$request = axios.create({
  baseURL: 'http://' + conf.app.devHost + ':' + conf.app.port,
  timeout: 1000,
});

Vue.prototype.$isProd = process.env.NODE_ENV === 'production';

Vue.mixin(titleMixin);

/**
 * Vue.filter 增加全局的过滤函数
 */
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

export function createApp() {
  const store = createStore();
  const router = createRouter();

  // 将 store 和 router 连接，即在store可以直接获取当前的router
  sync(store, router);

  const app = new Vue({
    // 根实例简单的渲染应用程序组件。
    router,
    store,
    render: h => h(App),
  });
  return { app, router, store };
}
