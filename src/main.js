// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store.js'

Vue.config.productionTip = false

//引入css
import './assets/css/common/app.scss' 
//import './assets/css/iconfont/iconfont.css'

//引入axios
import VueAxios from 'vue-axios'
import Axios from 'axios'
Vue.use(VueAxios,Axios)

//引入flexiable
import 'lib-flexible/flexible.js'

//引入fastclick解决移动端的300ms延迟问题
import fastclick from 'fastclick'
fastclick.attach(document.body)

//引入注册的插件
import Util from './utils/utils'
Vue.use(Util)

//引入过滤器
import filter from './utils/filter'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
