<template>
  <div>
    <choose-area @change="getArea"></choose-area>
  </div>
</template>

<script setup lang="ts">
const getArea = (data: any) => {
  console.log(data)
}
</script>

<style scoped></style>
