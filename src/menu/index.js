import Menu from './src/MenuAdapter.vue'
import MenuItem from './src/MenuItem.vue'
import Submenu from './src/Submenu.vue'
import MenuItemGroup from './src/MenuItemGroup.vue'

Menu.install = function (app, naive) {
  app.component(naive.componentPrefix + Menu.name, Menu)
  // just keep them
  // they shouldn't be removed since vue can't resolve those components by
  // local register
  app.component(MenuItem.name, MenuItem)
  app.component(Submenu.name, Submenu)
  app.component(MenuItemGroup.name, MenuItemGroup)
}

export default Menu
