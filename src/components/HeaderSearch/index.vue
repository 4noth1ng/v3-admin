<template>
    <div class="header-search">
        <i @click="onShowClick"><svg-icon class-name="search-icon" icon="search" /></i>
        <transition name="fade">
            <el-select ref="headerSearchSelectRef" class="header-search-select" v-model="search" filterable
                default-first-option remote placeholder="Search" :remote-method="querySearch" @change="onSelectChange"
                v-show="isShow">
                <el-option v-for="option in searchOptions" :key="option.item.path"
                    :label="option.item.title.join(' > ')" :value="option.item.path"></el-option>
            </el-select>
        </transition>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { filterRouters } from '@/utils/route'
import { useRouter } from 'vue-router'
import Fuse from 'fuse.js'
import svgicon from '@/components/SvgIcon/index.vue'
import { generateRoutes } from './FuseData'
import { watchSwitchLang } from '@/utils/i18n'

const router = useRouter()
/**
 * 根据https://fusejs.io/demo.html 格式进行路由信息格式化
 */
let searchPool = computed(() => {
    const filterRoutes = filterRouters(router.getRoutes())
    return generateRoutes(filterRoutes)
})
/**
 * 搜索库相关
 */
let fuse
const initFuse = searchPool => {
    fuse = new Fuse(searchPool, {
        // 是否按优先级进行排序
        shouldSort: true,
        // 匹配长度超过这个值的才会被认为是匹配的
        minMatchCharLength: 1,
        // 将被搜索的键列表。 这支持嵌套路径、加权搜索、在字符串和对象数组中搜索。
        // name：搜索的键
        // weight：对应的权重
        keys: [
            {
                name: 'title',
                weight: 0.7
            },
            {
                name: 'path',
                weight: 0.3
            }
        ]
    })
}
initFuse(searchPool.value)

// 控制 search 显示
const isShow = ref(false)
// el-select 实例
const headerSearchSelectRef = ref(null)
const onShowClick = () => {
    console.log(isShow.value);
    isShow.value = !isShow.value
    console.log(isShow.value);
    headerSearchSelectRef.value.focus()
}


// search 相关
const search = ref('')
// 搜索方法

// 选中回调
const onSelectChange = (val) => {
    router.push(val)
}
const searchOptions = ref([])
// 搜索方法
const querySearch = query => {
    if (query !== '') {
        searchOptions.value = fuse.search(query)
    } else {
        searchOptions.value = []
    }
    console.log(searchOptions.value);
}

/**
 * 关闭 search 的处理事件
 */
const onClose = () => {
    headerSearchSelectRef.value.blur()
    isShow.value = false
    searchOptions.value = []
}
// /**
//  * 监听 search 打开，处理 close 事件
//  */
// watch(isShow, val => {
//     if (val) {
//         document.body.addEventListener('click', onClose)
//     } else {
//         document.body.removeEventListener('click', onClose)
//     }
// })

// 处理国际化
watchSwitchLang(() => {
    searchPool = computed(() => {
        const filterRoutes = filterRouters(router.getRoutes())
        return generateRoutes(filterRoutes)
    })
    initFuse(searchPool.value)
})
</script>

<style lang="scss" scoped>
.header-search {

    .search-icon {
        cursor: pointer;
        font-size: 18px;
        vertical-align: middle;
    }

    .header-search-select {
        font-size: 18px;
        transition: width 0.2s;
        width: 0;
        overflow: hidden;
        background: transparent;
        border-radius: 0;
        display: inline-block;
        vertical-align: middle;
        width: 210px;
        margin-left: 10px;

        :deep(.el-input__inner) {
            border-radius: 0;
            border: 0;
            padding-left: 0;
            padding-right: 0;
            box-shadow: none !important;
            border-bottom: 1px solid #d9d9d9;
            vertical-align: middle;
        }
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: all 0.5s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        width: 0;
    }
}
</style>
