<script setup lang="ts">
import Sidebar from './components/SideBar.vue'
import TopBar from "./components/TopBar.vue";
</script>

<template>
  <div class="app-container">

    <TopBar />
    <!-- 左侧导航栏（悬浮层，不占用文档流） -->
    <Sidebar />

    <!-- 右侧内容区（全屏显示，左侧留出导航栏空间） -->
    <div class="content-container">
      <router-view />
    </div>
  </div>
</template>

<style>
/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; /* 苹果默认字体 */
}

/* 页面容器 */
.app-container {
  margin: 0;
  width: 100vw; /* 占据全部横向宽度 */
  height: 100vh;
  background: #f8f9fa;
  position: relative; /* 作为导航栏绝对定位的参考 */
  overflow: hidden; /* 防止内容溢出 */
}

/* 内容区样式：全屏显示，左侧留出导航栏宽度 */
.content-container {
  width: 100vw;
  height: 100vh;
  padding-top: 70px;   /* 关键：避开顶部状态栏（TopBar 高度） */
  background: #f8f9fa;
  padding-left: 15%; /* 留出导航栏15%的宽度，避免内容被遮挡 */
  overflow-y: auto; /* 内容超出时可滚动 */
  transition: padding-left 0.3s ease; /* 跟随导航栏模式切换动画 */
}
.sidebar-container {
  top: 70px
}
/* 导航栏仅图标模式时，内容区左侧padding适配 */
.sidebar-container.icon-only + .content-container {
  padding-left: 80px; /* 对应导航栏窄宽度 */
}
</style>