import Menu from './src/MenuAdapter.vue'
import MenuItem from './src/MenuItem.vue'
import Submenu from './src/Submenu.vue'
import MenuItemGroup from './src/MenuItemGroup.vue'

Menu.install = function (Vue) {
  Vue.component(Menu.name, Menu)
  Vue.component(MenuItem.name, MenuItem)
  Vue.component(Submenu.name, Submenu)
  Vue.component(MenuItemGroup.name, MenuItemGroup)
}

export default Menu
