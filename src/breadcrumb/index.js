/* istanbul ignore file */
import Breadcrumb from './src/Breadcrumb.vue'
import BreadcrumbItem from './src/BreadcrumbItem.vue'

Breadcrumb.install = function (app, naive) {
  app.component(naive.componentPrefix + Breadcrumb.name, Breadcrumb)
  app.component(naive.componentPrefix + BreadcrumbItem.name, BreadcrumbItem)
}

export default Breadcrumb
