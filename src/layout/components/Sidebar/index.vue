<template>
  <el-scrollbar>
    <div>
      <div class="logo-container">
        <SvgIcon icon="element-plus-logo" class="svgIcon"></SvgIcon>
      </div>
      <SidebarMenu></SidebarMenu>
    </div>
  </el-scrollbar>
</template>

<script setup>
import SvgIcon from '@/components/SvgIcon'
import SidebarMenu from './SidebarMenu'


import { useStore } from 'vuex'
const logoHeight = 44
</script>

<style lang="scss" scoped>
.logo-container {
  height: v-bind(logoHeight) + 'px';
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
  }
  :deep(.svg-icon) {
    width: 125px !important;
    height: 72px !important;
    margin-right: 0 !important;
  }
  .logo-title {
    margin-left: 10px;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 16px;
    white-space: nowrap;
  }
}
</style>
