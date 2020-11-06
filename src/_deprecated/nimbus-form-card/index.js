import NimbusFormCard from './src/main.vue'

NimbusFormCard.install = function (app) {
  app.component(NimbusFormCard.name, NimbusFormCard)
}

export default NimbusFormCard
