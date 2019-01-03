<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item logo" href="https://spark.rundeck.io">
          <logo/>
        </a>
        
        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/">Home</router-link>
          <router-link class="navbar-item" to="/plugins">Plugins</router-link>
          <router-link class="navbar-item" to="/test">Test</router-link>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <span v-if="getStatus.loggedIn === true">
                <router-link class="button is-light" to="myspark">MySpark</router-link>
                <router-link class="button is-light" to="/profile">Profile</router-link>
                <a @click="logout" class="button is-light">Log Out</a>
              </span>
              <span v-else>
                <router-link class="button is-primary" to="register">Sign Up</router-link>
                <router-link class="button is-light" to="login">Log In</router-link>
                <router-link class="button is-light" to="reset-password">Reset</router-link>
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- <pre>{{getUser}}</pre> -->
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Logo from "@/ui/Logo";

export default {
  name: "Nav",
  components: {
    Logo
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("account", ["getStatus", "getUser"])
  },
  methods: {
    ...mapActions("account", ["logout"])
  }
};
</script>

<style scoped lang="scss">
.navbar-menu {
  a.navbar-item,
  .navbar-link {
    background-color: transparent;
    color: black;
  }
}

// a.navbar-item:hover,
// a.navbar-item.is-active,
// .navbar-link:hover,
// .navbar-link.is-active {
//   background-color: transparent;
// }
a.navbar-item:hover,
a.navbar-item.is-active,
.navbar-link:hover,
.navbar-link.is-active {
  background-color: transparent;
}
.navbar {
  padding: 1.25em 0;
  // background-color: #e34f43;
  background-color: white;
}
.logo {
  margin-right: 2.8125em;
}
.navbar-start .navbar-item:first-of-type {
  padding-left: 0;
}
.red-button {
  background-color: #f7403a;
  -webkit-box-shadow: 0 0.625em 0.625em rgba(0, 0, 0, 0.08),
    0 0.875em 1.75em rgba(0, 0, 0, 0.15);
  box-shadow: 0 0.625em 0.625em rgba(0, 0, 0, 0.08),
    0 0.875em 1.75em rgba(0, 0, 0, 0.15);
  border-radius: 0.1875em;
  padding: 0.82812em 1.375em;
  font-weight: 700;
}
.navbar-menu {
  .navbar-item {
    display: inline-block;
    position: relative;
    margin-right: 1.25em;
    color: #000;
    font-weight: 500;
    padding: 0.55556em 0;
    font-size: 1.125em;
    font-weight: 500;
    -webkit-transition: 0.25s color ease-in-out;
    -o-transition: 0.25s color ease-in-out;
    transition: 0.25s color ease-in-out;
  }
}
</style>
