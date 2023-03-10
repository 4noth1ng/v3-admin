import store from '@/store'
import axios from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL:
    'https://www.fastmock.site/mock/e20205c2cb7aae02dbeb7d1c3cf4ebed/api',
  timeout: 5000
})

service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    // 配置接口国际化
    config.headers['Accept-Language'] = store.getters.language
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data
    if (success) {
      return data
    } else {
      ElMessage.error(message)
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      store.dispatch('user/logout')
    }
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

export default service
