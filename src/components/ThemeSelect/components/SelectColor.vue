<template>
  <el-dialog title="提示" :model-value="modelValue" @close="closed" width="22%">
    <div class="center">
      <p class="title">系统主题</p>
      <el-color-picker
        v-model="mColor"
        :predefine="predefineColors"
      ></el-color-picker>
    </div>
    <div class="center">
      <p class="title">头部主题</p>
      <el-color-picker
        v-model="headerColor"
        :predefine="predefineColors"
      ></el-color-picker>
    </div>
    <div class="center">
      <p class="title">内容主题</p>
      <el-color-picker
        v-model="appmainColor"
        :predefine="predefineColors"
      ></el-color-picker>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
        <el-button type="primary" @click="comfirm">{{
          $t('msg.universal.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'
import variables from '@/styles/variables.module.scss'

const store = useStore()
// 默认色值
const mColor = ref(store.getters.mainColor)
// 头部（面包屑及顶部导航栏颜色）色值
const headerColor = ref(store.getters.cssVar.navbarBg)
// appmain部分color
const appmainColor = ref(store.getters.cssVar.mainBgColor)

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})
const emits = defineEmits(['update:modelValue'])

// 预定义色值
const predefineColors = [
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577'
]

/**
 * 关闭
 */
const closed = () => {
  emits('update:modelValue', false)
}
/**
 * 确定
 * 1. 修改主题色
 * 2. 保存最新的主题色
 * 3. 关闭 dialog
 */
const comfirm = async () => {
  // 1.1 获取主题色
  const newStyleText = await generateNewStyle(mColor.value)
  // 1.2 写入最新主题色
  writeNewStyle(newStyleText)
  // 2. 保存最新的主题色
  store.commit('theme/setMainColor', mColor.value)
  store.commit('theme/setHeaderColor', headerColor.value)
  store.commit('theme/setAppColor', appmainColor.value)
  // 3. 关闭 dialog

  console.log(variables)
  closed()
}
</script>

<style lang="scss" scoped>
.center {
  text-align: center;
  .title {
    margin-bottom: 12px;
  }
}
</style>
