import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: "/login",
    routes: [
        {
            path: "/",
            name: "login",
            component: () => import("./views/login"),
        },
        {
            path: "/register",
            name: "register",
            component: () => import("./views/register"),
        },
    ]
})
