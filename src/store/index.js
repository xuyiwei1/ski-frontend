//引入Vue核心库
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//import {stat} from "@babel/core/lib/gensync-utils/fs";
//应用Vuex插件
Vue.use(Vuex)

//准备actions对象——响应组件中用户的动作
const actions = {}
//准备mutations对象——修改state中的数据
const mutations = {
    //给localStorage中设置token
    SET_TOKEN(state,token) {
        state.token = token
        localStorage.setItem("token",token)
    },
    //设置用户信息
    SET_USERINFO(state,userInfo) {
        state.userInfo = userInfo
        localStorage.setItem("userInfo",userInfo)
    },
    //删除token和用户信息
    REMOVE_INFO(state) {
        state.token = ''
        state.userInfo = {}
        localStorage.setItem("token",'')
        localStorage.setItem("userInfo",JSON.stringify(''))
    }
}
//准备state对象——保存具体的数据
const state = {
    // 保存token在localStorage中 供多个组价共享
    token: localStorage.getItem("token"),
    //保存用户的信息，从localStorage中获取
    userInfo: JSON.parse(localStorage.getItem("userInfo"))
}

const getters = {
    //获取用户信息
    getUser(state) {
        return state.userInfo
    },
    //获取token
    getToken(state){
        //用户第一次登陆网站，没有token
        if(state.token == null) {
            return '';
        }else {
            return state.token
        }
    }
}

//创建并暴露store
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})
