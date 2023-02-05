<template>
  <div style="display: flex">
    <div style="margin-right: 4px">
      <el-time-select
        v-model="startTime"
        :max-time="endTime"
        class="mr-4"
        :placeholder="startPlaceholder"
        :start="startTimeStart"
        :step="startStep"
        :end="startTimeEnd"
        v-bind="$attrs.startOptions"
      />
    </div>
    <div>
      <el-time-select
        v-model="endTime"
        :min-time="startTime"
        :placeholder="endPlaceholder"
        :start="endTimeStart"
        :step="endStep"
        :end="endTimeEnd"
        :disabled="endTimeDisabled"
        v-bind="$attrs.endOptions"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
let props = defineProps({
  // 开始时间占位符
  startPlaceholder: {
    type: String,
    default: '请选择开始时间'
  },
  // 开始时间初始化
  startTimeStart: {
    type: String,
    default: '08:00'
  },
  // 开始时间的步进
  startStep: {
    type: String,
    default: '00:30'
  },
  // 开始时间的结束选择
  startTimeEnd: {
    type: String,
    default: '24:00'
  },
  // 结束时间占位符
  endPlaceholder: {
    type: String,
    default: '请选择结束时间'
  },
  // 结束时间初始化
  endTimeStart: {
    type: String,
    default: '08:00'
  },
  // 结束时间的步进
  endStep: {
    type: String,
    default: '00:30'
  },
  // 结束时间的结束选择
  endTimeEnd: {
    type: String,
    default: '24:00'
  }
})
let emits = defineEmits(['startChange', 'endChange'])
let startTime = ref<string>('')
let endTime = ref<string>('')
let endTimeDisabled = ref<boolean>(true)
watch(startTime, (val) => {
  if (val === '') {
    endTime.value = ''
    endTimeDisabled.value = true
  } else {
    endTimeDisabled.value = false
    emits('startChange', val)
  }
})
watch(endTime, (val) => {
  if (val) {
    emits('endChange', {
      startTime: startTime.value,
      endTime: val
    })
  }
})
</script>

<style scoped></style>
