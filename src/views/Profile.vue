<template>
  <section class="section-block">
    <div class="container">
      <div class="columns">
        <div class="column is-3">
          <profile-sidebar/>
        </div>
        <div class="column is-9">
          <div class="content is-medium">
            <div class="box">
              <h4 class="title is-3">
                Hi there
                <span v-if="user">{{user.username}}</span> ¯\_(ツ)_/¯
              </h4>
              <article>
                <p>There will be more profile information here shortly.</p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ProfileSidebar from "@/components/ProfileSidebar";

import { mapState } from "vuex";
export default {
  name: "Profile",
  components: {
    ProfileSidebar
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("account", ["user"])
  }
};
</script>

<style scoped lang="scss">
</style>
