import dayjs from 'dayjs'
import rt from 'dayjs/plugin/relativeTime'
// 语言包
import 'dayjs/locale/zh-cn'
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

import store from '@/store'
export const dateFilter = (val, format = 'YYYY-MM-DD') => {
  if (!isNaN(val)) {
    val = parseInt(val)
  }
  return dayjs(val).utcOffset(0).format(format)
}

// 加载相对时间插件
dayjs.extend(rt)
function relativeTime(val) {
  if (!isNaN(val)) {
    val = parseInt(val)
  }
  return dayjs()
    .locale(store.getters.language === 'zhCn' ? 'zh-cn' : 'en')
    .to(dayjs(val))
}
export default (app) => {
  app.config.globalProperties.$filters = {
    dateFilter,
    relativeTime
  }
}
