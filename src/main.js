import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import './assets/css/main.css'
export const eventBus = new Vue();

new Vue({
  render: h => h(App),
}).$mount('#app')
