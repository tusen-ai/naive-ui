import Switch from './src/Switch.vue'

Switch.install = function (app, naive) {
  app.component(naive.componentPrefix + 'Switch', Switch)
}

export default Switch
