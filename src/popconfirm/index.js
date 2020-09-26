/* istanbul ignore file */
import Popconfirm from './src/Popconfirm'

Popconfirm.install = function (app, naive) {
  app.component(naive.componentPrefix + Popconfirm.name, Popconfirm)
}

export default Popconfirm
