/* istanbul ignore file */
import BaseSelectMenu from './src/main.vue'

BaseSelectMenu.install = function (Vue) {
  Vue.component(BaseSelectMenu.name, BaseSelectMenu)
}

export default BaseSelectMenu
