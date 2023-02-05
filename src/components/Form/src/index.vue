<template>
  <el-form :model="model" :rules="rules" ref="form" v-bind="$attrs">
    <template v-for="(item, index) in options" :key="index">
      <el-form-item
        :prop="item.prop"
        :label="item.label"
        v-if="!item.children || !item.children.length"
      >
        <component
          v-bind="item.attrs"
          :is="`el-${item.type}`"
          v-if="item.type !== 'upload' && item.type !== 'editor'"
          v-model="model[item.prop!]"
        ></component>
        <el-upload v-if="item.type === 'upload'" v-bind="item.attrs">
          <template #trigger>
            <slot name="trigger"></slot>
          </template>
          <template #tip>
            <slot name="tip"></slot>
          </template>
        </el-upload>
        <template v-if="item.type === 'editor'">
          <div id="editor-box"></div>
        </template>
      </el-form-item>
      <el-form-item v-else :prop="item.prop" :label="`${item.label}`">
        <component
          :is="`el-${item.type}`"
          v-bind="item.attrs"
          v-model="model[item.prop!]"
        >
          <component
            v-for="(child, i) in item.children"
            :key="i"
            :is="`el-${child.type}`"
            v-bind="child.attrs"
            :value="child.value"
            :label="child.label"
          ></component>
        </component>
      </el-form-item>
    </template>
    <el-form-item>
      <slot name="action" :form="form" :model="model"></slot>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import {
  ElInput,
  ElCascader,
  ElCheckbox,
  ElCheckboxGroup,
  ElSelect,
  ElOption,
  ElOptionGroup,
  ElRadio,
  ElRadioGroup,
  ElColorPicker,
  ElUpload,
  FormInstance
} from 'element-plus'
import { cloneDeep } from 'lodash'
import { useStore } from 'vuex'
import { DomElementSelector } from 'wangeditor/dist/utils/dom-core'
export default {
  components: {
    ElInput,
    ElCascader,
    ElCheckbox,
    ElCheckboxGroup,
    ElSelect,
    ElOption,
    ElOptionGroup,
    ElRadio,
    ElRadioGroup,
    ElColorPicker,
    ElUpload
  }
}
</script>
<script setup lang="ts">
import {
  PropType,
  ref,
  watch,
  shallowReactive,
  onMounted,
  nextTick,
  onBeforeUnmount
} from 'vue'
import { FormOptions } from './types/types'
import E from 'wangeditor'
import i18next from 'i18next'

let emits = defineEmits([
  'on-preview',
  'on-remove',
  'on-success',
  'on-error',
  'on-progress',
  'on-change',
  'before-upload',
  'before-remove',
  'on-exceed'
])
let props = defineProps({
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true
  }
})
let store = useStore()
let model = ref<any>({})
let rules = ref<any>({})
let form = ref<FormInstance | null>()
let initForm = () => {
  let m: any = {}
  let r: any = {}
  props.options.map((item: FormOptions) => {
    m[item.prop!] = item.value
    r[item.prop!] = item.rules
    if (item.type === 'editor') {
      nextTick(() => {
        editor.txt.html(item.value)
        editor.config.placeholder = item.placeholder as string
      })
    }
  })
  console.log(m)
  console.log(r)

  model.value = cloneDeep(m)
  rules.value = cloneDeep(r)
}
onMounted(() => {
  initForm()
})
// 监听父组件传递进来的options
watch(
  () => props.options,
  () => {
    initForm()
  },
  { deep: true }
)
// 上传组件的所有方法
let onPreview = (file: File) => {
  emits('on-preview', file)
}
let onRemove = (file: File, fileList: FileList) => {
  emits('on-remove', { file, fileList })
}
let onSuccess = (response: any, file: File, fileList: FileList) => {
  // 上传图片成功 给表单上传项赋值
  let uploadItem = props.options.find((item) => item.type === 'upload')!
  model.value[uploadItem.prop!] = { response, file, fileList }
  emits('on-success', { response, file, fileList })
}
let onError = (err: any, file: File, fileList: FileList) => {
  emits('on-error', { err, file, fileList })
}
let onProgress = (event: any, file: File, fileList: FileList) => {
  emits('on-progress', { event, file, fileList })
}
let onChange = (file: File, fileList: FileList) => {
  emits('on-change', { file, fileList })
}
let beforeUpload = (file: File) => {
  emits('before-upload', file)
}
let beforeRemove = (file: File, fileList: FileList) => {
  emits('before-remove', { file, fileList })
}
let onExceed = (files: File, fileList: FileList) => {
  emits('on-exceed', { files, fileList })
}

// Editor实例
let editor: E
// 处理离开页面切换语言导致 dom 无法被获取
let el: DomElementSelector
onMounted(() => {
  el = document.querySelector('#editor-box')
  initEditor()
})
onBeforeUnmount(() => {
  editor && editor.destroy()
})

const initEditor = () => {
  editor = new E(el)
  editor.config.zIndex = 1
  // 菜单栏提示
  editor.config.showMenuTooltips = true
  editor.config.menuTooltipPosition = 'down'
  // 国际化相关处理
  editor.config.lang = store.getters.language === 'zhCn' ? 'zh-CN' : 'en'
  editor.i18next = i18next
  // 配置 onchange 回调函数
  editor.config.onchange = function (newHtml: any) {
    let editorItem = props.options.find((item) => item.type === 'editor')
    model.value[editorItem?.prop!] = newHtml
  }
  editor.create()
}
const resetFields = () => {
  form.value?.resetFields()
  if (props.options.find((item) => item.type === 'editor')) {
    editor.txt.clear()
  }
}
const validate = () => {
  return form.value?.validate
}
const getFormData = () => {
  return model.value
}
defineExpose({
  resetFields,
  validate,
  getFormData
})
</script>

<style scoped></style>
