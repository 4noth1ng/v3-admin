<template>
  <div>
    <el-button :type="type" @click="handleClick">
      <slot></slot>
    </el-button>
    <div class="m-choose-icon-dialog-body-height">
      <el-dialog :title="title" v-model="dialogVisible">
        <div class="search-container" ref="searchcontainer">
          <el-input prefix-icon="Search" v-model="iconSearch"></el-input>
        </div>
        <div class="container">
          <div
            v-for="(item, index) in iconArray"
            :key="index"
            class="item"
            @click="copyIcon(item)"
          >
            <div class="icon">
              <component :is="item"></component>
            </div>
            <div>{{ item }}</div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { useCopy } from '../../../hooks/useCopy'
import { ref, reactive, computed, watch } from 'vue'
const props = defineProps<{
  //button内容
  title: string
  //button 样式
  type: string
  //控制显隐
  visible: boolean
}>()
const emits = defineEmits(['update:visible'])
const dialogVisible = ref<boolean>(props.visible)
//控制dialog显隐
const handleClick = () => {
  dialogVisible.value = !dialogVisible.value
  iconSearch.value = ''
}
//传递给父组件
watch(dialogVisible, (val) => {
  emits('update:visible', val)
})

let iconArr = reactive<string[]>([])
for (const item of Object.keys(ElementPlusIconsVue)) {
  iconArr.push(item)
}
let iconSearch = ref<string>('')
//搜索
const iconArray = computed(() => {
  return iconArr.filter((item) => {
    return item.toLowerCase().indexOf(iconSearch.value as string) !== -1
  })
})
//复制icon
const copyIcon = (text: string) => {
  useCopy(text)
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: start;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 5px;
  .item {
    width: 25%;
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 14px;
    &:hover {
      cursor: pointer;
      box-shadow: 2px 2px 7px 0 rgb(0, 0, 0, 0.2);
    }
    .icon {
      width: 2em;
      height: 2em;
    }
  }
}
</style>
