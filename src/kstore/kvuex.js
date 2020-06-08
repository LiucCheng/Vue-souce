let Vue
class Store {
    constructor(options) {
        this.$option = options
        this._getters = options.getters
        this._mutations = options.mutations
        this._actions = options.actions

        // 需要绑定this指向问题
        // 方法一
        // this.commit = this.commit.bind(this)
        // this.dispatch = this.dispatch.bind(this)

        // 方法二：
        const store = this

        // 处理getter成computed里的样子 方法一
        this._mapGetters = {}
        Object.keys(store._getters).forEach(key => {
            this._mapGetters[key] = function() {
                return store._getters[key](state)
            }
        })
        // 将getter处理成响应式 方法二
        // Object.keys(store._getters).forEach(key => {
        //     Object.defineProperties(this.getters, key, {
        //         get() {
        //             return store._getters[key](state)
        //         }
        //     })
        // })

        this._vm = new Vue({
            data: {
                $$state: options.state,
            },
            computed: {
                ...store._mapGetters,
                // doubleCount() {
                //     return options.getters.doubleCount.call(store, state)
                // }
            }
        })
        const { commit, dispatch, state } = store
        this.commit = function boundCommit(type, payload) {
            commit.call(store, type, payload)
        }
        this.dispatch = function boundDispatch(type, payload) {
            dispatch.call(store, type, payload)
        }
    }
    get state() {
        return this._vm._data.$$state
    }
    set state(v) {
        console.error(`为了数据安全，不能直接赋值${v}`)
    }
    // store.getters取值是从_vm里面取
    get getters () {
        return this._vm
    }
    commit(type, payload) {
        const func = this._mutations[type]
        if (func) {
            func(this.state, payload)
        }
    }

    dispatch(type, payload) {
        const func = this._actions[type]
        if (func) {
            func(this, payload)
        }
    }
}

function install(_Vue) {
    Vue = _Vue
    Vue.mixin({
        beforeCreate() {
            if (this.$options.store && !Vue.prototype.$store) {
                Vue.prototype.$store = this.$options.store
            }
        }
    })
}

export default {
    Store,
    install,
}
