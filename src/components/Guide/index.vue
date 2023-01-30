<template>
  <div>
    <el-tooltip :content="$t('msg.navBar.guide')">
      <div @click="onClick"><svg-icon icon="guide" id="guide-start" /></div>
    </el-tooltip>
  </div>
</template>

<script setup>
import SvgIcon from '../SvgIcon/index.vue'
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
