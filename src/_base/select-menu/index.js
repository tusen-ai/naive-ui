/* istanbul ignore file */
import BaseSelectMenu from './src/SelectMenu.vue'
import BaseSelectOption from './src/SelectOption.vue'

BaseSelectMenu.install = function (Vue) {
  Vue.component(BaseSelectMenu.name, BaseSelectMenu)
  Vue.component(BaseSelectOption.name, BaseSelectOption)
}

export default BaseSelectMenu
