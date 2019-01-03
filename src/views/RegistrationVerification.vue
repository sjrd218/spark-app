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
                      v-model.trim="email"
                      placeholder="Email"
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
import { mapActions } from "vuex";

export default {
  name: "RegistrationVerification",
  data() {
    return {
      email: null,
      verificationCode: null,
      verificationSuccess: null,
      failureMessage: null
    };
  },
  methods: {
    ...mapActions("account", ["verify"]),
    handleSubmit() {
      this.verify({
        email: this.email,
        verificationCode: this.verificationCode
      });
    }
  },
  mounted() {
    if (this.$route.query.email) {
      this.email = this.$route.query.email;
    }
  }
};
</script>

<style scoped>
</style>
