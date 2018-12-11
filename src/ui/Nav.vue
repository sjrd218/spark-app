<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div id class="navbar-menu">
      <div class="navbar-start">
        <!-- <router-link to="/myspark">My Spark</router-link> -->
        <router-link class="navbar-item" to="/">Home</router-link>
        <router-link class="navbar-item" to="/plugins">Plugins</router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <router-link class="button is-primary" to="register">Sign Up</router-link>
            <router-link class="button is-light" to="login">Log In</router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
// import { EventBus } from "@/utilities/vueEventBus";

export default {
  name: "Nav",
  components: {},
  data() {
    return {
      username: null
    };
  },
  methods: {},
  mounted() {
    // console.log("events", Events);
    // this.eventBus.$on(Events.CURRENT_USER, user => {
    //   this.username = user ? user.username : null;
    // });
  }
};
</script>

<style scoped></style>
