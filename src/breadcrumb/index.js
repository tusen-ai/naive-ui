/* istanbul ignore file */
import Breadcrumb from './src/Breadcrumb.vue'
import BreadcrumbItem from './src/BreadcrumbItem.vue'

Breadcrumb.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + Breadcrumb.name, Breadcrumb)
  Vue.component(naive.componentPrefix + BreadcrumbItem.name, BreadcrumbItem)
}

export default Breadcrumb
