/* istanbul ignore file */
import Tree from './src/Tree'

Tree.install = function (app, naive) {
  app.component(naive.componentPrefix + Tree.name, Tree)
}

export default Tree
