export interface MenuItem {
  //图标
  icon?: string
  //名字
  name: string
  //标识
  index: string
  //子导航
  children?: MenuItem[]
}
