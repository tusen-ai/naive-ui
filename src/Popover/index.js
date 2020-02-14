import NPopover from './src/main'

NPopover.install = function (Vue) {
  Vue.component(NPopover.name, NPopover)
}

export default NPopover
