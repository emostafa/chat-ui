
<template>
  <div id="login" class="container">
    <div class="row">
      <div class="col-xs-12 col-md-4 offset-md-4">
        <div class="card card-block text-center">
          <h5 class="text-primary">Login</h5>
          <p class="text-muted">Login to be able to access chat</p>
          <hr>
          <form @submit.prevent="submit">
            <div class="form-group">
              <label>Email</label>
              <input type="email" v-model="user.email" class="form-control" placeholder="someone@company.com">
            </div>
            <div class="form-group">
              <label>Password</label>
              <input type="password" v-model="user.password" class="form-control" placeholder="password">
            </div>
            <div v-for="err in errors">
              <p class="text-danger">{{ err }}</p>
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from '@/services/Auth'

export default {
  name: 'login',
  data () {
    return {
      user: {email: null, password: null},
      errors: []
    }
  },
  methods: {
    submit () {
      Auth.login(this.user).then(res => {
        this.$emit('authenticated', res.body.user)
        this.errors = []
      }, res => {
        this.errors = [res.body.errors]
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media (min-width: 768px) {
  #login {
    margin-top: 100px
  }
}
</style>
