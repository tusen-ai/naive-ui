import NPopover from './src/Popover'

NPopover.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + NPopover.name, NPopover)
}

export default NPopover
