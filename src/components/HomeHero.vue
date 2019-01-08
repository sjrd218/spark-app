<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">Plugins</h1>
        <h2 class="subtitle">
          Curated list of plugins that either extend Rundeck or enable other tools to integrate with Rundeck. Want to have your plugin on this list?
          <a
            href="http://rundeck.org/plugins/guide.html"
            target="_blank"
          >See this how-to</a>.
        </h2>
        <div class="columns has-text-centered">
          <div class="column">
            <img src="https://www.rundeck.com/hubfs/assets/images/icons/icon-visualization.svg" alt>
            <h3 class="column-title">Community</h3>
            <p>Created, maintained, and supported by independent Rundeck community members and can be used in any edition of Rundeck.</p>
          </div>
          <div class="column">
            <img
              src="https://www.rundeck.com/hubfs/assets/images/icons/icon-access-rule-management.svg"
              alt
            >
            <h3 class="column-title">Rundeck Supported</h3>
            <p>Support for these plugins is included with a Rundeck Enterprise subscription.</p>
          </div>
          <div class="column">
            <img src="https://www.rundeck.com/hubfs/assets/images/icons/icon-plugins.svg" alt>
            <h3 class="column-title">Enterprise Exclusive</h3>
            <p>These are created and supported by Rundeck, Inc. for the exclusive user of Rundeck Enterprise subscribers.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.hero {
  background-color: #f3f3f3;
}
.title {
  margin: 1em 0 0;
  color: #333;
  font-size: 3.0625em;
  font-weight: 700;
  line-height: 1.32653;
  &:not(.is-spaced) + .subtitle {
    margin-top: -0.25rem;
  }
}
.subtitle {
  font-weight: 300;
  font-size: 1.5em;
  line-height: 1.45833;
  letter-spacing: -0.02083em;
  color: #999;
  a {
    color: #f97975;
    text-decoration: underline;
    &:hover {
      text-decoration: none;
    }
  }
}
.columns {
  margin-top: 2em;
  img {
    text-align: center;
  }
}
.column-title {
  font-weight: 700;
  margin-bottom: 0.76923em;
  color: #333;
  font-size: 1.625em;
  line-height: 1.23077;
}
</style>
