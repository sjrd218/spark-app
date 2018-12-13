<template>
  <div>
    <section>
      <div class="failure" v-if="failureMessage">{{failureMessage}}</div>
    </section>
    <section class="hero is-fullheight" v-if="!verificationSuccess">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-4 is-offset-4">
            <p class="subtitle">
              Thank You for creating a Rundeck Spark Account.
              Please watch your email for a verification code to complete
              the sign up process.
            </p>
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
                      type="text"
                      v-model.trim="verificationCode"
                      placeholder="Verification Code"
                    >
                  </div>
                </div>
                <button class="button is-block is-info is-large is-fullwidth">Verify</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "RegistrationVerification",
  data() {
    return {
      username: null,
      verificationCode: null,
      verificationSuccess: null,
      failureMessage: null
    };
  },
  methods: {
    ...mapActions("account", ["verify"]),
    handleSubmit() {
      // const { username, verificationCode } = this;
      this.verify({
        username: this.username,
        verificationCode: this.verificationCode
      });
    }
  },
  mounted() {
    if (this.$route.query.username) {
      this.username = this.$route.query.username;
    }
  }
};
</script>

<style scoped>
</style>
