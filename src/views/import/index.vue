<template>
  <upload-excel :onSuccess="onSuccess"> </upload-excel>
</template>

<script setup>
import {} from 'vue'
import UploadExcel from '@/components/UploadExcel'
import { generateData } from './utils.js'
import { userBatchImport } from '@/api/user-manage'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
const i18n = useI18n()
const router = useRouter()
/**
 * 数据解析成功之后的回调
 */
const onSuccess = async ({ headers, results }) => {
  const updateData = generateData(results)
  await userBatchImport(updateData)
  ElMessage.success({
    message: results.length + i18n.t('msg.excel.importSuccess'),
    type: 'success'
  })
  router.push('/user/manage')
}
</script>

<style lang="scss" scoped></style>
