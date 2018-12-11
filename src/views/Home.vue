<template>
  <div>
    <home-hero/>
    <div class="container">
      <nav-bar/>
    </div>
    <div class="container">
      <repository-browser/>
    </div>
  </div>
</template>

<script>
import NavBar from "@/ui/Nav";
import HomeHero from "@/components/HomeHero";
import RepositoryBrowser from "@/components/RepositoryBrowser";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeHero,
    RepositoryBrowser
  }
};
</script>

<style scoped>
</style>
