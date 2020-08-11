/* istanbul ignore file */
import List from './src/List.vue'
import ListItem from './src/ListItem.vue'

List.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + List.name, List)
  Vue.component(naive.componentPrefix + ListItem.name, ListItem)
}

export default List
