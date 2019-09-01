/* istanbul ignore file */
import BaseContext from './src/main.js'

BaseContext.install = function (Vue) {
  Vue.component(BaseContext.name, BaseContext)
}

export default BaseContext
