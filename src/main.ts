import { createApp } from 'vue'
import i18n from '@/i18n'

import App from './App.vue'
import router from './router'
import store from './store'
import installFilter from '@/filters'
// 导入全局样式
import './styles/index.scss'
// 导入权限文件
import './permission'
// 导入SvgIcon 注册
import installIcons from '@/icons/index'
import installDirective from '@/directives'
const app = createApp(App)
installDirective(app)
installFilter(app)
app.use(store).use(router).use(i18n).mount('#app')
installIcons(app)

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
