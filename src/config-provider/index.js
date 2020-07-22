/* istanbul ignore file */
import ConfigProvider from './src/ConfigProvider.vue'
import installOsProperty from './src/installOsProperty'

ConfigProvider.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + ConfigProvider.name, ConfigProvider)
  Vue.component(naive.componentPrefix + 'App', ConfigProvider) // deprecated
  installOsProperty(Vue)
}

export default ConfigProvider
