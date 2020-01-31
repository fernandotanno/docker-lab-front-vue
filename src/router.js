import Vue from "vue";
import Router from "vue-router";
import Home from './components/Home'
import Users from './components/Users'
import Login from './components/Login'

Vue.use(Router)

export default new Router({
    mode:"history",
    routes: [
        {
            path: '/',
            component: Login
        },{
            path: '/users',
            component: Users
        },{
            path: '/home',
            component: Home
        },
    ]
})
