<template>
  <div>
    <choose-time
      @startChange="startChange"
      @endChange="endChange"
      :startOptions="startOptions"
      :endOptions="endOptions"
    ></choose-time>
    <choose-date
      @startChange="startChange1"
      @endChange="endChange1"
      :startOptions="startOptions"
      :endOptions="endOptions"
    ></choose-date>
  </div>
</template>

<script setup lang="ts">
interface endValue {
  startTime: string
  endTime: string
}
interface endDateValue {
  startDate: Date
  endDate: Date
}
const startChange = (val: string) => {
  console.log(val)
}
const endChange = (val: endValue) => {
  console.log(val)
}
const startOptions = {
  size: 'small',
  clearable: true
}
const endOptions = {
  size: 'small',
  clearable: false
}
const startChange1 = (val: string) => {
  console.log(val)
}
const endChange1 = (val: endDateValue) => {
  console.log(val)
}
</script>

<style scoped></style>
