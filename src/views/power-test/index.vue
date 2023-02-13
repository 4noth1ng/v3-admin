<template>
  <div>
    <h3>控制用户和文章两个路由的权限</h3>
    <el-switch
      v-model="value"
      size="large"
      active-text="Super-admin"
      inactive-text="Tourist"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { getItem } from '@/utils/storage'
const value = ref(true)
const store = useStore()
const router = useRouter()
if (getItem('token') === 'a') value.value = true
else value.value = false
watch(value, async (val) => {
  if (val) {
    // super-admin
    await store.dispatch('user/logout')
    await store.dispatch('user/login', {
      username: 'super-admin',
      password: '123456'
    })
  } else {
    await store.dispatch('user/logout')
    await store.dispatch('user/login', {
      username: 'test',
      password: '123456'
    })
  }
  console.log(router.getRoutes())
  router.push('/powertest')
})
</script>

<style lang="scss" scoped></style>
