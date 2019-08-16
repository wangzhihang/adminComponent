import menus from '@/router/menu'
import {
    getMenuByRouter
} from '@/libs/util'


export default {
    state: {
        breadCrum: [{ 'title': '首页', 'icon': 'md-home', 'router': '/' }], //面包屑
        breadCrumbList: []
    },
    getters: {
        menuList: (state, getters, rootState) => {
            return getMenuByRouter(menus)
        }
    },
    mutations: {
        getBreadCrumbList(state, arr) {
            if (arr.length > 0) {
                state.breadCrumbList = state.breadCrum.concat(arr);
                console.log('breadCrumbList====' + JSON.stringify(state.breadCrumbList.concat(arr)))
            } else {
                state.breadCrumbList = [];
            }
        }
    },
    actions: {}
}