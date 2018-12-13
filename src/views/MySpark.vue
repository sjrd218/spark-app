<template>
  <div>
    <nav-bar/>
    <WelcomeMessage/>
    <ActiveFeatureList/>
  </div>
</template>

<script>
import NavBar from "@/ui/Nav";
import WelcomeMessage from "@/components/WelcomeMessage";
import ActiveFeatureList from "@/components/ActiveFeatureList";

export default {
  name: "MySpark",
  props: ["username"],
  components: {
    NavBar,
    WelcomeMessage,
    ActiveFeatureList
  }
};
</script>

<style scoped>
</style>
