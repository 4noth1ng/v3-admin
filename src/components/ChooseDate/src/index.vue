<template>
  <div style="display: flex; margin-top: 20px">
    <div style="margin-right: 20px">
      <el-date-picker
        v-model="startDate"
        type="date"
        :placeholder="startPlaceholder"
        :disabled-date="startDisabledDate"
        v-bind="$attrs.startOptions"
      />
    </div>
    <div>
      <el-date-picker
        v-model="endDate"
        type="date"
        :placeholder="endPlaceholder"
        :disabled="endDateDisabled"
        :disabled-date="endDisabledDate"
        v-bind="$attrs.endOptions"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
let props = defineProps({
  // 开始日期的占位符
  startPlaceholder: {
    type: String,
    default: '请选择开始日期'
  },
  // 结束日期的占位符
  endPlaceholder: {
    type: String,
    default: '请选择结束日期'
  },
  // 是否禁用选择今天之前的日期
  disableToday: {
    type: Boolean,
    default: true
  }
})
let emits = defineEmits(['startChange', 'endChange'])
// 开始日期
let startDate = ref<Date | null>(null)
// 结束日期
let endDate = ref<Date | null>(null)
// 结束日期禁用
let endDateDisabled = ref<boolean>(true)
// 禁用开始日期的函数
let startDisabledDate = (time: Date) => {
  if (props.disableToday) {
    //今天之前
    return time.getTime() < Date.now() - 1000 * 60 * 60 * 24
  }
}
// 禁用结束日期的函数
let endDisabledDate = (time: Date) => {
  if (props.disableToday && startDate.value) {
    return time.getTime() < startDate.value.getTime() + 1000 * 60 * 60 * 24
  }
}
watch(startDate, (val) => {
  if (!val) {
    endDateDisabled.value = true
    endDate.value = null
  } else {
    endDateDisabled.value = false
    emits('startChange', val)
  }
})
watch(endDate, (val) => {
  if (val) {
    emits('endChange', {
      startDate: startDate.value,
      endDate: endDate.value
    })
  }
})
</script>

<style scoped></style>
