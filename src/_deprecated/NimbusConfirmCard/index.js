import NimbusConfirmCard from './src/main.vue'

NimbusConfirmCard.install = function (app) {
  app.component(NimbusConfirmCard.name, NimbusConfirmCard)
}

export default NimbusConfirmCard
