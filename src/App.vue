<template>
  <div id="app">
    <nav-bar/>
    <router-view></router-view>
    <footer-bar/>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import NavBar from "@/ui/Nav";
import FooterBar from "@/ui/FooterBar";

export default {
  name: "app",
  components: {
    NavBar,
    FooterBar
  },
  methods: {
    ...mapActions("account", ["checkUser"])
  },
  created() {
    this.checkUser();
  }
};
</script>

<style>
#app {
  font-size: 16px;
  font-family: "Jost", sans-serif;
  font-weight: 300;
  -webkit-font-smoothing: antialiased;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  color: #333333;
}
.section-block {
  padding: 3rem 0;
}
</style>

<style lang="scss">
// @import "@/scss/_app.scss";
</style>
