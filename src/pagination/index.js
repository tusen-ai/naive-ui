import Pagination from './src/Pagination.vue'

Pagination.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + Pagination.name, Pagination)
}

export default Pagination
