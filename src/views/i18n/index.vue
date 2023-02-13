<template>
  <div>
    <h3 style="margin-bottom: 20px">{{ $t('msg.tip.i18n') }}</h3>
    <el-dropdown
      trigger="click"
      class="international"
      @command="handleSetLanguage"
    >
      <div>
        <el-button type="primary">{{ $t('msg.route.i18n') }}</el-button>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :disabled="language == 'zhCn'" command="zhCn">
            中文
          </el-dropdown-item>
          <el-dropdown-item :disabled="language == 'en'" command="en">
            English
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { defineProps, computed } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'

defineProps({
  effect: {
    type: String,
    default: 'dark',
    validator: function (value) {
      // 这个值必须匹配下列字符串中的一个
      return ['dark', 'light'].indexOf(value) !== -1
    }
  }
})

const store = useStore()
const language = computed(() => store.getters.language)

// 切换语言的方法
const i18n = useI18n()
const handleSetLanguage = (lang) => {
  i18n.locale.value = lang
  store.commit('app/setLanguage', lang)
  // ElMessage.success('更新成功')
  console.log(language)
}
</script>
