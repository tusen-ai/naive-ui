import Menu from './src/MenuAdapter.vue'
import MenuItem from './src/MenuItem.vue'
import Submenu from './src/Submenu.vue'
import MenuItemGroup from './src/MenuItemGroup.vue'

Menu.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + Menu.name, Menu)
  // just keep them
  // they shouldn't be removed since vue can't resolve those components by
  // local register
  Vue.component(MenuItem.name, MenuItem)
  Vue.component(Submenu.name, Submenu)
  Vue.component(MenuItemGroup.name, MenuItemGroup)
}

export default Menu
