<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div id class="navbar-menu">
      <div class="navbar-start">
        <div class="navbar-item">
          <div class="buttons">
            <router-link class="button" to="/">Home</router-link>
            <router-link class="button" to="/plugins">Plugins</router-link>
            <router-link class="button" to="/test">Test</router-link>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <span v-if="getStatus.loggedIn === true">
              <router-link class="button is-light" to="myspark">MySpark</router-link>
              <a href class="button is-light">Profile</a>
              <a @click="logout" class="button is-light">Log Out</a>
            </span>
            <span v-else>
              <router-link class="button is-primary" to="register">Sign Up</router-link>
              <router-link class="button is-light" to="login">Log In</router-link>
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- <pre>{{getUser}}</pre> -->
  </nav>
</template>

<script>
// import { EventBus } from "@/utilities/vueEventBus";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Nav",
  components: {},
  data() {
    return {
      username: null
    };
  },
  computed: {
    ...mapGetters("account", ["getStatus", "getUser"])
  },
  methods: {
    ...mapActions("account", ["logout"])
  },
  mounted() {
    // console.log("events", Events);
    // this.eventBus.$on(Events.CURRENT_USER, user => {
    //   this.username = user ? user.username : null;
    // });
  }
};
</script>

<style scoped>
.navbar-start .navbar-item:first-of-type {
  padding-left: 0;
}
</style>
