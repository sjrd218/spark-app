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
              <form class="styled-inputs" @submit.prevent="handleSubmit">
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label class="label">Name</label>
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <p class="control is-expanded">
                        <b-input v-model="user.nameFirst" type="text" placeholder="First Name"></b-input>
                      </p>
                    </div>
                    <div class="field">
                      <p class="control is-expanded">
                        <b-input v-model="user.nameLast" type="text" placeholder="Last Name"></b-input>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label class="label">Company</label>
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <b-input type="test" v-model="user.company" placeholder="Anvil Corp"></b-input>
                    </div>
                  </div>
                </div>
                <!-- <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label class="label">Company</label>
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <b-input type="email" v-model="user.email" placeholder="your@email.com"></b-input>
                    </div>
                  </div>
                </div>-->
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label class="label"></label>
                  </div>
                  <div class="field-body">
                    <button
                      type="submit"
                      class="button is-block is-info is-large is-fullwidth"
                    >Update</button>
                  </div>
                </div>
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
      user: {
        nameFirst: "",
        nameLast: "",
        company: ""
      }
    };
  },
  methods: {
    ...mapActions("account", ["changeAccountInfo"]),
    handleSubmit() {
      const { nameFirst, nameLast, company } = this.user;
      this.changeAccountInfo({ nameFirst, nameLast, company });
    }
  }
};
</script>
