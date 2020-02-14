import Loader from './src/main.vue'

Loader.install = function (Vue) {
  Vue.component(Loader.name, Loader)
}

export default Loader
