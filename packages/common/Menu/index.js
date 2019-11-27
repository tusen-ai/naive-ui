import Menu from './src/main.vue'
import MenuItem from './src/menuItem.vue'
import SubMenu from './src/subMenu.vue'
import ItemGroup from './src/itemGroup.vue'

Menu.install = function (Vue) {
  // Menu.Item = MenuItem
  Vue.component(Menu.name, Menu)
  Vue.component(MenuItem.name, MenuItem)
  Vue.component(SubMenu.name, SubMenu)
  Vue.component(ItemGroup.name, ItemGroup)
}

export default Menu
