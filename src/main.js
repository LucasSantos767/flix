/*!

 =========================================================
 * Vue Light Bootstrap Dashboard - v2.0.0 (Bootstrap 4)
 =========================================================

 * Product Page: http://www.creative-tim.com/product/light-bootstrap-dashboard
 * Copyright 2019 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import Vue from 'vue'
import { http } from "@/services/api";
import { BootstrapVue, IconsPlugin, BootstrapVueIcons
 } from 'bootstrap-vue'
import store  from './store/index.js';
import VueRouter from 'vue-router'
import Toast from "vue-toastification";
import App from './App.vue'
// LightBootstrap plugin
import LightBootstrap from './light-bootstrap-main'
import "vue-toastification/dist/index.css";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// router setup
import routes from './routes/routes'

import './registerServiceWorker'
// plugin setup
Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueRouter)
Vue.use(Toast)
Vue.use(LightBootstrap)

// configure router
const router = new VueRouter({
  mode: 'history',
  routes, // short for routes: routes
  linkActiveClass: 'nav-item active',
  scrollBehavior: (to) => {
    if (to.hash) {
      return {selector: to.hash}
    } else {
      return { x: 0, y: 0 }
    }
  }
})
router.beforeEach((routeTo, routeFrom, next) => {
  let loginRequired = routeTo.matched.some((ruta) => ruta.meta.requireAuth);
  if (!loginRequired && !store.state.token) {

    return routeTo.path == '/' ? next() : next({
      path: '/'
    });
  }
  next();
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
