import WithMargin from './src/main.vue'

WithMargin.install = function (Vue) {
  Vue.component(WithMargin.name, WithMargin)
}

export default WithMargin
