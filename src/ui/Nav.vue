<template>
  <nav
    class="navbar is-fixed-top"
    :class="{'box-shadow': boxShadow}"
    role="navigation"
    aria-label="main navigation"
  >
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
          <!-- <router-link class="navbar-item" to="/plugins">Plugins</router-link> -->
          <router-link class="navbar-item" to="/test">Submit A Spark</router-link>
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
              <router-link class="button red-button" to="register">Sign Up</router-link>
              <router-link class="button red-button" to="login">Log In</router-link>
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
    return {
      throttlescroll: false,
      boxShadow: false
    };
  },
  computed: {
    ...mapGetters("account", ["getStatus", "getUser"])
  },
  methods: {
    ...mapActions("account", ["logout"]),
    // amountScrolled() {
    //   var winheight =
    //     window.innerHeight ||
    //     (document.documentElement || document.body).clientHeight;
    //   var docheight = getDocHeight();
    //   var scrollTop =
    //     window.pageYOffset ||
    //     (document.documentElement || document.body.parentNode || document.body)
    //       .scrollTop;
    //   var trackLength = docheight - winheight;
    //   var pctScrolled = Math.floor((scrollTop / trackLength) * 100); // gets percentage scrolled (ie: 80 or NaN if tracklength == 0)
    //   return `${pctScrolled}% scrolled`;
    //},
    atTopOfDocument() {
      if (window.pageYOffset > 1) {
        return true;
      } else {
        return false;
      }
    },
    hasBoxShadow() {
      if (window.pageYOffset > 1) {
        this.boxShadow = true;
      } else {
        this.boxShadow = false;
      }
    }
  },
  mounted() {
    // TODO
    // find a better place to stash this logic
    window.addEventListener(
      "scroll",
      () => {
        clearTimeout(this.throttlescroll);
        this.throttlescroll = setTimeout(() => {
          // throttle code inside scroll to once every 50 milliseconds
          this.hasBoxShadow();
        }, 100);
      },
      false
    );
  }
};
</script>

<style scoped lang="scss">
.navbar {
  padding: 1.25em 0;
  -webkit-transition: 0.25s box-shadow ease-in-out,
    0.25s background-color ease-in-out;
  -o-transition: 0.25s box-shadow ease-in-out,
    0.25s background-color ease-in-out;
  transition: 0.25s box-shadow ease-in-out, 0.25s background-color ease-in-out;
  &.box-shadow {
    background-color: white;
    -webkit-box-shadow: 0 0.625em 0.625em rgba(0, 0, 0, 0.08),
      0 0.875em 1.75em rgba(0, 0, 0, 0.15);
    box-shadow: 0 0.625em 0.625em rgba(0, 0, 0, 0.08),
      0 0.875em 1.75em rgba(0, 0, 0, 0.15);
  }
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
        font-weight: 500;
        // font-size: 18px;
        // line-height: 30px;

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
  border: none;
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
