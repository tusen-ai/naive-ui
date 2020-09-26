/* istanbul ignore file */
import ConfigProvider from './src/ConfigProvider.js'

ConfigProvider.install = function (app, naive) {
  app.component(naive.componentPrefix + ConfigProvider.name, ConfigProvider)
  app.component(naive.componentPrefix + 'App', ConfigProvider) // deprecated
}

export default ConfigProvider
