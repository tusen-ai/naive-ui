import SideMenu from './src/main.vue'

SideMenu.install = function (Vue) {
  Vue.component(SideMenu.name, SideMenu)
}

export default SideMenu
