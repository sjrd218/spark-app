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
              <h3 class="title has-text-grey">Change Your Account Info</h3>
              <form @submit.prevent="handleSubmit">
                <button type="submit" class="button is-block is-info is-large is-fullwidth">Update</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ProfileSidebar from "@/components/ProfileSidebar";

import { mapActions } from "vuex";

export default {
  name: "ChangeAccountInfo",
  components: {
    ProfileSidebar
  },
  data() {
    return {
      nameFirst: "",
      nameLast: "",
      company: ""
    };
  },
  methods: {
    ...mapActions("account", ["changeAccountInfo"]),
    handleSubmit() {
      const { nameFirst, nameLast, company } = this;
      this.changeAccountInfo({ nameFirst, nameLast, company });
    }
  }
};
</script>
