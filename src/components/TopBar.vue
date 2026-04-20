<template>
  <!-- 全局顶部状态栏 -->
  <div class="topbar-container">
    <!-- 左侧占位（可加logo/标题） -->
    <div class="topbar-left">
      <span class="app-title">前端模板系统</span>
    </div>

    <!-- 右侧信息区：时间/日期 + 头像 -->
    <div class="topbar-right">
      <!-- 时间日期显示 -->
      <div class="datetime-wrapper">
        <span class="time">{{ currentTime }}</span>
        <span class="date">{{ currentDate }}</span>
      </div>

      <!-- 用户头像 -->
      <div class="avatar-wrapper" @click="toggleAvatarMenu">
        <img
            :src="avatarUrl"
            alt="用户头像"
            class="user-avatar"
        />
        <!-- 头像下拉菜单（点击显示/隐藏） -->
        <div class="avatar-menu" v-show="showAvatarMenu">
          <ul>
            <li class="menu-item">
              <avatar theme="outline" size="24" fill="#333" :strokeWidth="2" class="menu-icon"/>
              <span>个人中心</span>
            </li>
            <li class="menu-item">
              <setting theme="outline" size="24" fill="#333" :strokeWidth="2" class="menu-icon"/>
              <span>设置</span>
            </li>
            <li class="menu-item divider"></li>
            <li class="menu-item logout">
              <logout theme="outline" size="24" fill="#ff3b30" :strokeWidth="2" class="menu-icon" />
              <span @click="handleLogout">退出登录</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

// 路由实例
const router = useRouter()

// 响应式数据
// 头像菜单显示状态
const showAvatarMenu = ref<boolean>(false)
// 头像地址（可替换为真实接口地址）
const avatarUrl = ref<string>('https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png')
// 定时器标识
let timer: NodeJS.Timeout | null = null
// 响应式时间戳（核心：驱动computed更新）
const nowTimestamp = ref<number>(Date.now())

// 格式化时间：HH:MM:SS（依赖nowTimestamp，每秒更新）
const currentTime = computed(() => {
  const now = new Date(nowTimestamp.value)
  return now.toTimeString().split(' ')[0].slice(0, 8)
})

// 格式化日期：YYYY-MM-DD 星期X（依赖nowTimestamp）
const currentDate = computed(() => {
  const now = new Date(nowTimestamp.value)
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  const week = weekDays[now.getDay()]
  return `${year}-${month}-${day} ${week}`
})

// 切换头像菜单显示/隐藏
const toggleAvatarMenu = () => {
  showAvatarMenu.value = !showAvatarMenu.value
}

// 点击页面其他区域关闭菜单
const closeAvatarMenu = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (!target.closest('.avatar-wrapper')) {
    showAvatarMenu.value = false
  }
}

// 退出登录处理
const handleLogout = () => {
  // 清除用户信息
  localStorage.removeItem('userInfo')
  sessionStorage.removeItem('userInfo')
  // 关闭菜单
  showAvatarMenu.value = false
  // 跳转到登录页
  router.push('/login')
  alert('已退出登录')
}

// 生命周期：挂载时启动定时器 + 监听点击事件
onMounted(() => {
  // 修复：每秒更新时间戳，驱动computed重新计算
  timer = setInterval(() => {
    nowTimestamp.value = Date.now()
  }, 1000)
  // 监听全局点击事件，关闭菜单
  document.addEventListener('click', closeAvatarMenu)
})

// 生命周期：卸载时清除定时器 + 移除监听
onUnmounted(() => {
  if (timer) clearInterval(timer)
  document.removeEventListener('click', closeAvatarMenu)
})
</script>

<style scoped>
/* 顶部状态栏容器（全局置顶） */
.topbar-container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 101; /* 高于侧边栏z-index:100 */
  width: 100vw;
  height: 70px; /* 加高一点，更宽松 */
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(200, 200, 200, 0.2);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px; /* 增加左右内边距 */
  box-sizing: border-box;
}

/* 左侧标题 */
.topbar-left {
  display: flex;
  align-items: center;
}

.app-title {
  font-size: 20px; /* 加大字体 */
  font-weight: 600;
  color: #1d1d1f;
  letter-spacing: 0.5px; /* 增加字间距 */
}

/* 右侧信息区 */
.topbar-right {
  display: flex;
  align-items: center;
  gap: 40px; /* 大幅增加时间和头像的间距 */
}

/* 时间日期样式 */
.datetime-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  color: #1d1d1f;
  gap: 4px; /* 时间和日期之间增加间距 */
  min-width: 120px; /* 固定宽度，防止抖动 */
}

.time {
  font-size: 18px; /* 加大时间字体 */
  font-weight: 500;
}

.date {
  font-size: 14px; /* 加大日期字体 */
  color: #86868b;
}

/* 头像容器（相对定位，用于下拉菜单） */
.avatar-wrapper {
  position: relative;
  cursor: pointer;
}

/* 用户头像（苹果风格圆形） */
.user-avatar {
  width: 48px; /* 加大头像 */
  height: 48px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.avatar-wrapper:hover .user-avatar {
  transform: scale(1.05);
}

/* 头像下拉菜单（毛玻璃+圆角） */
.avatar-menu {
  position: absolute;
  top: calc(100% + 12px); /* 增加菜单与头像的间距 */
  right: 0;
  width: 220px; /* 加宽菜单 */
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 16px; /* 加大圆角 */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(200, 200, 200, 0.2);
  padding: 12px 0; /* 增加上下内边距 */
  z-index: 102;
  /* 菜单展开动画 */
  animation: fadeIn 0.2s ease;
}

/* 菜单动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 菜单项 */
.menu-item {
  display: flex;
  align-items: center;
  padding: 12px 24px; /* 大幅增加内边距 */
  color: #1d1d1f;
  font-size: 16px; /* 加大菜单字体 */
  cursor: pointer;
  transition: background 0.2s ease;
  gap: 16px; /* 图标和文字之间的间距（核心优化） */
}

.menu-item:hover {
  background: rgba(245, 245, 247, 0.8);
}

/* 菜单图标 */
.menu-icon {
  flex-shrink: 0; /* 防止图标压缩 */
  color: #86868b;
}

/* 分割线 */
.divider {
  height: 1px;
  background: rgba(200, 200, 200, 0.2);
  margin: 8px 0; /* 增加分割线上下间距 */
  padding: 0 24px; /* 让分割线不贴边 */
  cursor: default;
}

.divider:hover {
  background: rgba(200, 200, 200, 0.2);
}

/* 退出登录项 */
.logout {
  color: #ff3b30;
}

.logout .menu-icon {
  color: #ff3b30;
}

.logout:hover {
  background: rgba(255, 59, 48, 0.1);
}

/* 适配小屏幕 */
@media (max-width: 768px) {
  .datetime-wrapper {
    display: none;
  }

  .app-title {
    font-size: 18px;
  }

  .topbar-container {
    padding: 0 20px;
    height: 60px;
  }

  .user-avatar {
    width: 40px;
    height: 40px;
  }
}
</style>