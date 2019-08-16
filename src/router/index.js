import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import menus from './menu'
import store from '../stroe'
import iView from 'iview'
import routers from './routers';
// console.log('allRouters' + JSON.stringify(allRouters))

Vue.use(Router)
routers.push(...menus)
const router = new Router({
    routes,
    mode: 'history'
})

// router.beforeEach((to, from, next) => {
//     iView.LoadingBar.start()
// store.dispatch('getMenuData').then(res => {}) //什么时候写，具体情况分析，这里是请求后端菜单信息的
// })

export default router