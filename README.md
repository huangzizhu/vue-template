# Vue3 + Vite + TypeScript 前端项目模板
一个开箱即用的 Vue3 前端基础模板，集成 Vite、TypeScript、Vue Router、Axios 封装，内置标准布局组件，支持快速开发页面。

## ✨ 特性
- **极速开发**：基于 Vite 构建，热更新速度快
- **类型安全**：完整支持 TypeScript
- **路由集成**：已配置 Vue Router，直接使用
- **请求封装**：Axios 统一封装，支持接口代理
- **标准布局**：内置 Topbar + Sidebar 固定布局，路由自动跳转
- **开箱即用**：无需额外配置，克隆后直接开发

## 📦 技术栈
- **框架**：Vue 3 + Composition API
- **构建工具**：Vite
- **语言**：TypeScript
- **路由**：Vue Router
- **请求库**：Axios（已封装）

## 📁 项目结构
```
src/
├── router/
│   └── index.ts       # 路由配置（已完成）
├── utils/
│   └── request.ts     # Axios 请求封装（已完成）
├── App.vue            # 标准布局：Topbar + Sidebar（已完成）
└── main.ts            # 项目入口
```

## 🚀 快速开始
### 1. 克隆项目
```bash
git clone <仓库地址>
cd <项目名称>
```

### 2. 安装依赖
```bash
npm install
# 或 yarn install / pnpm install
```

### 3. 启动开发服务
```bash
npm run dev
```
- 开发地址：`http://localhost:8001`
- 后端接口代理已配置，前端请求 `/api/xxx` 自动转发到后端 `http://localhost:8000`

### 4. 生产构建
```bash
npm run build
```

## 📝 核心配置说明
### 1. 路由配置（src/router/index.ts）
已完成基础路由配置，直接添加路由规则即可使用。

### 2. 请求封装（src/utils/request.ts）
统一封装 Axios，支持请求/响应拦截、错误处理，直接导入使用：
```typescript
import request from '@/utils/request'

// 示例请求
request.get('/api/user/list')
request.post('/api/user/add', { name: 'test' })
```

### 3. 布局与页面开发（src/App.vue）
已内置**顶部导航栏（Topbar）+ 侧边栏（Sidebar）**标准布局，**无需修改布局代码**：
- 只需要在 Sidebar 中添加菜单和路由跳转配置
- 新建页面组件后，配置路由即可快速接入系统

### 4. 服务代理（vite.config.ts）
已配置接口代理和服务端口：
- 前端端口：`8001`
- 后端代理：`/api` → `http://localhost:8000`
- 支持跨域访问，本地开发无需处理跨域

## 🎯 快速新增页面
1. 在 `src/views/` 新建页面组件（如 `Home.vue`）
2. 在 `src/router/index.ts` 添加路由规则
3. 在 `src/App.vue` 的 Sidebar 中添加菜单
4. 重启服务，即可访问新页面
