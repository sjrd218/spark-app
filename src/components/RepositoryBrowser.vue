<template>
  <div>
    <div>{{repoName}} plugins</div>
    <div v-if="!loaded" class="loader">
      <img src="../assets/spinner-gray.gif" width="32" height="32">
    </div>
    <div class="columns is-multiline">
      <div class="column" v-for="item in entries" :key="item.id">
        <div class="column-title">
          {{item.name}}
          <span class="tag is-pulled-right">{{item.rundeckCompatibility}}</span>
        </div>
        <div>{{item.description}}</div>
        <div>
          <span>View Plugin Info</span>
        </div>
        <div>{{item.support}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import config from "@/config";
import PluginSearch from "@/components/PluginSearch";

export default {
  name: "RepositoryBrowser",
  data() {
    return {
      entries: null,
      loaded: false,
      repoName: config.repoName,
      repoSrc: config.ossRepoSource
    };
  },
  mounted() {
    this.loadManifest();
  },
  methods: {
    loadManifest() {
      axios({
        method: "get",
        url: this.repoSrc
      }).then(response => {
        if (response.data) {
          this.entries = response.data;
        }
        this.loaded = true;
      });
    }
  }
};
</script>

<style scoped>
.column {
  margin: 10px;
  padding: 18px;
  background-color: #fff;
  border: 3px solid #ddd;
  flex: 0 0 275px;
  min-height: 100px;
  font-size: 1.125em;
}
.column-title {
  font-weight: bold;
  color: #333;
  padding: 0 0 5px 0;
  border-bottom: 3px;
  border-bottom-color: black;
  border-bottom-style: solid;
  margin-bottom: 5px;
}
.item-hdr {
  font-weight: bold;
  color: #333;
  padding: 0 0 5px 0;
  border-bottom: 3px;
  border-bottom-color: black;
  border-bottom-style: solid;
  margin-bottom: 5px;
}
.desc {
  padding: 5px 0;
}
.link {
  color: #6f9ad3;
  text-decoration: underline;
}
.footer {
  margin-top: 5px;
  padding: 5px 0 0 0;
  border-top: 3px;
  border-top-color: black;
  border-top-style: solid;
}
.loader {
  width: 65px;
  margin: 50px auto;
}
</style>
