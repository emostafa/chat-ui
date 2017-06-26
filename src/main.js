import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

require('bootstrap/dist/css/bootstrap.css')

import VueResource from 'vue-resource'
Vue.use(VueResource)

import VueSocketio from 'vue-socket.io'
Vue.use(VueSocketio, 'http://localhost.com:3000')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  sockets: {
    connect () {
      console.log('df')
    }
  },
  render: h => h(App)
})
