<template>
  <div>
    <el-select placeholder="请选择省份" v-model="province" clearable>
      <el-option
        :value="item.code"
        v-for="item in allProvinces"
        :key="item.code"
        :label="item.name"
      ></el-option>
    </el-select>
    <el-select
      clearable
      placeholder="请选择城市"
      :disabled="!province"
      v-model="city"
      style="margin: 0 10px"
    >
      <el-option
        :value="item.code"
        v-for="item in allCities"
        :key="item.code"
        :label="item.name"
      ></el-option>
    </el-select>
    <el-select
      clearable
      placeholder="请选择区域"
      :disabled="!city"
      v-model="area"
    >
      <el-option
        :value="item.code"
        v-for="item in allAreas"
        :key="item.code"
        :label="item.name"
      ></el-option>
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import allProvinces from '../lib/pca-code'
export interface AreaItem {
  name: string
  code: string
  children?: AreaItem[]
}
export interface Data {
  name: string
  code: string
}

let province = ref<string>('')
let city = ref<string>('')
let area = ref<string>('')
let allCities = ref<AreaItem[]>([])
let allAreas = ref<AreaItem[]>([])

let emits = defineEmits(['change'])
watch(province, (val) => {
  if (val) {
    allCities.value = allProvinces.find((item) => item.code === val)
      ?.children as any[]
  }
  city.value = ''
  area.value = ''
})
watch(city, (val) => {
  if (val) {
    let area = allCities.value.find((item) => item.code === val)?.children
    allAreas.value = area as AreaItem[]
  }
  area.value = ''
})
watch(area, (val) => {
  if (val) {
    let provinceData: Data = {
      name:
        province.value &&
        allProvinces.find((item) => item.code === province.value)!.name,
      code: province.value
    }
    let cityData: Data = {
      name:
        city.value &&
        allCities.value.find((item) => item.code === city.value)!.name,
      code: city.value
    }
    let areaData: Data = {
      name: val && allAreas.value.find((item) => item.code === val)!.name,
      code: val
    }
    emits('change', {
      provinceData,
      cityData,
      areaData
    })
  }
})
</script>

<style scoped></style>
