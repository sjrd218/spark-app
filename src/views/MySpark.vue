<template>
  <div>
    <WelcomeMessage/>
    <ActiveFeatureList/>
  </div>
</template>

<script>
import WelcomeMessage from "@/components/WelcomeMessage";
import ActiveFeatureList from "@/components/ActiveFeatureList";

export default {
  name: "MySpark",
  components: {
    WelcomeMessage,
    ActiveFeatureList
  }
};
</script>

<style scoped>
</style>
