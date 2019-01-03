<template>
  <aside class="is-medium menu">
    <p class="menu-label">profile</p>
    <ul class="menu-list">
      <li class="is-right">
        <router-link :class="{'is-active': currentRoute === 'Profile'}" to="/profile">My Profile</router-link>
      </li>
      <li class="is-right">
        <router-link
          :class="{'is-active': currentRoute === 'ChangeAccountInfo'}"
          to="/profile/change-account-info"
        >Change Account Info</router-link>
      </li>
      <li class="is-right">
        <router-link
          :class="{'is-active': currentRoute === 'ChangePassword'}"
          to="/profile/change-password"
        >Change Password</router-link>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: "ProfileSidebar",
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
