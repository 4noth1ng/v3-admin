<template>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="24" :lg="12"
      ><el-card><v-chart class="chart" :option="option" autoresize /></el-card>
    </el-col>
    <el-col :xs="24" :sm="24" :lg="12"
      ><el-card><pluginData></pluginData></el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import pluginData from './pluginData.vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import { GridComponent, TitleComponent } from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'
import { ref, provide } from 'vue'
use([CanvasRenderer, LineChart, GridComponent, TitleComponent])

provide(THEME_KEY, 'light')

const option = ref({
  title: {
    text: '访问人数',
    left: 'center'
  },
  xAxis: {
    data: ['一月', '二月', '三月', '四月', '五月']
  },
  yAxis: {},
  series: [
    {
      data: [10, 22, 28, 23, 19],
      type: 'line',
      label: {
        show: true,
        position: 'bottom',
        textStyle: {
          fontSize: 20
        }
      },
      smooth: true
    }
  ]
})
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 50vh;
}
</style>
