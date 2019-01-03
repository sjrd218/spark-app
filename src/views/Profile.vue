<template>
  <div>
    <h1>Hi there {{user.username}}!</h1>
    <p>There will be more profile information here shortly.</p>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Profile",
  data() {
    return {};
  },
  computed: {
    ...mapState("account", ["user"])
  }
};
</script>

<style scoped>
</style>
