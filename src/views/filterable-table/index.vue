<template>
  <div>
    <filterable-table
      border
      :tableData="tableData"
      :tableColumn="tableColumn"
    ></filterable-table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { getArticleList, articleSort, deleteArticle } from '@/api/article'

// 数据相关
const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(10)

const getListData = async () => {
  const result = await getArticleList({
    page: page.value,
    size: size.value
  })
  tableData.value = result.list
  total.value = result.total
}
getListData()
const i18n = useI18n()
const tableColumn = [
  {
    label: i18n.t('msg.article.ranking'),
    prop: 'ranking'
  },
  {
    label: i18n.t('msg.article.title'),
    prop: 'title'
  },
  {
    label: i18n.t('msg.article.author'),
    prop: 'author'
  },
  {
    label: i18n.t('msg.article.publicDate'),
    prop: 'publicDate'
  },
  {
    label: i18n.t('msg.article.desc'),
    prop: 'desc'
  },
  {
    label: i18n.t('msg.article.action'),
    prop: 'action'
  }
]
</script>

<style lang="scss" scoped></style>
