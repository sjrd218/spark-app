<template>
  <footer>
    <logo/>
  </footer>
</template>
<script>
import Logo from "@/ui/Logo";

export default {
  name: "FooterBar",
  components: {
    Logo
  }
};
</script>
<style lang="scss" scoped>
footer {
  background-color: black;
  width: 100%;
}
</style>
