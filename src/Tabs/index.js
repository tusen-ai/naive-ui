import Tab from './src/Tabs.vue'
import NTabPane from './src/TabPane.vue'

Tab.install = function (Vue) {
  Vue.component(Tab.name, Tab)
  Vue.component(NTabPane.name, NTabPane)
  Vue.component('NTabPanel', NTabPane)
}

export default Tab
