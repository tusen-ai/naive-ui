import Switch from './src/Switch.vue'

Switch.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + 'Switch', Switch)
}

export default Switch
