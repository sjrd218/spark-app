<template>
  <div>
    <section>
      <div class="failure" v-if="failureMessage">{{failureMessage}}</div>
    </section>
    <section v-if="registrationSuccess && verificationSuccess">
      <div class="success">Account Verification Complete. You may
        <router-link to="login">login</router-link>with your username.
      </div>
    </section>
    <section class="hero is-fullheight" v-if="!registrationSuccess && !verificationSuccess">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-4 is-offset-4">
            <h3 class="title has-text-grey">Register</h3>
            <div class="box">
              <!-- <figure class="avatar">
                <img src="https://placehold.it/128x128">
              </figure>-->
              <form @submit.prevent="login">
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
            <p class="has-text-grey">
              <a @click="setVerificationState">Enter Verification Code</a>
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="hero is-fullheight" v-if="registrationSuccess && !verificationSuccess">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-4 is-offset-4">
            <p class="subtitle">
              Thank You for creating a Rundeck Spark Account.
              Please watch your email for a verification code to complete
              the sign up process.
            </p>
            <div class="box">
              <!-- <figure class="avatar">
                <img src="https://placehold.it/128x128">
              </figure>-->
              <form @submit.prevent="submitVerification">
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
                      v-model.trim="vCode"
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
import { SparkLogin } from "@/utilities/LoginServices";
import { Events, EventBus } from "@/utilities/vueEventBus.js";
//import PhoneNumber from "@/components/PhoneNumber";

export default {
  name: "SignUpForm",
  components: {
    // PhoneNumber
  },
  data() {
    return {
      username: null,
      password: null,
      email: null,
      phoneGrp: { prefix: null, phone: null },
      vCode: null,
      registrationSuccess: false,
      verificationSuccess: false,
      failureMessage: null
    };
  },
  methods: {
    register() {
      SparkLogin.register(this.username, this.password, this.email, this.phone);
    },
    submitVerification() {
      SparkLogin.verify(this.username, this.vCode);
    },
    setVerificationState() {
      console.log("helop!");
      this.registrationSuccess = true;
    }
  },
  mounted() {
    EventBus.$on(Events.REGISTRATION_COMPLETE, () => {
      this.registrationSuccess = true;
    });
    EventBus.$on(Events.VERIFICATION_COMPLETE, () => {
      this.verificationSuccess = true;
    });
    EventBus.$on(Events.REGISTRATION_FAILURE, msg => {
      this.failureMessage = msg;
    });
  }
};
</script>

<style scoped>
</style>
