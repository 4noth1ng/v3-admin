// 专门处理权限路由的模块
import { publicRoutes, asyncRoutes } from '@/router'
export default {
  namespaced: true,
  state: {
    // 路由表：初始拥有静态路由权限
    routes: publicRoutes
  },
  mutations: {
    /**
     * 增加路由
     */
    setRoutes(state, newRoutes) {
      // 永远在静态路由的基础上增加新路由
      state.routes = [...publicRoutes, ...newRoutes]
    }
  },
  actions: {
    /**
     * 根据权限筛选路由
     */
    filterRoutes(context, menus) {
      const routes = []
      // 路由权限匹配
      menus.forEach((key) => {
        // 权限名 与 路由的 name 匹配
        const routeArr = asyncRoutes.filter((item) => item.meta.name === key)
        routes.push(...routeArr)
      })
      // 最后添加 不匹配路由进入 404
      routes.push({
        path: '/:catchAll(.*)',
        redirect: '/404'
      })
      let map = new Map()

      for (const route of routes) {
        if (map.has(route.path)) {
          let parentRoute = map.get(route.path)
          if (route.children.length) {
            for (const childrenRoute of route.children) {
              parentRoute.children.push(childrenRoute)
            }
          }
        } else {
          map.set(route.path, route)
        }
      }
      const newRoute = [...map.values()]
      console.log(newRoute)
      context.commit('setRoutes', newRoute)
      return newRoute
    }
  }
}
