<template>
  <div>
    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-4 is-offset-4">
            <h3 class="title has-text-grey">Login</h3>
            <div class="box">
              <form @submit.prevent="login">
                <div class="field">
                  <div class="control">
                    <input
                      class="input is-large"
                      v-model="lun"
                      type="text"
                      id="un"
                      autofocus
                      placeholder="Your Username"
                    >
                  </div>
                </div>

                <div class="field">
                  <div class="control">
                    <input
                      class="input is-large"
                      v-model="lpw"
                      type="password"
                      id="pwd"
                      placeholder="Your Password"
                    >
                  </div>
                </div>
                <button type="submit" class="button is-block is-info is-large is-fullwidth">Login</button>
              </form>
              <div v-if="loginError" class="err">
                <div>{{loginError}}</div>
              </div>
            </div>
            <p v-if="!username" class="has-text-grey">Not a Spark member?
              <router-link to="register">Register</router-link>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { SparkLogin } from "@/utilities/LoginServices";
import { Events } from "@/utilities/vueEventBus";
import router from "vue-router";

export default {
  name: "LoginForm",
  data() {
    return {
      lun: null,
      lpw: null,
      loginError: null,
      username: null,
      showingLoginForm: false,
      showingLogoutForm: false
    };
  },
  methods: {
    login() {
      SparkLogin.login(this.lun, this.lpw);
      this.showingLoginForm = false;
    }
  },
  mounted() {
    this.eventBus.$on(Events.LOGIN_FAILURE, msg => {
      this.loginError = msg;
    });
    this.eventBus.$on(Events.CURRENT_USER, user => {
      this.username = user ? user.username : null;
      if (this.username) {
        router.push({ path: "myspark" });
      }
    });
  }
};
</script>

<style scoped>
.login {
  width: 250px;
  padding: 20px;
  margin: 10px auto;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 2px;
  text-align: center;
}
.login-form {
  text-align: left;
}
.login-form div {
  margin: 10px 0;
  display: flex;
}
.login-form div * {
  flex: auto;
}
.login-form div input {
  flex: 0 0 160px;
}
.err {
  background-color: #ff9999;
}
.register {
  padding: 0px 5px;
}
.tac {
  text-align: center;
}
.reg-lnk {
  margin-top: 50px;
}
</style>
