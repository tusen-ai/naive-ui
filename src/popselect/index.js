/* istanbul ignore file */
import Popselect from './src/Popselect.js'

Popselect.install = function (app, naive) {
  app.component(naive.componentPrefix + Popselect.name, Popselect)
}

export default Popselect
