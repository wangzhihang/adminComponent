import Vue from 'vue'
import Router from 'vue-router'
import routes from '@/router/routers.js'
import menus from '@/router/menu.js'
// import routers from './routers';

Vue.use(Router)
routes.push(...menus)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: routes
})