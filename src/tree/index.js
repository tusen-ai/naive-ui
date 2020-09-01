/* istanbul ignore file */
import Tree from './src/Tree'

Tree.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + Tree.name, Tree)
}

export default Tree
