<template>
  <div id="feature-list">
    <ul v-for="feature in features" :key="feature">
      <li>{{feature}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ActiveFeatureList",
  data() {
    return {
      features: [
        "Rundeck Enterprise",
        "Enterprise Tours",
        "Monitoring and Healthchecks"
      ]
    };
  }
};
</script>

<style scoped>
</style>
