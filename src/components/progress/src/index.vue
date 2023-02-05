<template>
  <el-progress :percentage="progress" v-bind="$attrs"></el-progress>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

let props = defineProps({
  //进度条进度
  percentage: {
    type: Number,
    default: 0
  },
  //进度条是否有动画效果
  isAnimation: {
    type: Boolean,
    default: true
  },
  //动画时长
  time: {
    type: Number,
    default: 3000
  }
})
let progress = ref(0)
onMounted(() => {
  let t = Math.ceil(props.time / props.percentage)
  if (props.isAnimation) {
    let timer = setInterval(() => {
      if (progress.value < props.percentage) {
        progress.value++
      } else {
        clearInterval(timer)
      }
    }, t)
  } else {
    progress.value = props.percentage
  }
})
</script>

<style scoped></style>
