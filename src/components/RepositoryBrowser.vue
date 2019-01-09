<template>
  <div>
    <div style="margin-top:3em;">
      <ais-index
        app-id="GRSXNRCDRG"
        api-key="c463f74d6f36a5af808650e0f69aadfa"
        index-name="dev_official_plugin_list"
      >
        <ais-search-box>
          <!-- SEARCH BOX -->
          <div class="columns styled-inputs">
            <div class="column is-four-fifths">
              <div class="control has-icons-right">
                <ais-input
                  placeholder="Search by plugin name..."
                  :classNames="{
                  'ais-input': 'input is-large'
                  }"
                />
                <span class="icon is-medium is-right" aria-hidden="true">
                  <i class="fas fa-search"></i>
                </span>
              </div>
            </div>
            <div class="column is-one-fifth has-text-right">
              <label for>Per Page</label>
              <div class="select-wrapper">
                <ais-results-per-page-selector
                  :options="[12, 24, 48]"
                  :classNames="{
              'ais-results-per-page-selector': 'form-control'
            }"
                />
              </div>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <ais-stats></ais-stats>
            </div>
          </div>
          <div class="columns">
            <div class="column is-one-fifth">
              <ais-refinement-list
                attribute-name="support"
                :classNames="{
              'ais-refinement-list__count': 'tag',
              'ais-refinement-list__item': 'refinement-list-item'
            }"
              >
                <h3 slot="header">Support</h3>
              </ais-refinement-list>
              <ais-refinement-list
                attribute-name="providesServices"
                :classNames="{
              'ais-refinement-list__count': 'tag',
              'ais-refinement-list__item': 'refinement-list-item'
            }"
              >
                <h3 slot="header">Provides</h3>
              </ais-refinement-list>
              <ais-refinement-list
                attribute-name="tags"
                :classNames="{
              'ais-refinement-list__count': 'tag',
              'ais-refinement-list__item': 'refinement-list-item'
            }"
              >
                <template>
                  <span slot="default">HELLO</span>
                </template>

                <h3 slot="header">Tags</h3>
              </ais-refinement-list>
            </div>
            <div class="column is-four-fifths" style="margin-left:3.4em;">
              <!-- SEARCH RESULTS -->
              <ais-results class="search-results columns is-multiline">
                <template slot-scope="{ result }">
                  <div class="column is-one-third">
                    <div class="column-title">
                      {{result.name}} {{'marple' | capitalize}}
                      <span
                        class="tag is-pulled-right"
                      >{{result.rundeckCompatibility}}</span>
                    </div>
                    <div>{{result.description}}</div>
                    <div>
                      <span>View Plugin Info</span>
                    </div>
                    <div>{{result.support}}</div>
                    <div>Tags:
                      <ul class="tags">
                        <li
                          v-for="(tag, index) in result.tags"
                          :key="index"
                          class="tag is-info"
                        >{{tag | capitalSplit}}</li>
                      </ul>
                    </div>
                  </div>
                </template>
              </ais-results>
              <ais-no-results/>

              <ais-pagination
                class="pagination"
                :classNames="{
              'ais-pagination': 'pagination',
              'ais-pagination__item--active': 'active',
              'ais-pagination__item--disabled': 'disabled'
            }"
                v-on:page-change="onPageChange"
              />
              <!-- // SEARCH RESULTS -->
            </div>
          </div>
        </ais-search-box>
        <div>
          <ais-powered-by/>
        </div>
      </ais-index>
    </div>
  </div>
</template>

<script>
import config from "@/config";

export default {
  name: "RepositoryBrowser",
  components: {
    // RepositorySearch
  },
  data() {
    return {
      repoName: config.repoName,
      repoSrc: config.ossRepoSource
    };
  },
  methods: {
    onPageChange() {
      window.scrollTo(0, 0);
    }
  },
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    capitalSplit: function(value) {
      if (!value) return "";
      return value.split(/(?=[A-Z])/).join(" ");
    }
  }
};
</script>

<style scoped lang="scss">
.search-results {
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
}
</style>
