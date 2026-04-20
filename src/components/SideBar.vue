<template>
  <div class="sidebar-container" :class="{ 'icon-only': isIconOnly }">
    <!-- 模式切换按钮 -->
    <div class="toggle-btn" @click="toggleMode">
      {{ isIconOnly ? '☰' : '⊡' }}
    </div>

    <!-- 导航菜单列表 -->
    <ul class="nav-list">
      <li v-for="item in navList" :key="item.path" class="nav-item">
        <router-link
            :to="item.path"
            class="nav-link"
            active-class="active"
        >
          <!-- 动态渲染 IconPark 图标组件 -->
          <component
              :is="item.icon"
              theme="outline"
              size="24"
              fill="#333"
              :strokeWidth="2"
              strokeLinejoin="bevel"
          />
          <!-- 文字（仅非图标模式显示） -->
          <span class="nav-text" v-show="!isIconOnly">{{ item.name }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, defineComponent, type DefineComponent } from 'vue'

// 2. 定义导航项类型（适配 IconPark 图标）
interface NavItem {
  path: string
  name: string
  icon: string
}

// 3. 响应式：控制显示模式（图标仅/图标+文字）
const isIconOnly = ref<boolean>(true)

// 4. 切换显示模式
const toggleMode = () => {
  isIconOnly.value = !isIconOnly.value
}


const navList: NavItem[] = [
  { path: '/', name: '首页', icon: 'home' },


  // 新增页面示例：
  // { path: '/setting', name: '设置', icon: setting },
]
</script>

<!-- 原有样式保持不变 -->
<style scoped>
/* 你的导航栏样式... */
.sidebar-container {
  width: 15%;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-right: 1px solid rgba(200, 200, 200, 0.2);
  border-radius: 0 20px 20px 0;
  box-shadow: 2px 0 15px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100;
  transition: width 0.3s ease;
  position: fixed;    /* 核心：固定定位，脱离文档流 */
  top: 70px;          /* 对应顶部状态栏高度，避免重叠 */
  left: 0;            /* 固定在左侧 */
  height: calc(100vh - 70px); /* 高度 = 视口高度 - 顶部状态栏高度 */
  overflow-y: auto;   /* 侧边栏内容超出时内部滚动，而非整体移动 */
  overflow-x: hidden; /* 隐藏横向滚动 */
}

.icon-only {
  width: 80px;
}

.toggle-btn {
  position: absolute;
  top: 10px;
  right: 25px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(240, 240, 240, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  color: #666;
  transition: background 0.2s;
}

.toggle-btn:hover {
  background: rgba(230, 230, 230, 0.9);
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 80%;
}

.nav-item {
  margin: 20px 0;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px 15px;
  border-radius: 12px;
  text-decoration: none;
  color: #333;
  font-size: 16px;
  transition: all 0.2s ease;
}

.nav-link.active {
  background: rgba(0, 122, 255, 0.1);
  color: #007aff;
}

.nav-link:hover:not(.active) {
  background: rgba(240, 240, 240, 0.8);
}

.nav-text {
  transition: opacity 0.2s ease;
}
</style>