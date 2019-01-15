<template>
  <div id="app">
    <nav-bar/>
    <div id="app-content">
      <router-view></router-view>
    </div>
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
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  font-size: 16px;
  font-family: "Jost", sans-serif;
  font-weight: 300;
  -webkit-font-smoothing: antialiased;
}
#app-content {
  flex: 1;
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
