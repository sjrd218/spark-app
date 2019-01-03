<template>
  <aside class="is-medium menu">
    <p class="menu-label">dashboard</p>
    <ul class="menu-list"></ul>
  </aside>
</template>

<script>
export default {
  name: "DashboardSidebar",
  data() {
    return {
      currentRoute: false
    };
  },
  mounted() {
    this.currentRoute = this.$route.name;
  }
};
</script>

<style scoped lang="scss">
.menu-list a.is-active {
  background-color: #c3d443;
  color: #fff;
  &:hover {
    background-color: #d2e44b;
    color: #fff;
  }
}
</style>
