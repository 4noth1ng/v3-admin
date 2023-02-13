import { getItem, setItem } from '@/utils/storage'
import { MAIN_COLOR, DEFAULT_COLOR } from '@/constant'
import variables from '@/styles/variables.module.scss'
export default {
  namespaced: true,
  state: () => ({
    mainColor: getItem(MAIN_COLOR) || DEFAULT_COLOR,
    variables
  }),
  mutations: {
    /**
     * 设置主题色
     */
    setMainColor(state, newColor) {
      state.mainColor = newColor
      state.variables.menuBg = newColor
      setItem(MAIN_COLOR, newColor)
    },
    /**
     * 设置头部主题色
     */
    setHeaderColor(state, newColor) {
      state.variables.navbarBg = newColor
    },
    /**
     * 设置内容色
     */
    setAppColor(state, newColor) {
      state.variables.mainBgColor = newColor
    },
    setDark(state) {
      state.mainColor = '#555'
      setItem(MAIN_COLOR, '#555')
      state.variables.mainBgColor = '#555'
      state.variables.mainColor = '#fff'
      state.variables.menuBg = '#555'
      state.variables.menuText = '#fff'
      state.variables.navbarBg = '#555'
      state.variables.navbarText = '#fff'
    },
    setLight(state) {
      state.mainColor = '#f5f5f5'
      setItem(MAIN_COLOR, '#f5f5f5')
      state.variables.mainBgColor = '#f5f5f5'
      state.variables.mainColor = '#1c1e21'
      state.variables.menuBg = '#f5f5f5'
      state.variables.menuText = '#1c1e21'
      state.variables.navbarBg = '#f5f5f5'
      state.variables.navbarText = '#1c1e21'
    }
  }
}
