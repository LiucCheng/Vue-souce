import Vue from 'vue'
import VueRouter from './router'
import Home from '../components/Home'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../components/About'),
        children: [
            {
                path: '/about/info',
                name: 'info',
                component: {
                    render(h) {
                       return h('div', '测试第一个子路由呢')
                    }
                },
            },
            {
                path: '/about/test',
                name: 'info',
                component: {
                    render(h) {
                        return h('div', '测试第二个子路由呢')
                    }
                },
            },
        ]
    }
]

const router = new VueRouter({
    mode: 'hash',
    routes,
})

export default router
