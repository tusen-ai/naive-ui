/* istanbul ignore file */
import List from './src/main.vue'
import ListItem from './src/ListItem.vue'

List.install = function (Vue) {
  Vue.component(List.name, List)
  Vue.component(ListItem.name, ListItem)
}

export default List
