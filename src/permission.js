/**
 * 权限管理，路由鉴权
 */
import router, { resetRouter, tsetRoutes } from './router'
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
    // 如果有token
    if (isCheckTimeout()) {
      // token过期，退出登录
      store.dispatch('user/logout')
      return Promise.reject('token失效')
    }
    if (to.path === '/login') {
      // 有token，若访问登录页面，重定向到首页
      next('/')
    } else {
      // 判断用户资料是否获取
      // 若不存在用户信息，则需要获取用户信息
      if (!store.getters.hasUserInfo) {
        // 触发获取用户信息的 action，并获取用户当前权限
        const { permission } = await store.dispatch('user/getUserInfo')
        // 处理用户权限，筛选出需要添加的权限
        const filterRoutes = await store.dispatch(
          'permission/filterRoutes',
          permission.menus
        )
        // 利用 addRoute 循环添加
        filterRoutes.forEach((item) => {
          router.addRoute(item)
        })
        router.addRoute(...tsetRoutes)
        // 添加完动态路由之后，需要在进行一次主动跳转
        return next(to.path)
        // next()
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
