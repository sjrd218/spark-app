<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-4 is-offset-4">
            <h3 class="title has-text-grey">Forgot Your Password?</h3>
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
                <button class="button is-block is-info is-large is-fullwidth">Send Reset</button>
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
  name: "ForgotForm",
  data() {
    return {
      email: null
    };
  },
  methods: {
    ...mapActions("account", ["resetPasswordRequest"]),
    handleSubmit() {
      const { email } = this;
      if (email) {
        this.resetPasswordRequest({ email });
      }
    }
  },
  mounted() {}
};
</script>

<style scoped>
</style>
