<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-4 is-offset-4">
            <h3 class="title has-text-grey">Reset Your Password</h3>
            <div class="box">
              <form @submit.prevent="handleSubmit">
                <div class="field">
                  <div class="control">
                    <input
                      class="input is-large"
                      placeholder="Verification Code"
                      v-model="verificationCode"
                      type="text"
                      id="verificationCode"
                      autofocus
                      required
                    >
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <password
                      v-model="password"
                      :toggle="true"
                      @score="showScore"
                      @feedback="showFeedback"
                    />
                  </div>
                </div>
                <div class="field" v-show="scoreAchieved">
                  <div class="control">
                    <div class="Password">
                      <div class="Password_group">
                        <input
                          class="Password__field"
                          v-model="passwordConfirmed"
                          type="password"
                          placeholder="Confirm password"
                          id="passwordConfirmed"
                          required
                        >
                        <div class="Password__icons" v-show="passwordMatch">
                          <div class="Password__toggle">
                            <span class="tag is-success">
                              <i class="fas fa-equals"></i>
                            </span>
                          </div>
                        </div>
                        <div class="Password__icons" v-show="!passwordMatch">
                          <div class="Password__toggle">
                            <span class="tag is-warning">
                              <i class="fas fa-not-equal"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  class="button is-block is-info is-large is-fullwidth"
                  :disabled="isDisabled"
                >Reset</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Password from "vue-password-strength-meter";

import { mapActions } from "vuex";

export default {
  name: "ResetPassword",
  components: {
    Password
  },
  data() {
    return {
      verificationCode: null,
      password: "",
      passwordConfirmed: "",
      scoreAchieved: false
    };
  },
  methods: {
    ...mapActions("account", ["resetPassword"]),
    handleSubmit() {
      const { password, passwordConfirmed, verificationCode } = this;
      if (password && passwordConfirmed && verificationCode) {
        this.resetPassword({ password, passwordConfirmed, verificationCode });
      }
    },
    showFeedback({ suggestions, warning }) {
      // eslint-disable-next-line
      console.log("🙏", suggestions);
      // eslint-disable-next-line
      console.log("⚠", warning);
    },
    showScore(score) {
      this.scoreValue = score;
      if (score === 4) {
        this.scoreAchieved = true;
      }
    }
  },
  computed: {
    isDisabled() {
      return !this.passwordMatch || !this.verificationCode;
    },
    passwordMatch() {
      return (
        this.password &&
        this.passwordConfirmed &&
        this.password === this.passwordConfirmed
      );
    }
  }
};
</script>

<style scoped>
</style>
<style>
.Password__badge {
  height: 20px !important;
  text-align: center;
}
</style>
