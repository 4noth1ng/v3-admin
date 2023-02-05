<template>
  <el-popover
    v-model:visible="visible"
    placement="bottom-end"
    :width="430"
    trigger="click"
  >
    <template #reference>
      <div class="result">
        <div>{{ result }}</div>
        <div class="result-icon" :class="{ rotate: !visible }">
          <el-icon>
            <ArrowUp></ArrowUp>
          </el-icon>
        </div>
      </div>
    </template>
    <div class="container">
      <el-row>
        <el-col :span="8">
          <el-radio-group v-model="radioValue" size="small">
            <el-radio-button label="按城市" />
            <el-radio-button label="按省份" />
          </el-radio-group>
        </el-col>
        <el-col :offset="1" :span="15" class="select-container">
          <el-select
            v-model="selectValue"
            placeholder="请搜索城市"
            size="small"
            filterable
            :filter-method="filterMethod"
            @change="changeSelect"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-col>
      </el-row>
      <template v-if="radioValue === '按城市'">
        <div class="city">
          <div
            v-for="(item, index) in Object.keys(cities)"
            :key="index"
            class="city-item"
            @click="clickChat(item)"
            style="cursor: pointer"
          >
            {{ item }}
          </div>
        </div>
        <el-scrollbar max-height="300px">
          <template v-for="(value, key) in cities" :key="key">
            <el-row style="margin-bottom: 10px" :id="key">
              <el-col :span="2">{{ key }}:</el-col>
              <el-col :span="22" class="city-name">
                <div
                  class="city-name-item"
                  v-for="(item, index) in value"
                  :key="item.id"
                  @click="clickItem(item)"
                  style="cursor: pointer"
                >
                  {{ item.name }}
                </div>
              </el-col>
            </el-row>
          </template>
        </el-scrollbar>
      </template>
      <template v-else>
        <div class="province">
          <div
            v-for="(item, index) in Object.keys(provinces)"
            :key="index"
            class="province-item"
            @click="clickChat(item)"
            style="cursor: pointer"
          >
            {{ item }}
          </div>
        </div>
        <el-scrollbar max-height="300px">
          <template
            v-for="(item, index) in Object.values(provinces)"
            :key="index"
          >
            <template v-for="(item1, index1) in item" :key="index1">
              <el-row style="margin-bottom: 10px">
                <el-col :span="3">{{ item1.name }}:</el-col>
                <el-col :span="21" class="city-name">
                  <div
                    :id="item1.id"
                    class="city-name-item"
                    v-for="(item2, index2) in item1.data"
                    :key="index2"
                    @click="clickProvince(item2)"
                    style="cursor: pointer"
                  >
                    {{ item2 }}
                  </div>
                </el-col>
              </el-row>
            </template>
          </template>
        </el-scrollbar>
      </template>
    </div>
  </el-popover>
</template>

<script setup lang="ts">
import city from '../lib/city'
import province from '../lib/province'
import { ref, watch, onMounted } from 'vue'
import { City, Province } from '../src/types'
let emits = defineEmits(['change', 'provinceChange'])
// 最终选择的结果
let result = ref<string>('请选择')
// 控制弹出层的显示
let visible = ref<boolean>(false)
// 单选框的值，按城市
let radioValue = ref<string>('按城市')
// 下拉框的值
let selectValue = ref<string>('')
// 下拉框数据
let options = ref<City[]>()
// 所有城市的数据
let cities = ref(city.cities)
let provinces = ref(province)
// 点击每个城市
let clickItem = (item: City) => {
  // 给结果赋值
  result.value = item.name
  // 关闭弹出层
  visible.value = false
  emits('change', item)
}
let clickChat = (item: string) => {
  let el = document.getElementById(item)
  if (el) el.scrollIntoView()
}
let clickProvince = (item: string) => {
  result.value = item
  visible.value = false
  emits('provinceChange', item)
}
onMounted(() => {
  let values = Object.values(cities.value).flat(2)
  options.value = values
})
// 搜索输入框的值
let searchValue = ref<string>('')
let filterMethod = (val: string) => {
  searchValue.value = val
  if (!val) {
    let values = Object.values(cities.value).flat(2)
    options.value = values
  } else {
    if (radioValue.value === '按城市') {
      //中文和拼音
      let values = Object.values(cities.value).flat(2)
      options.value = values.filter((item) => {
        return item.name.includes(val) || item.spell.includes(val)
      })
      emits('change', val)
    } else {
      //中文
      let values = Object.values(cities.value).flat(2)
      options.value = values.filter((item) => {
        return item.name.includes(val)
      })
    }
  }
}
let changeSelect = (val: number) => {
  let values = Object.values(cities.value).flat(2)
  let city = values.find((item) => item.id === val)
  result.value = city!.name
  if (radioValue.value === '按城市') {
    emits('change', city)
  } else {
    emits('provinceChange', city?.name)
  }
}
</script>

<style scoped lang="scss">
.result {
  display: flex;
  align-items: center;
  width: fit-content;
  cursor: pointer;
  &-icon {
    position: relative;
    top: 1px;
    left: 4px;
    transition: all 0.25s linear;
  }
}
.container {
  padding: 6px;
  .select-container {
    margin-top: 3px;
  }
}
.rotate {
  transform: rotate(180deg);
}
.city,
.province {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 10px;
  margin-bottom: 10px;
  &-item {
    padding: 3px 6px;
    margin-right: 8px;
    margin-bottom: 6px;
    border: 1px solid #eee;
  }
}
.city-name {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  &-item {
    margin-right: 6px;
    margin-bottom: 6px;
  }
}
</style>
