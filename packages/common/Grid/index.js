/* istanbul ignore file */
import Row from './src/Row.vue'
import Col from './src/Col.vue'

const Grid = {
  install: function (Vue) {
    Vue.component(Row.name, Row)
    Vue.component(Col.name, Col)
  }
}

export default Grid
