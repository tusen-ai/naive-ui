import Scaffold from './src/main.vue'

Scaffold.install = function (Vue) {
  Vue.component(Scaffold.name, Scaffold)
}

export default Scaffold
