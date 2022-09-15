//引入VueRouter
import VueRouter from 'vue-router'
import Login from "@/views/Login";
import Competition from "@/views/Competition";
import AddCompetition from "@/components/AddCompetition";
import Admin from "@/components/Admin";
import CompetitionInfo from "@/components/CompetitionInfo";
import UserInfo from "@/components/UserInfo";
import UserReg from "@/components/UserReg";
import Nav from "@/components/Nav";

//创建router实例对象，去管理一组一组的路由规则
const router = new VueRouter({
    routes:[
        {
            path: '/login',
            component: Login
        },
        {
            path: '/competition',
            component: Competition
        },
        {
            path: '/addCompetition',
            component: AddCompetition
        },
        {
            path: '/admin',
            component: Admin
        },
        {
            path: '/competitionInfo',
            component: CompetitionInfo
        },
        {
            path: '/userInfo',
            component: UserInfo
        },
        {
            path: '/userReg',
            component: UserReg
        },
        {
            path: '/nav',
            component: Nav
        }
    ]
})

//暴露router
export default router
