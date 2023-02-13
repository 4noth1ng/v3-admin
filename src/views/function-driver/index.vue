<template>
  <div>
    <h2 style="margin-bottom: 20px">基于driver.js</h2>
    <el-button type="primary" @click="onClick">引导</el-button>
  </div>
</template>

<script setup>
import SvgIcon from '@/components/SvgIcon'
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import steps from './step.js'

const i18n = useI18n()

let driver = null
const onClick = () => {
  console.log(123)
  driver.defineSteps(steps(i18n))
  driver.start()
}
onMounted(() => {
  driver = new Driver({
    // 禁止点击蒙版关闭
    allowClose: false,
    closeBtnText: i18n.t('msg.guide.close'),
    nextBtnText: i18n.t('msg.guide.next'),
    prevBtnText: i18n.t('msg.guide.prev')
  })
})
</script>

<style scoped></style>
