/* istanbul ignore file */
import BaseSelectMenu from './src/SelectMenu.vue'
import BaseSelectOption from './src/SelectOption'
import BaseSelectOptionCollector from './src/SelectOptionCollector'
import BaseSelectRenderOptions from './src/SelectRenderOptions'

BaseSelectMenu.install = function (Vue) {
  Vue.component(BaseSelectMenu.name, BaseSelectMenu)
  Vue.component(BaseSelectOption.name, BaseSelectOption)
  Vue.component(BaseSelectOptionCollector.name, BaseSelectOptionCollector)
}

export default BaseSelectMenu
export {
  BaseSelectMenu as NBaseSelectMenu,
  BaseSelectOption as NBaseSelectOption,
  BaseSelectOptionCollector as NBaseSelectOptionCollector,
  BaseSelectRenderOptions as NBaseSelectRenderOptions
}
