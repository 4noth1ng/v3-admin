<template>
  <div>
    <div class="flex">
      <div>
        <m-trend text="工资" reverseColor upTextColor="#eaeaea">上升</m-trend>
      </div>
      <div><m-trend text="下降" type="down" reverseColor></m-trend></div>
    </div>
    <div class="flex">
      <div>
        <m-trend text="成功" upIconColor="#eae" upIcon="Search"></m-trend>
      </div>
      <div><m-trend text="失败" type="down"></m-trend></div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.flex {
  display: flex;
  padding: 5px 0;
  div {
    padding: 0 5px;
  }
}
</style>
