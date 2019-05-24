import Icon from './src/main.vue'

Icon.install = function (Vue) {
  Vue.component(Icon.name, Icon)
}

export default Icon