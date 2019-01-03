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
                      type="email"
                      v-model.trim="email"
                      placeholder="Email Address"
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
import { mapActions } from "vuex";

export default {
  name: "SignUpForm",
  data() {
    return {
      password: "Letmein1022!",
      email: "jesse@rundeck.com",
      registrationSuccess: false,
      failureMessage: null
    };
  },
  methods: {
    ...mapActions("account", ["register"]),
    handleSubmit() {
      const { password, email } = this;
      if (password && email) {
        this.register({ password, email });
      }
    }
  },
  mounted() {}
};
</script>

<style scoped>
</style>
