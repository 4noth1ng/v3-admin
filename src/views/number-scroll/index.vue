<template>
  <div>
    <number-scroll
      target="5999"
      :duration="1.2"
      :reload="reload"
      v-if="reload"
    ></number-scroll>
    <el-button @click="onReload" style="margin-top: 100px">重新滚动</el-button>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
const reload = ref(true)
const onReload = () => {
  reload.value = false
  nextTick(() => {
    reload.value = true
  })
}
</script>

<style lang="scss" scoped></style>
