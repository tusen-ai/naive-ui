/* istanbul ignore file */
import BasePortal from './src/main.js'

BasePortal.install = function (Vue) {
  Vue.component(BasePortal.name, BasePortal)
}

export default BasePortal
