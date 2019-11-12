import Introduce from './src/main.vue'

Introduce.install = function (Vue) {
  Vue.component(Introduce.name, Introduce)
}

export default Introduce
