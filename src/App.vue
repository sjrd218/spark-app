<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "app",
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
