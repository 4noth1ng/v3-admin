<template>
  <el-menu
    :background-color="cssVar?.menuBg"
    :text-color="cssVar?.menuText"
    :active-text-color="cssVar?.menuActiveText"
    :unique-opened="true"
    :router="router"
    :default-active="activeMenu"
    :collapse="isCollapse"
    class="menu-container"
  >
    <template v-for="(item, index) in data">
      <el-menu-item
        v-if="!item.children || !item.children.length"
        :index="item.path"
        :route="item"
      >
        <svgIcon :icon="item.meta.icon"></svgIcon>
        <template #title
          ><span>{{ generateTitle(item.meta.title) }}</span></template
        >
      </el-menu-item>
      <el-sub-menu v-else :index="item.path">
        <template #title>
          <svgIcon :icon="item.meta.icon"></svgIcon>
          <span>{{ generateTitle(item.meta.title) }}</span>
        </template>
        <template v-for="(item1, index1) in item.children" :key="index1">
          <el-menu-item :index="item1.path">
            <template #title>
              <svgIcon :icon="item1.meta.icon"></svgIcon>
              <span>{{ generateTitle(item1.meta.title) }}</span>
            </template>
          </el-menu-item>
        </template>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'
import { useRoute } from 'vue-router'
import routeItem from './types'
import svgIcon from '@/components/SvgIcon'
import { generateTitle } from '@/utils/i18n'
const route = useRoute()
const activeMenu = computed(() => {
  const { path } = route
  return path
})
let props = defineProps({
  data: {
    type: Array as PropType<routeItem[]>,
    required: true
  },
  router: {
    type: Boolean,
    default: true
  },
  cssVar: {
    type: Object
  },
  isCollapse: {
    type: Boolean,
    required: true
  }
})
console.log(props.data)
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.menu-container {
  :deep(.el-menu-tooltip__trigger) {
    padding: 0 0 0 19px;
  }
  :deep(.el-sub-menu__title) {
    padding: 0 0 0 19px;
  }
}
</style>
