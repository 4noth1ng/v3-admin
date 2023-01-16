<template>
  <Cmenu
    :data="routes"
    :router="true"
    :css-var="$store.getters.cssVar"
    :isCollapse="!$store.getters.sidebarOpened"
  ></Cmenu>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { filterRouters, generateMenus } from '@/utils/route.js'
import Cmenu from '@/components/Menu/index'

const router = useRouter()
const routes = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  return generateMenus(filterRoutes)
})
</script>

<style lang="scss" scoped></style>
