<template>
  <div class="navbar">
    <hamburger class="hamburger-container" id="guide-hamburger" />
    <breadcrumb class="breadcrumb-container" id="guide-breadcrumb" />
    <div class="right-menu">
      <guide class="right-menu-item hover-effect" id="guide-start" />
      <header-search
        class="right-menu-item hover-effect"
        id="guide-search"
      ></header-search>
      <screenfull class="right-menu-item hover-effect" id="guide-full" />
      <theme-picker
        class="right-menu-item hover-effect"
        id="guide-theme"
      ></theme-picker>
      <lang-select class="right-menu-item hover-effect" id="guide-lang" />
      <!-- 头像 -->
      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <img
            :src="$store.getters.userInfo.avatar + '?imageView2/1/w/80/h/80'"
            class="user-avatar"
          />
          <el-icon class="el-icon-caret-bottom"><CaretBottom /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item> {{ $t('msg.navBar.home') }} </el-dropdown-item>
            </router-link>
            <a target="_blank" href="">
              <el-dropdown-item>{{ $t('msg.navBar.course') }}</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="logout">
              {{ $t('msg.navBar.logout') }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import svgicon from '@/components/SvgIcon/index.vue'
import Hamburger from '@/components/Hamburger'
import Breadcrumb from '@/components/Breadcrumb'
import LangSelect from '@/components/LangSelect'
import ThemePicker from '@/components/ThemeSelect/index.vue'
import HeaderSearch from '@/components/HeaderSearch'
import Screenfull from '@/components/Screenfull'
import Guide from '@/components/Guide'
import { useRouter } from 'vue-router'
const store = useStore()
const router = useRouter()
const logout = () => {
  store.dispatch('user/logout')
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.module.scss';
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .breadcrumb-container {
    float: left;
  }
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    // hover 动画
    transition: background 0.5s;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;
      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;
        &:hover {
          background: rgba(0, 0, 0, 0.115);
        }
      }
    }

    :deep(.avatar-container) {
      margin-right: 30px;
      cursor: pointer;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
