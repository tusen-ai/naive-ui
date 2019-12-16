/* istanbul ignore file */
import ConfigProvider from './src/main.vue'

ConfigProvider.install = function (Vue) {
  Vue.component(ConfigProvider.name, ConfigProvider)
  Vue.component('NApp', ConfigProvider)
}

export default ConfigProvider
