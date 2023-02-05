import { defineComponent, h, PropType, resolveComponent, useAttrs } from 'vue'
import { MenuItem } from '../types'
import { ElMenu, ElMenuItem, ElSubMenu, ElIcon, ElButton } from 'element-plus'
import 'element-plus/dist/index.css'

export default defineComponent({
  props: {
    data: {
      type: Array as PropType<MenuItem[]>,
      required: true
    },
    defaultActive: {
      type: String,
      default: ''
    },
    router: {
      type: Boolean,
      default: false
    }
  },
  components: {
    ElMenu,
    ElMenuItem,
    ElSubMenu,
    ElButton,
    ElIcon
  },
  setup(props, ctx) {
    let renderMenu = (data: MenuItem[]) => {
      return data.map((item: MenuItem) => {
        const itemName = item.icon as string
        //渲染插槽
        let slots = {
          title: () => {
            return (
              <>
                <el-icon>{h(resolveComponent(item.icon as string))}</el-icon>
                <span>{item.name}</span>
              </>
            )
          }
        }
        //递归渲染父导航
        if (item.children && item.children.length) {
          return (
            <el-sub-menu index={item.index} v-slots={slots}>
              {renderMenu(item.children)}
            </el-sub-menu>
          )
        }
        //无children 直接渲染
        return (
          <el-menu-item index={item.index}>
            <el-icon>{h(resolveComponent(item.icon as string))}</el-icon>
            <span>{item.name}</span>
          </el-menu-item>
        )
      })
    }
    let attrs = useAttrs()
    return () => {
      return (
        <el-menu default-active={props.defaultActive} router={props.router}>
          {renderMenu(props.data)}
        </el-menu>
      )
    }
  }
})
