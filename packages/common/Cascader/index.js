/* istanbul ignore file */
import Cascader from './src/main.vue'

Cascader.install = function (Vue) {
  console.log('register', Cascader.name)
  Vue.component(Cascader.name, Cascader)
}

export default Cascader
