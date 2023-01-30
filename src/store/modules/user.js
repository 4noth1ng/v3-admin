import { login, getUserInfo } from '@/api/sys'
import md5 from 'md5'
import { setItem, getItem, removeAllItem } from '@/utils/storage'
import { TOKEN } from '@/constant'
import router, { resetRouter } from '@/router'
import { setTimeStamp } from '@/utils/auth.js'
export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || '',
    userInfo: {}
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    login(context, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({
          username,
          password
        })
          .then((data) => {
            if (data.token) {
              this.commit('user/setToken', data.token)
              setTimeStamp()
              resolve(1)
            } else {
              reject(0)
            }
          })
          .catch((err) => reject(err))
      })
    },
    async getUserInfo(context) {
      const data = await getUserInfo()
      context.commit('setUserInfo', data)
      return data
    },
    logout() {
      this.commit('user/setToken', '')
      this.commit('user/setUserInfo', {})
      removeAllItem()
      resetRouter()
      router.push('/login')
    }
  }
}
