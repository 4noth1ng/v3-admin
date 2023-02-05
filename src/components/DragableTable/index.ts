import { App } from 'vue'
import DragableTable from './src/index.vue'

export default {
  install(app: App) {
    app.component('dragable-table', DragableTable)
  }
}
