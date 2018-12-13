<template>
  <div>
    <section>
      <div class="failure" v-if="failureMessage">{{failureMessage}}</div>
    </section>
    <section class="hero is-fullheight" v-if="!registrationSuccess">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-4 is-offset-4">
            <h3 class="title has-text-grey">Register</h3>
            <div class="box">
              <form @submit.prevent="handleSubmit">
                <div class="field">
                  <div class="control">
                    <input
                      class="input is-large"
                      required
                      type="text"
                      autofocus
                      v-model.trim="username"
                      placeholder="Username"
                    >
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <input
                      class="input is-large"
                      required
                      type="password"
                      v-model.trim="password"
                      placeholder="Password"
                    >
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <input
                      class="input is-large"
                      required
                      type="email"
                      v-model.trim="email"
                      placeholder="Email"
                    >
                  </div>
                </div>
                <button class="button is-block is-info is-large is-fullwidth">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="hero is-fullheight" v-if="registrationSuccess">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-4 is-offset-4">
            <p class="subtitle">
              Thank You for creating a Rundeck Spark Account.
              Please watch your email for a verification code to complete
              the sign up process.
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
  name: "SignUpForm",
  data() {
    return {
      username: null,
      password: "Letmein1022!",
      email: "jesse@rundeck.com",
      registrationSuccess: false,
      failureMessage: null
    };
  },
  methods: {
    ...mapActions("account", ["register"]),
    handleSubmit() {
      const { username, password, email } = this;
      if (username && password && email) {
        this.register({ username, password, email });
      }
    }
  },
  mounted() {}
};
</script>

<style scoped>
</style>
