import Pagination from './src/main.vue'

Pagination.install = function (Vue) {
  Vue.component(Pagination.name, Pagination)
}

export default Pagination
