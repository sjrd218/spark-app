<template>
  <div>
    <section class="section-block">
      <div class="container">
        <div class="columns">
          <div class="column is-3">
            <dashboard-sidebar/>
          </div>
          <div class="column is-9">
            <div class="content is-medium">
              <div class="box">
                <h4 class="title is-3">Welcome</h4>
                <article>
                  <WelcomeMessage/>
                </article>
              </div>
              <div class="box">
                <h4 class="title is-3">Active Features</h4>
                <article>
                  <ActiveFeatureList/>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import WelcomeMessage from "@/components/WelcomeMessage";
import DashboardSidebar from "@/components/DashboardSidebar";
import ActiveFeatureList from "@/components/ActiveFeatureList";

export default {
  name: "MySpark",
  components: {
    WelcomeMessage,
    ActiveFeatureList,
    DashboardSidebar
  }
};
</script>

<style scoped>
</style>
