<template>
  <div>
    <c-progress
      type="circle"
      :percentage="100"
      status="success"
      :time="3000"
    ></c-progress>
    <c-progress :percentage="60" :time="3000"></c-progress>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
