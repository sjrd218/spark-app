<template>
  <div>
    <home-hero/>
    <div class="container">
      <repository-browser/>
    </div>
  </div>
</template>

<script>
import HomeHero from "@/components/HomeHero";
import RepositoryBrowser from "@/components/RepositoryBrowser";

export default {
  name: "Home",
  components: {
    HomeHero,
    RepositoryBrowser
  }
};
</script>

<style scoped>
</style>
