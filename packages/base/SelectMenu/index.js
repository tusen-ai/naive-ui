/* istanbul ignore file */
import BaseSelectMenu from './src/main.vue'
import BaseSelectOption from './src/SelectOption'
import BaseSelectOptionCollector from './src/SelectOptionCollector'
import BaseSelectRenderOptions from './src/SelectRenderOptions'

BaseSelectMenu.install = function (Vue) {
  Vue.component(BaseSelectMenu.name, BaseSelectMenu)
  Vue.component(BaseSelectOption.name, BaseSelectOption)
  Vue.component('NSelectOption', BaseSelectOption)
  Vue.component(BaseSelectOptionCollector.name, BaseSelectOptionCollector)
}

export default BaseSelectMenu
export {
  BaseSelectMenu as NBaseSelectMenu,
  BaseSelectOption as NBaseSelectOption,
  BaseSelectOptionCollector as NBaseSelectOptionCollector,
  BaseSelectRenderOptions as NBaseSelectRenderOptions
}
