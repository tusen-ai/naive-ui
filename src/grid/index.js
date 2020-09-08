/* istanbul ignore file */
import Row from './src/Row.vue'
import Col from './src/Col.vue'

const Grid = {
  install: function (app, naive) {
    app.component(naive.componentPrefix + Row.name, Row)
    app.component(naive.componentPrefix + Col.name, Col)
  }
}

export default Grid
