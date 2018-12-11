<template>
  <div id="app">
    <div>
      <Profile :event-bus="EventBus" class="profile"/>
      <Logo />
      <Nav :event-bus="EventBus" />
    </div>
    <div class="content">
      <SparkHome v-if="nav === 'home'" />
      <RepositoryBrowser v-if="nav === 'plugins'" :repo-src="ossRepoSource" :repo-name="repoName" />
      <MySpark v-if="user && nav === 'myspark'" :username="user.username" />
      <LoginForm v-if="nav === 'login'" :event-bus="EventBus" />
      <SignUpForm v-if="nav === 'register'" :event-bus="EventBus" />
    </div>
  </div>
</template>

<script>
import LoginForm from "./components/LoginForm";
import Logo from "./components/Logo";
import Nav from "./components/Nav";
import { EventBus, Events } from './utilities/vueEventBus.js';
import RepositoryBrowser from "./components/RepositoryBrowser";
import MySpark from "./components/MySpark";
import { SparkLogin } from "./utilities/LoginServices";
import SignUpForm from "./components/SignUpForm";
import SparkHome from "./components/SparkHome";
import Profile from "./components/Profile";

export default {
  name: 'app',
    data() {
      return {
          user: null,
          EventBus: EventBus,
          ossRepoSource: "https://7zep4wqis8.execute-api.us-east-1.amazonaws.com/dev/list",
          repoName: "Rundeck",
          nav: "home"
      }
    },
  components: {
      Profile,
      SparkHome,
      SignUpForm,
      RepositoryBrowser,
      LoginForm,
      Logo,
      Nav,
      MySpark
  },
    mounted() {
      this.EventBus.$on(Events.CURRENT_USER,this.userLoggedIn)
      this.EventBus.$on(Events.NAV,this.setNavState)
      SparkLogin.fireSetCurrentUserEvent()
    },
    methods: {
      userLoggedIn(user) {
          this.user = user
      },
      setNavState(dest) {
        this.nav = dest
      }
    }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    width: 1360px;
    margin: 20px auto 0;
  }
  .bkg {
    text-align: left;
    margin-bottom: 15px;
    border-radius: 3px;
  }
  .hdr {
    font-size: 2em;
    color: #333;
    margin: 0 0 0 5px;
    padding: 0 0 0 5px;
    border: solid #000;
    border-width: 0 0 0 1px;
  }
  .content {
    text-align: left;
    padding: 5px;
  }
  .profile {
    float: right;
  }
  .content-hdr {
    font-size: 1.25em;
    font-weight: bold;
  }
  .clickable {
    text-decoration: underline;
    color: #6f9ad3;
    position: relative;
    cursor: pointer;
  }
  .button {
    border: 1px solid #6f9ad3;
    color: #6f9ad3;
    padding: 3px;
    cursor: pointer;
  }
</style>
