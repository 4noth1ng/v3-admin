<template>
  <div class="wrapper">
    <div class="form-container">
      <c-form
        ref="form"
        :options="options"
        label-width="100px"
        :validate-on-rule-change="false"
        @on-change="handleChange"
        @before-upload="handleBeforeUpload"
        @on-preview="handlePreview"
        @on-remove="handleRemove"
        @before-remove="beforeRemove"
        @on-success="handleSuccess"
        @on-exceed="handleExceed"
      >
        <template #trigger>
          <el-button type="primary">Click to upload</el-button>
        </template>
        <template #tip>
          <div class="el-upload__tip">
            jpg/png files with a size less than 500KB.
          </div>
        </template>
        <template #action="scope">
          <el-button type="primary" @click="submitForm(scope)">
            Create
          </el-button>
          <el-button @click="resetForm(scope)">Reset</el-button>
        </template>
      </c-form>
    </div>
    <div class="desc-container">
      <div id="viewer"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FormOptions } from '@/components/Form/src/types/types'
import MkEditor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/i18n/zh-cn'
import { ElMessage, ElMessageBox, FormInstance } from 'element-plus'
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'

let mkEditor: any
// 处理离开页面切换语言导致 dom 无法被获取
let el: any

onMounted(() => {
  el = document.querySelector('#viewer')
  initEditor()
  mkEditor.setMarkdown(`
# 一个可配置的表单
### 该表单提供了submit回调以获取提交的表单信息，reset回调清空表单内容，以及el-upload提供的回调
### 表单的每项配置项interface
\`\`\`js
// 表单每一项的配置选项
export interface FormOptions {
  // 表单项显示的元素
  type: 'cascader' | 'checkbox' | 'checkbox-group' | 'checkbox-button' | 'color-picker' |
  'date-picker' | 'input' | 'input-number' | 'radio' | 'radio-group' | 'radio-button' | 'rate' |
  'select' | 'option' | 'slider' | 'switch' | 'time-picker' | 'time-select' |
  'transfer' | 'upload' | 'editor',
  // 表单项的值
  value?: any,
  // 表单项label
  label?: string,
  // 表单项的标识
  prop?: string,
  // 表单项的验证规则
  rules?: RuleItem[],
  // 表单项的占位符
  placeholder?: string,
  // 表单元素特有的属性
  attrs?: {
    // css样式
    style?: CSSProperties,
    clearable?: boolean,
    showPassword?: boolean,
    disabled?: boolean,
  },
  // 表单项的子元素
  children?: FormOptions[],
  // 处理上传组件的属性和方法
  uploadAttrs?: {
    action: string,
    headers?: object,
    method?: 'post' | 'put' | 'patch',
    multiple?: boolean,
    data?: any,
    name?: string,
    withCredentials?: boolean,
    showFileList?: boolean,
    drag?: boolean,
    accept?: string,
    thumbnailMode?: boolean,
    fileList?: any[],
    listType?: 'text' | 'picture' | 'picture-card',
    autoUpload?: boolean,
    disabled?: boolean,
    limit?: number,
  }
}
\`\`\`
### 配置对象如下
\`\`\`js
let options: FormOptions[] = [
  {
    type: 'input',
    value: '',
    prop: 'username',
    label: '用户名',
    rules: [
      {
        required: true,
        message: '请输入用户名',
        trigger: 'blur'
      },
      {
        min: 2,
        max: 6,
        message: '用户名在2到6位',
        trigger: 'blur'
      }
    ],
    attrs: {
      clearable: true
    }
  },
  {
    type: 'input',
    value: '',
    prop: 'password',
    label: '密码',
    rules: [
      {
        required: true,
        message: '请输入密码',
        trigger: 'blur'
      },
      {
        min: 6,
        max: 15,
        message: '密码在6到15位',
        trigger: 'blur'
      }
    ],
    attrs: {
      clearable: true,
      showPassword: true,
      style: {
        width: '100%',
        height: '100%'
      }
    }
  },
  {
    type: 'select',
    value: '',
    placeholder: '请选择职位',
    prop: 'role',
    label: '职位',
    attrs: {
      style: {
        width: '100%'
      }
    },
    rules: [
      {
        required: true,
        message: '职位不能为空',
        trigger: 'change'
      }
    ],
    children: [
      {
        type: 'option',
        label: '经理',
        value: '1'
      },
      {
        type: 'option',
        label: '主管',
        value: '2'
      },
      {
        type: 'option',
        label: '员工',
        value: '3'
      }
    ]
  },
  {
    type: 'checkbox-group',
    value: [],
    prop: 'like',
    label: '爱好',
    rules: [
      {
        required: true,
        message: '爱好不能为空',
        trigger: 'change'
      }
    ],
    children: [
      {
        type: 'checkbox',
        label: '足球',
        value: '1'
      },
      {
        type: 'checkbox',
        label: '篮球',
        value: '2'
      },
      {
        type: 'checkbox',
        label: '排球',
        value: '3'
      }
    ]
  },
  {
    type: 'radio-group',
    value: '',
    prop: 'gender',
    label: '性别',
    rules: [
      {
        required: true,
        message: '性别不能为空',
        trigger: 'change'
      }
    ],
    children: [
      {
        type: 'radio',
        label: '男',
        value: 'male'
      },
      {
        type: 'radio',
        label: '女',
        value: 'female'
      },
      {
        type: 'radio',
        label: '保密',
        value: 'not'
      }
    ]
  },
  {
    type: 'upload',
    label: '上传',
    prop: 'pic',
    uploadAttrs: {
      action: 'https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15',
      multiple: true,
      limit: 3
    },
    rules: [
      {
        required: true,
        message: '图片不能为空',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'editor',
    value: '123',
    prop: 'desc',
    label: '描述',
    placeholder: '请输入请输入请输入请输入请输入请输入请输入请输入',
  }
]
\`\`\`
  `)
})

const store = useStore()
const initEditor = () => {
  mkEditor = new MkEditor({
    el,
    height: '100vh',
    language: store.getters.language === 'zhCn' ? 'zh-CN' : 'en'
  })
}

interface Scope {
  form: FormInstance
  model: any
}
const form = ref<FormInstance>()

let options: FormOptions[] = [
  {
    type: 'input',
    value: '',
    prop: 'username',
    label: '用户名',
    rules: [
      {
        required: true,
        message: '请输入用户名',
        trigger: 'blur'
      },
      {
        min: 2,
        max: 6,
        message: '用户名在2到6位',
        trigger: 'blur'
      }
    ],
    attrs: {
      clearable: true
    }
  },
  {
    type: 'input',
    value: '',
    prop: 'password',
    label: '密码',
    rules: [
      {
        required: true,
        message: '请输入密码',
        trigger: 'blur'
      },
      {
        min: 6,
        max: 15,
        message: '密码在6到15位',
        trigger: 'blur'
      }
    ],
    attrs: {
      clearable: true,
      showPassword: true,
      style: {
        width: '100%',
        height: '100%'
      }
    }
  },
  {
    type: 'select',
    value: '',
    placeholder: '请选择职位',
    prop: 'role',
    label: '职位',
    attrs: {
      style: {
        width: '100%'
      }
    },
    rules: [
      {
        required: true,
        message: '职位不能为空',
        trigger: 'change'
      }
    ],
    children: [
      {
        type: 'option',
        label: '经理',
        value: '1'
      },
      {
        type: 'option',
        label: '主管',
        value: '2'
      },
      {
        type: 'option',
        label: '员工',
        value: '3'
      }
    ]
  },
  {
    type: 'checkbox-group',
    value: [],
    prop: 'like',
    label: '爱好',
    rules: [
      {
        required: true,
        message: '爱好不能为空',
        trigger: 'change'
      }
    ],
    children: [
      {
        type: 'checkbox',
        label: '足球',
        value: '1'
      },
      {
        type: 'checkbox',
        label: '篮球',
        value: '2'
      },
      {
        type: 'checkbox',
        label: '排球',
        value: '3'
      }
    ]
  },
  {
    type: 'radio-group',
    value: '',
    prop: 'gender',
    label: '性别',
    rules: [
      {
        required: true,
        message: '性别不能为空',
        trigger: 'change'
      }
    ],
    children: [
      {
        type: 'radio',
        label: '男',
        value: 'male'
      },
      {
        type: 'radio',
        label: '女',
        value: 'female'
      },
      {
        type: 'radio',
        label: '保密',
        value: 'not'
      }
    ]
  },
  {
    type: 'upload',
    label: '上传',
    prop: 'pic',
    uploadAttrs: {
      action: 'https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15',
      multiple: true,
      limit: 3
    },
    rules: [
      {
        required: true,
        message: '图片不能为空',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'editor',
    value: '123',
    prop: 'desc',
    label: '描述',
    placeholder: '请输入请输入请输入请输入请输入请输入请输入请输入',
    rules: [
      {
        required: true,
        message: '描述不能为空',
        trigger: 'blur'
      }
    ]
  }
]
let handleRemove = (file: any, fileList: any) => {
  console.log('handleRemove')
  console.log(file, fileList)
}
let handlePreview = (file: any) => {
  console.log('handlePreview')
  console.log(file)
}
let beforeRemove = (val: any) => {
  console.log('beforeRemove')
  return ElMessageBox.confirm(`Cancel the transfert of ${val.file.name} ?`)
}
let handleExceed = (val: any) => {
  console.log('handleExceed', val)
  ElMessage.warning(
    `The limit is 3, you selected ${
      val.files.length
    } files this time, add up to ${
      val.files.length + val.fileList.length
    } totally`
  )
}
let handleSuccess = (val: any) => {
  console.log('success')
  console.log(val)
}
let handleChange = (val: any) => {
  console.log('change')
  console.log(val)
}
let handleBeforeUpload = (val: any) => {
  console.log('handleBeforeUpload')
  console.log(val)
}
let submitForm = (Scope: Scope) => {
  if (!Scope.form) return
  Scope.form.validate((valid, fields) => {
    console.log(Scope.model)

    if (valid) {
      ElMessage.success('提交成功!')
    } else {
      ElMessage.error('提交失败!')
    }
  })
}
let resetForm = (Scope: Scope) => {
  form.value!.resetFields()
}
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  justify-content: space-between;
  .form-container {
    width: 45%;
  }
  .desc-container {
    width: 45%;
  }
}
</style>
