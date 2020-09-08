import Tab from './src/Tabs.vue'
import TabPane from './src/TabPane.vue'

Tab.install = function (app, naive) {
  app.component(naive.componentPrefix + Tab.name, Tab)
  app.component(naive.componentPrefix + TabPane.name, TabPane)
  app.component(naive.componentPrefix + 'TabPanel', TabPane)
}

export default Tab
