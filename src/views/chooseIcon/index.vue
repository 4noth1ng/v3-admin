<template>
  <div>
    <m-choose-icon :title="title" v-model:visible="visible" :type="type">
      选择图标
    </m-choose-icon>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
let title = ref<string>('选择图标')
let visible = ref<boolean>(false)
let type = ref<string>('primary')
</script>

<style scoped></style>
