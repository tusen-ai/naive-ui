/* istanbul ignore file */
import Breadcrumb from './src/main.vue'
import BreadcrumbItem from './src/BreadcrumbItem.vue'

Breadcrumb.install = function (Vue) {
  Vue.component(Breadcrumb.name, Breadcrumb)
  Vue.component(BreadcrumbItem.name, BreadcrumbItem)
}

export default Breadcrumb
