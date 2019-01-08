<template>
  <div>
    <div class="control has-icons-right">
      <input class="input is-large" type="search" placeholder="Search by Plugin Name">
      <!-- <span class="icon is-medium is-left">
            <i class="fa fa-search"></i>
      </span>-->
      <span class="icon is-medium is-right">
        <i class="fa fa-search"></i>
      </span>
    </div>
    <!-- <div class="card">
      <div class="card-content">
        <div class="content">
          <div class="control has-icons-right">
            <input class="input is-large" type="search">
            <span class="icon is-medium is-right">
              <i class="fa fa-search"></i>
            </span>
          </div>
        </div>
      </div>
    </div>-->
    <div class="columns">
      <div class="column">
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Filter by Tag</label>
          </div>
          <div class="field-body">
            <div class="field">
              <v-select multiple :options="tags"></v-select>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Filter by Plugin Type</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <div class="select is-fullwidth">
                  <select>
                    <option value="*">All</option>

                    <option value="Step">Step</option>

                    <option value="Storage">Storage</option>

                    <option value="Notification">Notification</option>

                    <option value="Node Execution">Node Execution</option>

                    <option value="External">External</option>

                    <option value="Resource">Resource</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tabs is-centered">
      <ul>
        <li class="is-active">
          <a>All</a>
        </li>
        <li>
          <a>Community</a>
        </li>
        <li>
          <a>Rundeck Supported</a>
        </li>
        <li>
          <a>Enterprise Exclusive</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "RepositorySearch",
  props: ["tags"],
  data() {
    return {
      options: ["foo", "bar", "baz"]
    };
  }
};
</script>

<style scoped>
.field-label {
  flex-basis: auto;
  text-align: left;
}
</style>
