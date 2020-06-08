import Vue from 'vue'
import Vuex from "./kvuex";

Vue.use(Vuex)
const options = {
    state: {
        counter: 0,
    },
    mutations: {
        add(state) {
            state.counter++
        }
    },
    actions: {
        add({commit}) {
            setTimeout(() => {
                commit('add')
            }, 1000)
        }
    },
    getters: {
        doubleCount(state){
            return state.counter * 2
        },
        thirdCount(state){
            return state.counter * 3
        }
    },
    modules: {
    }
}

const store = new Vuex.Store(options)

export default store
