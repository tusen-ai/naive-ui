/* istanbul ignore file */
import Grid from './src/main.vue'
import Col from './src/Col.vue'

Grid.install = function (Vue) {
  Vue.component(Grid.name, Grid)
  Vue.component(Col.name, Col)
}

export default Grid
