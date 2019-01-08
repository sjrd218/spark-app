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
// import RepositorySearch from "@/components/RepositorySearch";

export default {
  name: "Home",
  components: {
    HomeHero,
    RepositoryBrowser
    // RepositorySearch
  }
};
</script>

<style scoped>
</style>
