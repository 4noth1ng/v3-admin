<template>
  <div style="width: 600px">
    <h1>深度小于等于2的菜单</h1>
    <normal-menu :data="data1"></normal-menu>
    <h1>无限层级菜单</h1>
    <infinity-menu :data="data2"></infinity-menu>
  </div>
</template>

<script setup lang="ts">
import Cmenu from '@/components/Menu/index.vue'
let data1 = [
  {
    name: '导航1',
    index: '1',
    icon: 'Document'
  },
  {
    name: '导航2',
    index: '2',
    icon: 'Document'
  },
  {
    name: '导航3',
    index: '3',
    icon: 'Document',
    children: [
      {
        name: '导航3-1',
        index: '3-1',
        icon: 'Document'
      }
    ]
  }
]
let data2 = [
  {
    name: '导航1',
    index: '1',
    icon: 'Document'
  },
  {
    name: '导航2',
    index: '2',
    icon: 'Document'
  },
  {
    name: '导航3',
    index: '3',
    icon: 'Document',
    children: [
      {
        name: '导航3-1',
        index: '3-1',
        icon: 'Document',
        children: [
          {
            name: '导航3-1-1',
            index: '3-1-1',
            icon: 'Document',
            children: [
              {
                name: '导航3-1-1-1',
                index: '3-1-1-1',
                icon: 'Document'
              }
            ]
          }
        ]
      }
    ]
  }
]
</script>

<style scoped></style>
