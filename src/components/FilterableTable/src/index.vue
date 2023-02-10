<template>
  <div>
    <el-card style="margin-bottom: 20px">
      <el-checkbox-group v-model="checkList">
        <template v-for="(item, index) in tableColumn" :key="index">
          <el-checkbox :label="item.label"></el-checkbox>
        </template>
      </el-checkbox-group>
    </el-card>
    <el-card>
      <el-table :data="tableData" v-bind="$attrs">
        <template v-for="(item, index) in tablecols" :key="index">
          <el-table-column
            :prop="item.prop"
            :label="item.label"
          ></el-table-column>
        </template>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { tableColumns } from '@/views/article-ranking/dynamic'
import { column } from 'element-plus/es/components/table-v2/src/common'
import { PropType, ref, watch } from 'vue'
interface tableColumn {
  label: string
  prop?: string
}
interface checkList {
  label: string
}
const props = defineProps({
  tableData: {
    type: Array,
    required: true
  },
  tableColumn: {
    type: Array as PropType<tableColumn[]>,
    required: true
  }
})
const tablecols = ref<tableColumn[]>([])
tablecols.value = tableColumns.value
const checkList = ref<string[]>([])
checkList.value = tableColumns.value.map((item: checkList) => item.label)
watch(
  () => checkList,
  () => {
    console.log(checkList.value)

    tablecols.value = tableColumns.value.filter((item: tableColumn) => {
      for (const item2 of checkList.value) {
        if (item.label === item2) return item
      }
    })
  },
  { deep: true }
)
</script>

<style scoped></style>
