import Tab from './src/main.vue'
import NTabPanel from './src/TabPanel.vue'

Tab.install = function (Vue) {
  Vue.component(Tab.name, Tab)
  Vue.component(NTabPanel.name, NTabPanel)
}

export default Tab
