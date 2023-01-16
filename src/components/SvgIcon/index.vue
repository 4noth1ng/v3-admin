<template>
  <!-- 外部图标 -->
  <div
    v-if="isExternal"
    :class="className"
    class="svg-external-icon svg-icon"
    :style="styleExternalIcon"
  ></div>
  <!-- 内部图标 -->
  <svg v-else :class="className" :aria-hidden="true" class="svg-icon">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script setup>
import { isExternal as external } from '@/utils/validate'
import { computed } from 'vue'
const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: ''
  }
})
/**
 * 项目外图标
 */
const isExternal = computed(() => {
  return external(props.icon)
})
const styleExternalIcon = computed(() => ({
  mask: `url(${props.icon}) no-repeat 50% 50%`,
  '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`
}))
/**
 * 项目内图标
 */
const iconName = computed(() => `#icon-${props.icon}`)
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
