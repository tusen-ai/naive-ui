import LightBar from './src/main.vue'

LightBar.install = function (Vue) {
  Vue.component(LightBar.name, LightBar)
}

export default LightBar
