<template>
  <el-table :data="tableData" v-bind="$attrs" ref="tableRef">
    <template v-for="(item, index) in tableColumn" :key="index">
      <el-table-column :prop="item.prop" :label="item.label"></el-table-column>
    </template>
  </el-table>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { ref } from 'vue'
import Sortable from 'sortablejs'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

// 排序相关
const tableRef = ref()

const props = defineProps({
  tableData: {
    type: Array,
    required: true
  },
  tableColumn: {
    type: Object,
    required: true
  }
})
const emits = defineEmits(['onSuccess'])
const i18n = useI18n()

const initSortable = (tableData, cb?) => {
  // 设置拖拽效果
  const el = tableRef.value.$el.querySelectorAll('.el-table__body > tbody')[0]
  // 1. 要拖拽的元素
  // 2. 配置对象
  Sortable.create(el, {
    // 拖拽时类名
    ghostClass: 'sortable-ghost',
    // 拖拽结束的回调方法
    async onEnd(event) {
      const { newIndex, oldIndex } = event
      // 修改数据
      emits('onSuccess', {
        newIndex,
        oldIndex
      })
      ElMessage.success({
        message: i18n.t('msg.article.sortSuccess'),
        type: 'success'
      })
      // 直接重新获取数据无法刷新 table！！
      tableData.value = []
      // 重新获取数据
      cb && cb()
    }
  })
}
onMounted(() => {
  initSortable(props.tableData)
})
</script>

<style scoped></style>
