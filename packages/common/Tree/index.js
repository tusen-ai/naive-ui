/* istanbul ignore file */
import Tree from './src/Tree'

Tree.install = function (Vue) {
  Vue.component(Tree.name, Tree)
}

export default Tree
