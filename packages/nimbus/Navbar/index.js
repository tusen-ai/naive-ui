import Navbar from './src/main.vue'

Navbar.install = function (Vue) {
  Vue.component(Navbar.name, Navbar)
}

export default Navbar
