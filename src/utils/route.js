import path from 'path'
import router from '@/router'

/**
 * 返回所有子路由
 */
const getChildrenRoutes = (routes) => {
  const result = []
  routes.forEach((route) => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children)
    }
  })
  return result
}
/**
 * 处理脱离层级的路由：某个一级路由为其他子路由，则剔除该一级路由，保留路由层级
 * @param {*} routes router.getRoutes()
 */
export const filterRouters = (routes) => {
  const childrenRoutes = getChildrenRoutes(routes)
  return routes.filter((route) => {
    return !childrenRoutes.find((childrenRoute) => {
      return childrenRoute.path === route.path
    })
  })
}

/**
 * 判断数据是否为空值
 */
function isNull(data) {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
  return false
}
/**
 * 根据 routes 数据，返回对应 menu 规则数组
 */
export function generateMenus(routes, basePath = '') {
  const result = []
  let map = new Map()
  // 遍历路由表
  routes.forEach((item) => {
    // 不存在 children && 不存在 meta 直接 return
    if (isNull(item.meta) && isNull(item.children)) return
    // 存在 children 不存在 meta，进入迭代, 本身无需push，push的是children迭代的结果
    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...generateMenus(item.children))
    }
    // 不存在 children 存在 meta || 存在children 存在meta
    // 此时每个item(包含meta.icon和meta.title)都需要push进result，作为递归参数
    let route = {
      ...item,
      children: []
    }

    // 存在 children 进入迭代到children
    if (item.children) {
      route.children.push(...generateMenus(item.children))
    }
    // icon 与 title 必须全部存在
    if (item.meta.icon && item.meta.title) {
      // meta 存在生成 route 对象，放入 arr
      if (map.has(route.path)) return
      else {
        result.push(route)
        map.set(route.path, route)
      }
    }
  })
  return result
}

export const resetRouter = () => {
  router.removeRoute('article')
}
