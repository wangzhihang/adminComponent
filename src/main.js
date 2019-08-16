import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './stroe'
import axios from 'axios'
import VueAxios from 'vue-axios'
import iView from 'iview' // 引入iview依赖
import 'iview/dist/styles/iview.css' // 引入iview css样式
import './css/index.less'
import '@/assets/font/iconfont.css'
import '@/assets/icons/iconfont.css'

Vue.config.productionTip = false
Vue.use(iView) //使用iview组件 
Vue.use(VueAxios, axios)

import moment from 'moment'
Vue.prototype.$moment = moment
moment.locale('zh-cn'); //需要汉化


new Vue({
    router,
    store,
    render: function(h) { return h(App) }
}).$mount('#app')