<template>
  <div id="app">
    <nav-bar/>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import NavBar from "@/ui/Nav";

export default {
  name: "app",
  components: {
    NavBar
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
</style>
