import ServiceLayout from './src/ServiceLayout.js'

ServiceLayout.install = function (app) {
  app.component('NNimbusServiceLayout', ServiceLayout)
  app.component(ServiceLayout.name, ServiceLayout)
}

export default ServiceLayout
