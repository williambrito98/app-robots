module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: false,
      preload: "src/preload.js",
      builderOptions: {
        extraFiles: [{
          "from": "./robots/",
          "to": "robots"
        },
        {
          "from": "./node_modules/",
          "to": "node_modules"
        }]
      }
    },
  }

}
