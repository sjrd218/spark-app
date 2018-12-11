<template>
  <div>
    <WelcomeMessage :user="username"/>
    <ActiveFeatureList/>
  </div>
</template>

<script>
import WelcomeMessage from "@/components/WelcomeMessage";
import ActiveFeatureList from "@/components/ActiveFeatureList";

export default {
  name: "MySpark",
  props: ["username"],
  components: {
    WelcomeMessage,
    ActiveFeatureList
  }
};
</script>

<style scoped>
</style>
