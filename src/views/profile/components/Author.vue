<template>
  <div class="author-container">
    <div class="header">
      <div class="header-img">
        <a href="https://github.com/4noth1ng">
          <img src="../../../icons/img/96067939.jpg" alt="Skytsunami" />
        </a>
      </div>
      <div class="header-desc">
        <h3>Cong</h3>
        <span>前端</span>
      </div>
    </div>
    <div class="info">
      <h3>{{ $t('msg.author.link') }}</h3>
      <div class="info-item">
        <el-link href="https://github.com/4noth1ng" :underline="false"
          >GitHub</el-link
        >
        <el-link
          :underline="false"
          type="primary"
          href="https://juejin.cn/user/3769538479144695"
          >掘金</el-link
        >

        <el-link
          type="warning"
          :underline="false"
          href="https://blog.csdn.net/qqqcp3?spm=1000.2115.3001.5343"
          >CSDN</el-link
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import PanThumb from '@/components/PanThumb/index.vue'
import {} from 'vue'
</script>

<style lang="scss" scoped>
@keyframes float {
  0% {
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
    transform: translatey(0px);
  }
  50% {
    box-shadow: 0 25px 15px 0px rgba(0, 0, 0, 0.2);
    transform: translatey(-20px);
  }
  100% {
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
    transform: translatey(0px);
  }
}
.author-container {
  .header {
    display: flex;
    &-img {
      margin-top: 20px;
      margin-left: 2px;
      width: 120px;
      height: 120px;
      box-sizing: border-box;
      border-radius: 50%;
      overflow: hidden;
      box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
      transform: translatey(0px);
      animation: float 6s ease-in-out infinite;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .header-desc {
      margin-left: 12px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      text-align: center;
      span {
        padding-right: 1px;
        font-size: 14px;
      }
    }
  }
  .info {
    width: 100%;
    margin-top: 16px;
    line-height: 22px;
    font-size: 14px;
    .info-item {
      margin-top: 10px;
      width: 100%;
      display: flex;
      justify-content: flex-start;
      .el-link {
        padding-right: 20px;
      }
    }
  }
}
</style>
