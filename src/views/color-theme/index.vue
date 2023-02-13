<template>
  <div style="display: flex; width: 400px; justify-content: space-between">
    <div>
      <el-button @click="handleSetTheme"> 主题选择 </el-button>
      <SelectColor v-model="selectColorVisible"></SelectColor>
      <div class="theme-container" style="margin-top: 20px">
        <el-button type="primary"> TEST </el-button>
      </div>
    </div>
    <div>
      <switch-theme></switch-theme>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SelectColor from '@/components/ThemeSelect/components/SelectColor.vue'
const selectColorVisible = ref(false)
const handleSetTheme = () => {
  selectColorVisible.value = true
}
</script>

<style lang="scss" scoped></style>
