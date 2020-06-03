/* istanbul ignore file */
import ConfigProvider from './src/main.vue'
import installOsProperty from './src/installOsProperty'

ConfigProvider.install = function (Vue) {
  Vue.component(ConfigProvider.name, ConfigProvider)
  Vue.component('NApp', ConfigProvider)
  installOsProperty(Vue)
}

export default ConfigProvider
