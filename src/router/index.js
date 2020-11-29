import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  { path: "/home", component: Home }
]

const router = new VueRouter({
  routes
})

// 全局路由前置守卫
router.beforeEach((to, from, next) => {
  if (to.path == "/login") {//如果登录的是 login 页面，任何人都可以登录，放行
     return next() 
  }
  if(sessionStorage.token){//如果不是登录页面，判断sessionStorage中是否有token数据，如果有，放行
    return next()
  }
  return next({path:"/login"});//如果不是登录页面，并且没有token值，就跳转到登录页
})

export default router
