<template>
  <div class="login-container">
    <el-form
      class="login-form"
      ref="loginFromRef"
      :model="loginForm"
      :rules="loginRules"
    >
      <div class="title-container">
        <h3 class="title">
          {{ $t('msg.login.title') }}
        </h3>
        <lang-select class="lang-select" effect="light"></lang-select>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon="user"></svg-icon>
        </span>
        <el-input
          placeholder="username"
          name="username"
          type="text"
          v-model="loginForm.username"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon="password"></svg-icon>
        </span>
        <el-input
          placeholder="password"
          name="password"
          v-model="loginForm.password"
          :type="passwordType"
        />
        <span class="show-pwd">
          <span class="svg-container" @click="onChangePwdType">
            <svg-icon
              :icon="passwordType === 'password' ? 'eye' : 'eye-open'"
            ></svg-icon>
          </span>
        </span>
      </el-form-item>

      <el-button
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click="handleLogin"
        :loading="loading"
        >{{ $t('msg.login.loginBtn') }}</el-button
      >
      <div class="tips" v-html="$t('msg.login.desc')"></div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
// 导入组件之后无需注册可直接使用
import { ref, reactive, computed } from 'vue'
import svgicon from '@/components/SvgIcon/index.vue'
import { useI18n } from 'vue-i18n'
import { validatePassword } from '@/views/login/rule'
import { useStore } from 'vuex'
import router from '@/router'
import langselect from '@/components/LangSelect/index.vue'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
const i18n = useI18n()
const store = useStore()
const loginForm = ref({
  username: 'super-admin',
  password: '123456'
})
const loginRules = reactive({
  username: {
    required: true,
    message: computed(() => i18n.t('msg.login.usernameRule')),
    trigger: 'blur'
  },
  password: [
    {
      required: true,
      validator: validatePassword(),
      trigger: 'blur'
    }
  ]
})
// password | text
const passwordType = ref('password')
const onChangePwdType = () => {
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
}
const loading = ref(false)
const handleLogin = () => {
  loading.value = true
  store
    .dispatch('user/login', loginForm.value)
    .then((res) => {
      loading.value = false
      if (res) {
        router.push('/')
      } else {
        ElMessage.error('asd')
      }
    })
    .catch((err) => {
      console.log(err)
      loading.value = false
      ElMessage.error('登录失败，请检查用户名和密码后重试')
    })
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    :deep(.el-form-item) {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    :deep(.el-input) {
      display: inline-block;
      height: 47px;
      width: 85%;
      .el-input__wrapper {
        width: 100%;
        height: 100%;
        background-color: transparent;
        box-shadow: 0 0 0 0px
          var(--el-input-border-color, var(--el-border-color)) inset;
        cursor: default;
      }
      .el-input__inner {
        cursor: pointer !important;
      }

      input {
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
      }
    }
    :deep(.el-form-item__error) {
      padding-left: 60px;
      margin-top: 3px;
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
