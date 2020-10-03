/* istanbul ignore file */
import Dropdown from './src/Dropdown.js'

Dropdown.install = function (app, naive) {
  app.component(naive.componentPrefix + Dropdown.name, Dropdown)
}

export default Dropdown
