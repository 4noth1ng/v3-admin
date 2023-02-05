<template>
  <div>
    <el-button @click="showDialog">弹出框表单</el-button>
    <modal-form
      v-model:dialogVisible="dialogVisible"
      title="编辑区域"
      width="50%"
      :options="options"
      :onChange="handleChange"
    >
      <template #uploadArea>
        <el-button type="primary">Click to upload</el-button>
      </template>
      <template #uploadTip>
        <div class="el-upload__tip">
          jpg/png files with a size less than 500KB.
        </div>
      </template>
      <template #footer="{ form }">
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="confirm(form)"> Confirm </el-button>
        </span>
      </template>
    </modal-form>
  </div>
</template>

<script setup lang="ts">
import { ElMessage, FormInstance } from 'element-plus'
import { ref } from 'vue'
import { FormOptions } from '../../components/Form/src/types/types'

const dialogVisible = ref(false)
const title = ref('编辑区域')
const showDialog = () => {
  dialogVisible.value = true
}

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
      showPassword: true
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
      action: 'https://jsonplaceholder.typicode.com/posts/',
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
    placeholder: '请输入描述',
    rules: [
      {
        required: true,
        message: '描述不能为空',
        trigger: 'blur'
      }
    ]
  }
]
const confirm = (form: any) => {
  const validate = form.validate()

  validate((valid: any) => {
    console.log(form.getFormData())

    if (valid) {
      ElMessage.success('验证成功')
    } else {
      ElMessage.error('验证失败')
    }
  })
}

let handleSuccess = (val: any) => {
  console.log('success')
  console.log(val)
}
let handleChange = (val: any) => {
  console.log('change')
  console.log(val)
}
</script>

<style scoped lang="scss"></style>
