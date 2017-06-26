<template>
  <div id="chat">
    <div id="left-view">
      <div id="chat-area">
        <div v-for="msg in messages">
          <p><span class="text-muted">{{ msg.user }}:</span> {{ msg.text }}</p>
        </div>
      </div>
      <div id="send-box">
        <div id="notifications">
          <small class="text-muted">{{ notification }}</small>
        </div>
        <form @submit.prevent="send">
          <textarea placeholder="Write a message..." v-model="newMessage" @keyup.enter="send" class="form-control" row="3" ref="textbox"></textarea>
          <button type="submit" class="btn btn-primary mt-2">send</button>
        </form>
      </div>
    </div>
    <div id="users-list" class="hidden-sm-down">
      <h6 class="text-muted">Active Users</h6>
      <div class="user" v-for="user in users">
        {{ user }}
      </div>
    </div>
  </div>
</template>

<script>
import * as io from 'socket.io-client'
export default {
  name: 'chat',
  props: ['user'],
  data () {
    return {
      socket: null,
      messages: [],
      newMessage: null,
      users: [],
      notification: null
    }
  },
  mounted () {
    this.socket = io('http://localhost:3000')
    this.socket.emit('user_connected', this.user)

    this.socket.on('active_users', this.setActiveUsers)
    this.socket.on('message', this.receivedNewMsg)
    this.socket.on('user', this.userConnected)

    this.$refs.textbox.focus()

    window.addEventListener('beforeunload', this.leaving)
  },
  methods: {
    send () {
      if (this.newMessage) {
        let payload = {user: this.user.name, text: this.newMessage}
        this.socket.emit('message', payload)
        this.newMessage = null
      }
      this.$refs.textbox.focus()
    },
    receivedNewMsg (msg) {
      this.messages.push(msg)
      let el = document.getElementById('chat-area')
      el.scrollTop = el.scrollHeight - el.clientHeight
      this.notification = `${msg.user} sent a new message`
    },
    userConnected (user) {
      this.users.push(user)
      this.notification = `${user} connected to chat, say Hello :)`
    },
    setActiveUsers (users) {
      this.users = users
    },
    leaving () {
      this.socket.emit('user_disconnected', this.user.name)
    }
  }
}
</script>

<style scoped>
#left-view {
  width: 80%;
  overflow: hidden;
  position: fixed;
}
#users-list {
  position: fixed;
  background: rgb(27, 44, 62);
  right: 0;
  height: 100%;
  width: 20%;
  z-index: 5;
  border-left: 1px solid;
  border-color: rgba(221, 221, 221, 0.2);
  padding: 24px;
}
#chat-area {
  overflow-y: auto;
  scroll-behavior: smooth;
  padding: 24px 24px 48px 24px;
  height: 78vh;
  background: rgb(47, 62, 78);
}
#chat-area p {
  color: #fff
}
#notifications {
  margin-bottom: 12px;
}
#send-box {
  height: 22vh;
  padding: 12px 24px;
  background-color: #f3f6f8;
  border: 1px solid #eee;
  /*position: fixed;*/
  bottom: 0;
  width: 100%;
}
#send-box textarea {
  resize: none;
  border: 1px solid #eee;
}
.user {
  color: rgba(255, 255, 255, 0.7)
}
</style>
