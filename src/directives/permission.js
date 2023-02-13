import store from '@/store'

function checkPermission(el, binding) {
  // 获取条件
  const { value } = binding
  // 获取当前角色权限
  const points = store.getters.userInfo.permission.points
  if (value && value instanceof Array) {
    const hasPermission = points.some((item) => {
      return value.includes(item)
    })
    if (!hasPermission) {
      // 无权限
      el && el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    throw new Error('not an array')
  }
}

export default {
  mounted(el, binding) {
    checkPermission(el, binding)
  }
}
