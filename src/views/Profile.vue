<template>
  <div>
    <span v-if="!username" class="clickable" @click="navToLogin()">Login</span>
    <span v-if="username" @click="toggleLogoutForm()" class="clickable">
      {{username}}
      <div class="popup-form logout-pos" v-if="showingLogoutForm">
        <div>
          <span class="clickable" @click="logout()">Logout</span>
        </div>
      </div>
    </span>
  </div>
</template>

<script>
import { SparkLogin } from "@/utilities/LoginServices";
import { Events } from "@/utilities/vueEventBus.js";

export default {
  name: "Profile",
  data() {
    return {
      username: null,
      showingLogoutForm: false
    };
  },
  methods: {
    navToLogin() {
      this.eventBus.$emit(Events.NAV, "login");
    },
    toggleLogoutForm() {
      this.showingLogoutForm = !this.showingLogoutForm;
    },
    logout() {
      SparkLogin.logout();
      this.showingLogoutForm = false;
      this.eventBus.$emit(Events.NAV, "home");
    }
  },
  props: ["eventBus"],
  mounted() {
    this.eventBus.$on(Events.CURRENT_USER, user => {
      this.username = user ? user.username : null;
    });
  }
};
</script>

<style scoped>
.popup-form {
  position: absolute;
  top: 20px;
  left: -20px;
  border: 1px solid #ddd;
  padding: 10px;
  background-color: #fff;
}
</style>
