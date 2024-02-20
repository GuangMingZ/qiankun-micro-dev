const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 3002,
    headers: { "Access-Control-Allow-Origin": "*" }
  }
});
