<template>
  <div id="app">
    <login @authenticated="loggedIn" v-if="!isAuthenticated"></login>    
    <chat :user="user" v-else=""></chat>
  </div>
</template>

<script>
import Chat from './components/Chat'
import Login from './components/Login'

export default {
  name: 'app',
  components: {
    Chat,
    Login
  },
  data () {
    return {
      isAuthenticated: false,
      user: null
    }
  },
  methods: {
    loggedIn (user) {
      this.isAuthenticated = true
      this.user = user
    }
  }
}
</script>

<style>
body {
  overflow: hidden;
}
</style>
