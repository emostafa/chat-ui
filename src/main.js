import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

require('bootstrap/dist/css/bootstrap.css')

import VueResource from 'vue-resource'
Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
