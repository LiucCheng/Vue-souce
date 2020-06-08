
// 1、实现类和install方法
// 2、实现两个全局组件
// 3、监听路由变化
// 4、创建current响应式，修改当前router-view位置
// 5、路由深度匹配
let Vue
class kVueRouter {
    constructor(option) {
        // 先存储
        this.$option = option
        // 这个用来标记切换路由的, 需要转化为响应式的
        // this.current = '/'
        // Vue.util.defineReactive(this, 'current', '/')
        this.current = window.location.hash.slice(1) || '/'

        Vue.util.defineReactive(this, 'matched', [])

        this.match()

        // 需要绑定this指向
        window.addEventListener('hashchange', this.onHashChange.bind(this))
    }

    onHashChange() {
        this.current = window.location.hash.slice(1)
        this.matched = []
        this.match()
    }
    match(routes) {
        routes = routes || this.$option.routes
        for (const route of routes) {
            // 精准匹配
            if (route.path === '/' && this.current === '/') {
                this.matched.push(route)
                return
            }
            // 其他情况
            if (route.path !== '/' && !(this.current.indexOf(route.path) === -1)) {
                // 存在的情况 包含子路由
                this.matched.push(route)
                if (route.children) {
                    this.match(route.children)
                }
                return
            }
        }
    }

}

const routerViewComponents = {
    render(h) {
        // 改进，路由深度
        this.$vnode.data.routerView = true
        let parent = this.$parent
        let depth = 0
        while (parent) {
            const vnodeData = parent.$vnode ? parent.$vnode.data : {}
            if (vnodeData && vnodeData.routerView) {
                // 说明是一个routerView
                depth++
            }
            parent = parent.$parent
        }
        let component = null
        const route = this.$router.matched[depth]
        if (!route) {
            console.error('路由配置表中未配置')
        } else {
            component = route.component
        }
        return  h(component)
    }
}
const routerLinkComponents = {
    props: {
      to: {
          type: String,
          default: '',
      }
    },
    render(h) {
        // 配置路由表里的路由
        return h('a', {attrs: { href: '#' + this.to }}, this.$slots.default)
    }
}

kVueRouter.install = function (_Vue) {
    Vue = _Vue
    // 需要将router对象挂载到Vue的实例上
    Vue.mixin({
        beforeCreate() {
            // 确保根实例有了才执行
            if (this.$options.router && !Vue.prototype.$router) {
                Vue.prototype.$router = this.$options.router
            }
        }
    })
    Vue.component('router-view', routerViewComponents)
    Vue.component('router-link', routerLinkComponents)
}
export default kVueRouter
