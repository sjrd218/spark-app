<template>
  <div>
    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-4 is-offset-4">
            <h3 class="title has-text-grey">Login</h3>
            <div class="box">
              <form @submit.prevent="handleSubmit">
                <div class="field">
                  <div class="control">
                    <input
                      class="input is-large"
                      v-model="username"
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
                      v-model="password"
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
import { mapState, mapActions } from "vuex";
import router from "vue-router";

export default {
  name: "LoginForm",
  data() {
    return {
      password: "Letmein1022!",
      loginError: null,
      username: "jesse",
      submitted: false,
      showingLoginForm: false,
      showingLogoutForm: false
    };
  },
  computed: {
    ...mapState("account", ["status"])
  },
  methods: {
    ...mapActions("account", ["login"]),
    handleSubmit() {
      const { username, password } = this;
      if (username && password) {
        this.login({ username, password });
      }
    }
  },
  mounted() {}
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
