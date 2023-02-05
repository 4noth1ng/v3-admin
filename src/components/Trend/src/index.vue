<template>
  <div class="trend">
    <div class="text" :style="{ fontSize: textSize, color: textColor }">
      <slot v-if="slots.default"></slot>
      <div v-else>{{ text }}</div>
    </div>
    <div class="icon">
      <el-icon
        v-if="type === 'up'"
        :style="{ color: !reverseColor ? upIconColor : '#52c41a' }"
      >
        <component :is="upIcon" />
      </el-icon>
      <el-icon
        v-else
        :style="{ color: !reverseColor ? downIconColor : '#f5222d' }"
      >
        <component :is="downIcon" />
      </el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSlots, computed } from 'vue'
let props = defineProps({
  //标记为上升up还是下降down
  type: {
    type: String,
    default: 'up'
  },
  //趋势显示的文字text
  text: {
    type: String,
    default: '文字'
  },
  //文字大小
  textSize: {
    type: String,
    default: '14px'
  },
  //上升图标颜色
  upIconColor: {
    type: String,
    default: '#f5222d'
  },
  //下降图标颜色
  downIconColor: {
    type: String,
    default: '#52c41e'
  },
  //反转图标颜色
  reverseColor: {
    type: Boolean,
    default: false
  },
  //上升趋势的文字颜色
  upTextColor: {
    type: String,
    default: 'black'
  },
  //下降趋势的文字颜色
  downTextColor: {
    type: String,
    default: 'black'
  },
  //上升趋势显示的图标
  upIcon: {
    type: String,
    default: 'ArrowUp'
  },
  //下降趋势显示的图标
  downIcon: {
    type: String,
    default: 'ArrowDown'
  }
})
let slots = useSlots()
let textColor = computed(() => {
  return props.type === 'up' ? props.upTextColor : props.downTextColor
})
</script>

<style scoped lang="scss">
.trend {
  display: flex;
  align-items: center;
  .icon {
    display: flex;
    align-items: center;
    margin-left: 4px;
    svg {
      width: 1.2em;
      height: 1.2em;
    }
  }
}
</style>
