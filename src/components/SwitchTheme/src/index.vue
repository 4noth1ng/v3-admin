<template>
  <el-switch
    v-model="value"
    size="large"
    active-text="明亮模式"
    inactive-text="暗黑模式"
  />
</template>

<script setup>
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const value = ref(true)
watch(value, (val) => {
  if (val) {
    // light
    store.commit('theme/setLight')
  } else {
    store.commit('theme/setDark')
  }
})
</script>

<style lang="scss" scoped></style>
