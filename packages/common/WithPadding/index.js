import WithPadding from './src/main.vue'

WithPadding.install = function (Vue) {
  Vue.component(WithPadding.name, WithPadding)
}

export default WithPadding
