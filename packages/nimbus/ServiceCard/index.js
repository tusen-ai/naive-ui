import ServiceCard from './src/main.vue'

ServiceCard.install = function (Vue) {
  Vue.component(ServiceCard.name, ServiceCard)
}

export default ServiceCard
