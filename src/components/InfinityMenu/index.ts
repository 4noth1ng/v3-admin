import { App } from 'vue'
import InfinityMenu from './src/index'
import normalMenu from './src/menu.vue'
export default {
  install(app: App) {
    app.component('infinity-menu', InfinityMenu),
      app.component('normal-menu', normalMenu)
  }
}
