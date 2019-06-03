import Home from './src/main.vue'

Home.install = function (Vue) {
  Vue.component(Home.name, Home)
}

export default Home