import Tab from './src/Tabs.vue'
import TabPane from './src/TabPane.vue'

Tab.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + Tab.name, Tab)
  Vue.component(naive.componentPrefix + TabPane.name, TabPane)
  Vue.component('NTabPanel', TabPane)
}

export default Tab
