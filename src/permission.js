/**
 * 权限管理，路由鉴权
 */
import router from './router'
import store from './store'
import { isCheckTimeout } from '@/utils/auth'
// 白名单
const whiteList = ['/login']
/**
 * 路由前置守卫
 */
router.beforeEach(async (to, from, next) => {
  // 存在 token ，进入主页
  // if (store.state.user.token) {
  // 快捷访问
  if (store.getters.token) {
    if (isCheckTimeout()) {
      store.dispatch('user/logout')
      return Promise.reject('token失效')
    }
    if (to.path === '/login') {
      next('/')
    } else {
      if (!store.state.hasUserInfo) {
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    // 没有token的情况下，可以进入白名单
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})