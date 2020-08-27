/* istanbul ignore file */
import Row from './src/Row.vue'
import Col from './src/Col.vue'

const Grid = {
  install: function (Vue, naive) {
    Vue.component(naive.componentPrefix + Row.name, Row)
    Vue.component(naive.componentPrefix + Col.name, Col)
  }
}

export default Grid
