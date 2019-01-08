<template>
  <section class="section-block">
    <div class="container">
      <div class="columns">
        <div class="column is-3">
          <profile-sidebar/>
        </div>
        <div class="column is-9">
          <div class="content is-medium">
            <div class="box">
              <h3 class="title has-text-grey">Change Your Password</h3>
              <form @submit.prevent="handleSubmit">
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
                >Update</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Password from "vue-password-strength-meter";
import ProfileSidebar from "@/components/ProfileSidebar";

import { mapActions } from "vuex";

export default {
  name: "ChangePassword",
  components: {
    Password,
    ProfileSidebar
  },
  data() {
    return {
      password: "",
      passwordConfirmed: "",
      scoreAchieved: false
    };
  },
  methods: {
    ...mapActions("account", ["changePassword"]),
    handleSubmit() {
      const { password, passwordConfirmed } = this;
      if (password && passwordConfirmed) {
        this.changePassword({ password, passwordConfirmed });
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
      return !this.passwordMatch;
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

<style>
.Password {
  max-width: none !important;
}
.Password__badge {
  height: 20px !important;
  text-align: center;
}
</style>
