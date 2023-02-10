import { ref, onBeforeMount, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import store from '@/store'
const { body } = document
const WIDTH = 992
const isMobile = () => {
  const rect = body.getBoundingClientRect()
  return rect.width - 1 < WIDTH
}
export const useResizeHandler = () => {
  if (!document.hidden) {
    const ISMOBILE = isMobile()
    store.commit('app/toggleDevice', ISMOBILE ? 'mobile' : 'desktop')
    if (ISMOBILE) {
      store.commit('app/onSidebarAction', false)
    } else {
      store.commit('app/onSidebarAction', true)
    }
  }
}
export const useResize = function () {
  if (store.getters.device === 'mobile' && store.getters.sidebarOpened) {
    store.commit('app/triggerSidebarOpened')
  }
}
