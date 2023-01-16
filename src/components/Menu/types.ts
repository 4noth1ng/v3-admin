export default interface routeItem {
  path: string
  meta: {
    icon: string
    title: string
  }
  children: routeItem[]
}
