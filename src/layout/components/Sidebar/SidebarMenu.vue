<template>
  <Cmenu
    :data="routes"
    :router="true"
    :css-var="$store.getters.cssVar"
    :isCollapse="!$store.getters.sidebarOpened"
  ></Cmenu>
</template>

<script setup>
import { computed, watch, onBeforeMount, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { filterRouters, generateMenus } from '@/utils/route.js'
import Cmenu from '@/components/Menu/index'
import { useResize, useResizeHandler } from '@/hooks/useResize'

const router = useRouter()
const routes = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  console.log(generateMenus(filterRoutes))
  return generateMenus(filterRoutes)
})
const route = useRoute()
watch(
  route,
  (val) => {
    useResize()
  },
  {
    immediate: true
  }
)
onBeforeMount(() => {
  window.addEventListener('resize', useResizeHandler)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', useResizeHandler)
})
</script>

<style lang="scss" scoped></style>
