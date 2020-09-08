/* istanbul ignore file */
import ConfigProvider from './src/ConfigProvider.vue'
import installOsProperty from './src/installOsProperty'

ConfigProvider.install = function (app, naive) {
  app.component(naive.componentPrefix + ConfigProvider.name, ConfigProvider)
  app.component(naive.componentPrefix + 'App', ConfigProvider) // deprecated
  installOsProperty(app)
}

export default ConfigProvider
