import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import axios from 'axios'
// 定义路由规则
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue') // 懒加载
    },
    // {
    //     path: '/about',
    //     name: 'About',
    //     component: () => import('../views/About.vue')
    // },
    // // 嵌套路由示例
    // {
    //     path: '/user',
    //     name: 'User',
    //     component: () => import('../views/User.vue'),
    //     children: [
    //         {
    //             path: 'profile',
    //             name: 'UserProfile',
    //             component: () => import('../views/UserProfile.vue')
    //         },
    //         {
    //             path: 'settings',
    //             name: 'UserSettings',
    //             component: () => import('../views/UserSettings.vue')
    //         }
    //     ]
    // },
    // 404 页面
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('../views/NotFound.vue')
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

let authChecked = false

async function checkAuth(): Promise<boolean> {
    try {
        await axios.post('/api/user/refresh', {}, { withCredentials: true })
        return true
    } catch {
        return false
    }
}

router.beforeEach(async (to, _from, next) => {
    if (to.meta.requiresAuth === false) {
        next()
        return
    }

    if (!authChecked) {
        authChecked = true
        const isAuth = await checkAuth()
        if (!isAuth) {
            next({ name: 'Login' })
            return
        }
    }

    next()
})

export function markAuthChecked() {
    authChecked = true
}

export function resetAuthChecked() {
    authChecked = false
}


export default router