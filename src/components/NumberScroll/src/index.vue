<template>
  <div class="scroll-container">
    <template v-for="(item, index) in targetArr" :key="index" v-if="reloop">
      <ul class="scroll-list" ref="list">
        <li>0</li>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
      </ul>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, watch } from 'vue'
const props = defineProps({
  target: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    default: 0.5
  },
  reload: {
    type: Boolean,
    default: true
  }
})
const list = ref(null)
const timer = ref()
const targetArr = ref<number[]>([])
const listAnimation = () => {
  for (const str of props.target) {
    targetArr.value.push(parseInt(str))
  }
  nextTick(() => {
    targetArr.value.forEach((targetNum, index) => {
      const dom: HTMLElement = list.value![index]
      if (dom)
        dom.style.transition = `all linear ${props.duration + index * 0.3}s`
      for (let i = 0; i <= targetNum; i++) {
        const idx = -i * 100
        timer.value = setTimeout(() => {
          if (dom) dom.style.transform = `translateY(${idx}%)`
        }, 0)
      }
    })
  })
}
onMounted(() => {
  listAnimation()
})
const reloop = ref(true)
const onReloop = () => {
  reloop.value = false
  nextTick(() => {
    reloop.value = true
    targetArr.value = []
    listAnimation()
  })
}
watch(
  () => props.reload,
  () => {
    onReloop()
  }
)
defineExpose({
  onReloop
})
</script>

<style scoped lang="scss">
.scroll-container {
  width: 100px;
  height: 37px;
  display: flex;
  overflow: hidden;
  .scroll-list {
    padding: 0;
    margin: 0;
    list-style: none;
    text-align: center;
    font-size: 28px;
    li {
      height: 37px;
    }
  }
}
</style>
