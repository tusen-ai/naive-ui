import NPopover from './src/Popover'

NPopover.install = function (app, naive) {
  app.component(naive.componentPrefix + NPopover.name, NPopover)
}

export default NPopover
