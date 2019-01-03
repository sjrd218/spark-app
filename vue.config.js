module.exports = {
  // baseUrl: '/static.dev.spark.rundeck.com/',
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/scss/_typography.scss";
          @import "@/scss/_app.scss";
        `
      }
    }
  }
}
