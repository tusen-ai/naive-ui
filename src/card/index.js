import Card from './src/Card.vue'

Card.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + Card.name, Card)
}

export default Card
