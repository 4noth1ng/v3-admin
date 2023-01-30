<template>
  <div class="container">
    <!-- 主题图标  
    v-bind：https://v3.cn.vuejs.org/api/instance-properties.html#attrs -->
    <el-dropdown
      v-bind="$attrs"
      trigger="click"
      class="theme"
      @command="handleSetTheme"
    >
      <div>
        <el-tooltip :content="$t('msg.navBar.themeChange')">
          <div>
            <svg-icon
              icon="change-theme"
              id="guide-theme"
              class="changetheme"
            />
          </div>
        </el-tooltip>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="color">
            {{ $t('msg.theme.themeColorChange') }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <!-- 展示弹出层 -->
    <div>
      <select-color v-model="selectColorVisible"></select-color>
    </div>
  </div>
</template>

<script setup>
import SelectColor from './components/SelectColor.vue'
import { ref } from 'vue'

const selectColorVisible = ref(false)
const handleSetTheme = (command) => {
  selectColorVisible.value = true
}
</script>

<style lang="scss" scoped>
.container {
  :deep(.svg-icon) {
    width: 18px;
    height: 18px;
  }
}
</style>
