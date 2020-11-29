import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import SIdentify from './components/identify'
import './assets/css/global.css'
import './assets/css/public.css'
import './assets/fonts/iconfont.css'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(SIdentify)
Vue.use(VueAxios, axios)
axios.defaults.baseURL = "http://119.3.104.39:2302/api/"

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
