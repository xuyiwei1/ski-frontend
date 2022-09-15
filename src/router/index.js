//引入VueRouter
import VueRouter from 'vue-router'
import Login from "@/views/Login";

//创建router实例对象，去管理一组一组的路由规则
const router = new VueRouter({
    routes:[
        {
            path: '/login',
            component: Login
        }
    ]
})

//暴露router
export default router
