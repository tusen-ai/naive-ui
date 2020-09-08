import Card from './src/Card.vue'

Card.install = function (app, naive) {
  app.component(naive.componentPrefix + Card.name, Card)
}

export default Card
