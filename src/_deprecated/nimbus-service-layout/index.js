import ServiceLayout from './src/ServiceLayout.js'

ServiceLayout.install = function (app, naive) {
  app.component('NNimbusServiceLayout', ServiceLayout)
  app.component(naive.componentPrefix + ServiceLayout.name, ServiceLayout)
}

export default ServiceLayout
