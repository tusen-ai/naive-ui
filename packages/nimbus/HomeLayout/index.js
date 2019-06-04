import HomeLayout from './src/main.vue'

HomeLayout.install = function (Vue) {
  Vue.component(HomeLayout.name, HomeLayout)
}

export default HomeLayout
