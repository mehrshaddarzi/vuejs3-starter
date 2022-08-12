const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  css: {
    loaderOptions: {
      css: {
        modules: {
          auto: () => true,
          // @see https://github.com/webpack-contrib/css-loader#localidentname
          localIdentName: '[local]',
          exportLocalsConvention: "camelCaseOnly"
        }
      }
    }
  },
  transpileDependencies: true,
  lintOnSave: false
})
