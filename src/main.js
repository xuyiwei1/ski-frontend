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
import './axios'

Vue.prototype.$axios = axios

Vue.use(VueRouter)
Vue.use(ElementUI);

// 添加请求拦截器
// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
    config => {
        if (localStorage.getItem('token')) {
            config.headers.Authorization = localStorage.getItem('token');
            console.log(localStorage.getItem('token'))
        }
        return config;
    }, error => {
        return Promise.reject(error);
    });

axios.interceptors.response.use(resp=>{
    console.log("resp",resp)
    if(resp.data.code !== null && resp.data.code === 1002) {
        console.log(resp.data.code)
        //删除token和用户信息
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
        //提示登陆已经过期，请重新登陆
        ElementUI.Message({
            message: 'Your login status has expired, please login again',
            type: 'error',
            duration: 2000
        });
        window.location.href='http://localhost:8080/#/login'
    }
    return resp
})

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
});
