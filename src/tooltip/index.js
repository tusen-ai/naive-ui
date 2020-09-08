import Tooltip from './src/main.js'

Tooltip.install = function (app, naive) {
  app.component(naive.componentPrefix + Tooltip.name, Tooltip)
}

export default Tooltip
