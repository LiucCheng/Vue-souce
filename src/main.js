import Vue from 'vue'
import App from './App.vue'
import router from './krouter'
import store from './kstore'

Vue.config.productionTip = false
// 口号：first blood  first blood  first blood
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
