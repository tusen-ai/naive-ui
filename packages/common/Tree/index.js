/* istanbul ignore file */
import Tree from './src/main.js'

Tree.install = function (Vue) {
  Vue.component(Tree.name, Tree)
}

export default Tree
