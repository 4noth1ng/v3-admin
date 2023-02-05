import { createRouter, createWebHashHistory, useRouter } from 'vue-router'
import layout from '@/layout'
import ArticleCreaterRouter from './modules/ArticleCreate'
import ArticleRouter from './modules/Article'
import PermissionListRouter from './modules/PermissionList'
import RoleListRouter from './modules/RoleList'
import UserManageRouter from './modules/UserManage'
import store from '@/store'
import { useStore } from 'vuex'
import { cloneDeep } from 'lodash'
export const asyncRoutes = [
  RoleListRouter,
  UserManageRouter,
  PermissionListRouter,
  ArticleCreaterRouter,
  ArticleRouter
]

/**
 * 私有路由表
 */
export const privateRoutes = [
  {
    path: '/user',
    component: layout,
    redirect: '/user/manage',
    meta: {
      title: 'user',
      icon: 'personnel'
    },
    children: [
      {
        path: '/user/manage',
        component: () => import('@/views/user-manage/index'),
        meta: {
          title: 'userManage',
          icon: 'personnel-manage'
        }
      },
      {
        path: '/user/role',
        component: () => import('@/views/role-list/index'),
        meta: {
          title: 'roleList',
          icon: 'role'
        }
      },
      {
        path: '/user/permission',
        component: () => import('@/views/permission-list/index'),
        meta: {
          title: 'permissionList',
          icon: 'permission'
        }
      },
      {
        path: '/user/info/:id',
        name: 'userInfo',
        component: () => import('@/views/user-info/index'),
        props: true,
        meta: {
          title: 'userInfo'
        }
      },
      {
        path: '/user/import',
        name: 'import',
        component: () => import('@/views/import/index'),
        meta: {
          title: 'excelImport'
        }
      }
    ]
  },
  {
    path: '/article',
    component: layout,
    redirect: '/article/ranking',
    meta: {
      title: 'article',
      icon: 'article'
    },
    children: [
      {
        path: '/article/ranking',
        component: () => import('@/views/article-ranking/index'),
        meta: {
          title: 'articleRanking',
          icon: 'article-ranking'
        }
      },
      {
        path: '/article/:id',
        component: () => import('@/views/article-detail/index'),
        meta: {
          title: 'articleDetail'
        }
      },
      {
        path: '/article/create',
        component: () => import('@/views/article-create/index'),
        meta: {
          title: 'articleCreate',
          icon: 'article-create'
        }
      },
      {
        path: '/article/editor/:id',
        component: () => import('@/views/article-create/index'),
        meta: {
          title: 'articleEditor'
        }
      }
    ]
  }
]

/**
 * 公开路由表
 */
export const publicRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/',
    // 注意：带有路径“/”的记录中的组件“默认”是一个不返回 Promise 的函数
    component: layout,
    redirect: '/profile',
    children: [
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index'),
        meta: {
          title: 'profile',
          icon: 'article-ranking'
        }
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/404')
      },
      {
        path: '/401',
        name: '401',
        component: () => import('@/views/error-page/401')
      }
    ]
  },
  {
    path: '/components',
    name: 'components',
    redirect: '/components/chooseIcon',
    component: layout,
    meta: {
      title: 'components',
      icon: 'article-ranking'
    },
    children: [
      {
        path: '/components/chooseicon',
        name: 'chooseicon',
        component: () => import('@/views/chooseIcon/index.vue'),
        meta: {
          title: 'chooseIcon',
          icon: 'article-ranking'
        }
      },
      {
        path: '/components/trend',
        name: 'trend',
        component: () => import('@/views/trend'),
        meta: {
          title: 'trend',
          icon: 'article-ranking'
        }
      },
      {
        path: '/components/menu',
        name: 'menu',
        component: () => import('@/views/menu'),
        meta: {
          title: 'menu',
          icon: 'article-ranking'
        }
      },
      {
        path: '/components/choosearea',
        name: 'choosearea',
        component: () => import('@/views/choose-area'),
        meta: {
          title: 'choosearea',
          icon: 'article-ranking'
        }
      },
      {
        path: '/components/choosecity',
        name: 'choosecity',
        component: () => import('@/views/choose-city'),
        meta: {
          title: 'choosecity',
          icon: 'article-ranking'
        }
      },
      {
        path: '/components/choosetime',
        name: 'choosetime',
        component: () => import('@/views/choose-time'),
        meta: {
          title: 'choosetime',
          icon: 'article-ranking'
        }
      },
      {
        path: '/components/progress',
        name: 'progress',
        component: () => import('@/views/progress'),
        meta: {
          title: 'progress',
          icon: 'article-ranking'
        }
      },
      {
        path: '/components/form',
        name: 'form',
        component: () => import('@/views/form'),
        meta: {
          title: 'form',
          icon: 'article-ranking'
        }
      },
      {
        path: '/components/modalform',
        name: 'modalform',
        component: () => import('@/views/modal-form'),
        meta: {
          title: 'modalform',
          icon: 'article-ranking'
        }
      },
      {
        path: '/components/dragabletable',
        name: 'dragabletable',
        component: () => import('@/views/dragable-table'),
        meta: {
          title: 'dragabletable',
          icon: 'article-ranking'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...publicRoutes]
})
/**
 * 初始化路由表
 */
export const resetRouter = () => {
  if (
    store.getters.userInfo &&
    store.getters.userInfo.permission &&
    store.getters.userInfo.permission.menus
  ) {
    router.removeRoute('article')
    router.removeRoute('user')
    router.removeRoute('404')
  }
}
export default router
