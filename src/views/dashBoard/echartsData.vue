<template>
  <el-row :gutter="50">
    <el-col :xs="24" :sm="24" :lg="18"
      ><v-chart class="chart" :option="option" autoresize />
    </el-col>
    <el-col :xs="24" :sm="24" :lg="6">
      <div>
        <el-card>刚刚加入的会员</el-card>
        <el-card>
          <template v-for="(item, i) in newUser" :key="i">
            <el-card>
              <el-avatar></el-avatar>
              <span class="username">{{ item.name }}</span>
              <span class="usertime"> </span>
            </el-card>
          </template>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'
import { ref, provide } from 'vue'
use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
])

provide(THEME_KEY, 'light')

const option = ref({
  title: {
    text: '会员来源',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['百度', '广告', '直接访问', '坐飞机', '坐高铁']
  },
  series: [
    {
      name: '会员来源',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        { value: 335, name: '百度' },
        { value: 310, name: '广告' },
        { value: 234, name: '直接访问' },
        { value: 135, name: '坐飞机' },
        { value: 1548, name: '坐高铁' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(255, 255, 255, 0.5)'
        }
      }
    }
  ]
})
const newUser = ref([
  {
    name: 'abc',
    time: '2002-10-23'
  },
  {
    name: 'abc',
    time: '2002-10-23'
  },
  {
    name: 'abc',
    time: '2002-10-23'
  }
])
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 50vh;
}
</style>
