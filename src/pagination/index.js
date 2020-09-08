import Pagination from './src/Pagination.vue'

Pagination.install = function (app, naive) {
  app.component(naive.componentPrefix + Pagination.name, Pagination)
}

export default Pagination
