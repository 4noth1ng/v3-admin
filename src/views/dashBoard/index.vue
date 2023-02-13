<template>
  <div>
    <el-row :gutter="50">
      <el-col :xs="24" :sm="20" :lg="18">
        <div class="welcome-container">
          <img src="../../assets/welcome.png" alt="" class="welcome-image" />
          <div class="welcome-text">
            <div class="welcome-title">
              {{ username }}，{{ $t('msg.welcome.back') }}
            </div>
            <div class="welcome-note">
              {{ $t('msg.welcome.title') }}
            </div>
          </div>
        </div>
      </el-col>
      <el-col
        :xs="0"
        :sm="4"
        :lg="6"
        style="display: flex; justify-content: center"
      >
        <div class="working-container">
          <img
            src="../../assets/微信截图_20230209154451.png"
            alt=""
            class="working-image"
          />
          <div class="working-text">
            <span class="text">{{ $t('msg.welcome.text') }}</span>
            <span class="time">{{
              $filters.dateFilter(timeDiff, $t('msg.welcome.timeValidate'))
            }}</span>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="50" style="margin-top: 20px">
      <template v-for="(item, index) in dashboardData" :key="index">
        <el-col :xs="24" :sm="12" :lg="6">
          <div class="data-small-pane">
            <p class="pane-title">{{ $t(`msg.dashboard.${item.title}`) }}</p>
            <div class="pane-data">
              <el-icon><component :is="item.icon"></component></el-icon>
              <div class="numberscroll">
                <number-scroll
                  :target="item.number"
                  :duration="1.2"
                ></number-scroll>
              </div>
              <span class="pane-per">
                {{ item.percent }}
              </span>
            </div>
          </div>
        </el-col>
      </template>
    </el-row>
    <!-- <el-row> -->
    <echartsData></echartsData>
    <userData></userData>
    <!-- </el-row> -->
  </div>
</template>

<script setup>
import { getUserInfo } from '@/api/sys.js'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { getItem } from '@/utils/storage'
import echartsData from './echartsData.vue'
import userData from './userData.vue'
const store = useStore()
const username = computed(() => store.getters.userInfo.username)
const timeDiff = ref()
const nowTime = Date.now()
const startTime = getItem('timeStamp')
timeDiff.value = nowTime - startTime
setInterval(() => {
  timeDiff.value += 1000
}, 1000)
const dashboardData = [
  {
    title: 'one',
    icon: 'DataAnalysis',
    number: '5456',
    percent: '+14%'
  },
  {
    title: 'two',
    icon: 'Document',
    number: '1234',
    percent: '+16%'
  },
  {
    title: 'three',
    icon: 'Avatar',
    number: '8888',
    percent: '+88%'
  },
  {
    title: 'four',
    icon: 'Link',
    number: '9999',
    percent: '+11%'
  }
]
</script>

<style scoped lang="scss">
.welcome-container {
  background: #e1eaf9;
  border-radius: 6px;
  display: flex;
  align-items: center;
  padding: 15px 20px !important;
  box-shadow: 0 0 30px #523f690d;
  transition: all linear 0.2s;
  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 14px 24px #0003;
    z-index: 999;
    border-radius: 6px;
  }

  .welcome-image {
    width: 150px;
    height: 100px;
    padding-right: 15px;
  }
  .welcome-text {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    .welcome-title {
      font-size: 24px;
      color: #3f6ad8;
      margin-bottom: 10px;
    }
  }
}
.working-container {
  width: 240px;
  height: 130px;
  .working-image {
    width: 100%;
    height: 80px;
  }
  .working-text {
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
  }
}
.data-small-pane {
  background-color: #e9edf2;
  padding: 20px;
  height: 100px;
  margin-bottom: 20px;
  transition: all linear 0.2s;

  &:hover {
    transform: translateY(-2px) scale(1.03);
    box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, 0.04),
      0px 8px 20px rgba(0, 0, 0, 0.08);
  }
  .pane-title {
    width: 100%;
    color: #92969a;
    font-size: 15px;
  }
  .pane-data {
    width: 100%;
    margin-top: 13px;
    display: flex;
    align-items: center;

    .numberscroll {
      display: inline-block;
      margin-left: 5px;
    }
    .pane-per {
      float: right;
    }
  }
}
</style>
