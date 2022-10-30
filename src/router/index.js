import { createRouter, createWebHashHistory } from "vue-router"
import Home from '../components/Home.vue'
import Welcome from '../views/Welcome.vue'
import Login from '../views/Login.vue'
const routes = [
  {
    name: "home",
    path: "/",
    meta: {
      title: "首页",
    },
    component: Home,
    redirect: "/welcome",
    children: [
      {
        name: "welcome",
        path: "/welcome",
        meta: {
          title: "欢迎页面",
        },
        component: Welcome,
      },
      {
        name: "user",
        path: "/system/user",
        meta: {
          title: "用户管理",
        },
        component: ()=> import('../views/User.vue'),
      },
      {
        name: "",
        path: "/system/menu",
        meta: {
          title: "菜单管理管理",
        },
        component: ()=> import('../views/Menu.vue'),
      },
    ],
  },
  {
    name: "login",
    path: "/login",
    meta: {
      title: "登录页面",
    },
    component: Login,
  },
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default router