import Vue from 'vue'

export default {
  login (credentials) {
    let payload = credentials
    return Vue.http.post('http://localhost:3000/api/auth', payload)
  }
}
