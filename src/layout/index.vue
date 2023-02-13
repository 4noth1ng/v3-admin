<template>
  <div
    class="app-wrapper"
    :class="[$store.getters.sidebarOpened ? 'openSidebar' : 'hideSidebar']"
    :style="{
      backgroundColor: $store.getters.cssVar.mainBgColor,
      color: $store.getters.cssVar.mainColor
    }"
  >
    <!-- 左侧 menu -->
    <sidebar
      id="guide-sidebar"
      class="sidebar-container"
      :style="{ backgroundColor: $store.getters.cssVar.menuBg }"
    />
    <div class="main-container">
      <div class="fixed-header">
        <!-- 顶部的 navbar -->
        <navbar
          :style="{
            backgroundColor: $store.getters.cssVar.navbarBg,
            color: $store.getters.cssVar.navbarText
          }"
        />
        <!-- tags -->
        <tags-view
          id="guide-tags"
          :style="{
            backgroundColor: $store.getters.cssVar.navbarBg,
            color: $store.getters.cssVar.navbarText
          }"
        ></tags-view>
      </div>
      <!-- 内容区 -->

      <app-main />
    </div>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import AppMain from './components/AppMain'
import variables from '@/styles/variables.module.scss'
import TagsView from '@/components/TagsView'
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
onMounted(() => {
  console.log(variables)
})
const store = useStore()
const headerColor = ref(store.getters.cssVar.navbarBg)
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.module.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width #{$sideBarDuration};
}

.hideSidebar .fixed-header {
  width: calc(100% - #{$hideSideBarWidth});
}
// #guide-tags {
//   background-color: v-bind('headerColor.value');
// }
</style>
