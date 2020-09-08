/* istanbul ignore file */
import List from './src/List.vue'
import ListItem from './src/ListItem.vue'

List.install = function (app, naive) {
  app.component(naive.componentPrefix + List.name, List)
  app.component(naive.componentPrefix + ListItem.name, ListItem)
}

export default List
