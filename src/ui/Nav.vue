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
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/">Home</router-link>
          <router-link class="navbar-item" to="/plugins">Plugins</router-link>
          <router-link class="navbar-item" to="/test">Test</router-link>
        </div>

        <div class="navbar-end" v-if="getStatus.loggedIn === true">
          <div class="navbar-item">
            <div class="buttons">
              <router-link class="button red-button" to="myspark">Dashboard</router-link>
            </div>
          </div>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link is-arrowless">
              <span class="red-circle">
                <i class="fas fa-user"></i>
              </span>
            </a>

            <div class="navbar-dropdown is-right">
              <router-link class="navbar-item" to="/profile">Profile</router-link>
              <router-link class="navbar-item" to="/profile/change-password">Change Password</router-link>
              <hr class="navbar-divider">
              <a @click="logout" class="navbar-item">Log Out</a>
            </div>
          </div>
        </div>
        <div class="navbar-end" v-else>
          <div class="navbar-item">
            <div class="buttons">
              <router-link class="button is-primary" to="register">Sign Up</router-link>
              <router-link class="button is-light" to="login">Log In</router-link>
              <router-link class="button is-light" to="reset-password">Reset</router-link>
            </div>
          </div>
        </div>
      </div>
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
.navbar {
  padding: 1.25em 0 0;
  // background-color: #e34f43;
  background-color: white;
  .navbar-menu {
    .navbar-start {
      .navbar-item:first-of-type {
        padding-left: 0;
      }
      a.navbar-item,
      .navbar-link {
        height: fit-content;
        background-color: transparent;
        color: black;
        font-family: "Jost", sans-serif;
        font-weight: medium;
        font-size: 18px;
        line-height: 30px;

        display: inline-block;
        position: relative;
        margin-right: 1.25em;
        -webkit-transition: 0.25s color ease-in-out;
        -o-transition: 0.25s color ease-in-out;
        transition: 0.25s color ease-in-out;

        &:hover {
          color: #f84944;
        }
        &.router-link-active {
          border-bottom: 2px solid black;
        }
      }
    }
  }
}

.logo {
  margin-right: 2.8125em;
}
.red-button {
  background-color: #f7403a;
  color: #fff;
  border-radius: 0.1875em;
  padding: 0.82812em 1.375em;
  font-weight: 700;
  -webkit-transition: 0.25s all ease-in-out;
  -o-transition: 0.25s all ease-in-out;
  transition: 0.25s all ease-in-out;
  &:hover {
    background-color: #f97975;
    color: #fff;
  }
}

.red-circle {
  background-color: #f7403a;
  color: #fff;
  border-radius: 0.1875em;
  padding: 0.4em 1em;
  -webkit-transition: 0.25s all ease-in-out;
  -o-transition: 0.25s all ease-in-out;
  transition: 0.25s all ease-in-out;
  &:hover {
    background-color: #f97975;
    color: #fff;
  }
}
</style>
