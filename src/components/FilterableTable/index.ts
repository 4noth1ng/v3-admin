import { App } from "vue";
import FilterableTable from './src/index.vue'

export default {
    install(app: App) {
        app.component('filterable-table', FilterableTable)
    }
}