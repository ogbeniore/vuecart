<template>
  <div class="auth">
    <div class="details">
      <div>
        <h1>Login to Start Buying</h1>
        <p>Our products come at a minimal price that you will be happy to afford. Give your business the right exposure it needs via text message.</p>
      </div>
    </div>
    <div class="auth_form">
      <div class="response" :class="[apiResponse ? apiResponse.type: '']" v-show="showResponse">
        {{ apiResponse.message}}
      </div>
      <form @submit.prevent="login">
        <h1>Login</h1>
        <div class="form_item">
          <label for="username">Username</label>
          <input type="text" name="username" placeholder="Your Username" v-model="user.username">
        </div>
        <div class="form_item">
          <label for="password">Password</label>
          <input type="password" name="password" placeholder="Your Password" v-model="user.password">
        </div>
        <div class="text-center">
          <button :disabled="loading">
            <span v-if="loading">Loading..</span>
            <span v-else>Login</span>
          </button>
        </div>
        <div class="auth_check">
          <p>
            Dont have an account?
            <router-link :to="{name: 'register'}">Register</router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'LoginPage',
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      inputType: 'password',
      loading: false,
      showResponse: false
    }
  },
  computed: {
    ...mapGetters([
      'currentStatus',
      'apiResponse'
    ]),
    isValid() {
      if( this.user.username == '' || this.user.password == '') {
        return false;
      } else {
        return true;
      }
    }
  },
  watch: {
    currentStatus(val) {
      this.loading = val == 'pending' ? true : false
    },
    apiResponse(val) {
      this.showResponse = val.message != '' ? true : false
      if(val.type == 'success') {
        setTimeout(()=> {this.$router.push({name: 'shop'})}, 1000)
      }
    }
  },
  methods: {
    ...mapActions([
      'loginAction'
    ]),
    login() {
      if(this.isValid) {
        this.loginAction(this.user)
      } else {
        alert('All fields are required')
      }
    }
  }
}
</script>

<style scoped>
.auth {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  min-height: calc(100vh - 80px);
}
.details {
  height: 100%;
  width: 100%;
  background-image: linear-gradient(rgba(210, 105, 30, 0.6), rgba(210, 105, 30, 0.6)), url("../assets/bg-image.jpg");
  display: flex;
  padding: 2rem;
  background-size: cover;
  background-position: center;
  align-items: center;
  color: #ffffff;
}
.auth_form {
  padding: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 3rem;
}
.auth_form form {
  width: 100%;
}
.auth_form h1 {
  text-align: center;
  color: chocolate;
  text-transform: uppercase;
}
.form_item {
  margin: 2rem 0;
}
.form_item input {
  width: 100%;
  padding: 1rem;
  border: 1px solid chocolate;
  border-radius: 4px;
  font-size: 16px;
  color: chocolate;
  margin-top: 0.5rem;
}
.form_item label {
  font-size: 16px;
  color: chocolate;
}
.auth_form button {
  background: chocolate;
  padding: 1rem 3rem;
  border: none;
  color: #ffffff;
  font-size: 16px;
  border-radius: 4px;
  width: 100%;
  cursor: pointer;
  border: 1px solid chocolate;
  transition: all 200ms ease-in;
}
.auth_form button:hover {
  color: chocolate;
  background: transparent;
}
.text-center {
  text-align: center;
}
.auth_check {
  text-align: center;
  font-size: 16px;
  margin-top: 2rem;
}
.auth_check a {
  color: chocolate;
  text-decoration: none;
}
.auth_check a:hover {
  text-decoration: underline;
}
.response {
  padding: 1rem;
  text-align: center;
  position: absolute;
  top: 100px;
}
.response.failure {
  background-color: red;
  color: white;
}
.response.success {
  background-color: green;
  color: white;
}
@media screen and (max-width: 768px) {
  .auth {
    grid-template-columns: 1fr;
  }
  .auth_form {
    padding: 1rem;
  }
  .auth_form h1 {
    font-size: 1.5rem;
  }
}
</style>