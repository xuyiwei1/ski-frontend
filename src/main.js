import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import axios from 'axios'
//引入store
import store from './store'
//引入vue-router
import VueRouter from "vue-router";
import router from "@/router";

Vue.prototype.$axios = axios

Vue.use(VueRouter)
Vue.use(ElementUI);

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
