import Vue from 'vue'
import VueRouter from 'vue-router'
import VueI18n from 'vue-i18n'
import ComponentDemo from './utils/ComponentDemo'
import ComponentDemos from './utils/ComponentDemos'
import ComponentDocumentation from './utils/ComponentDocumentation'
import DocumentationWrapper from './utils/DocumentationWrapper'
import EditOnGithubButton from './utils/EditOnGithubButton'
import EditOnGithubHeader from './utils/EditOnGithubHeader'
import { routes, childRoutes } from './routes/routes'
import './styles/demo.scss'

Vue.use(VueRouter)
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zh-CN'
})

Vue.component('ComponentDemo', ComponentDemo)
Vue.component('ComponentDemos', ComponentDemos)
Vue.component('DocumentationWrapper', DocumentationWrapper)
Vue.component('ComponentDocumentation', ComponentDocumentation)
Vue.component('EditOnGithubButton', EditOnGithubButton)
Vue.component('EditOnGithubHeader', EditOnGithubHeader)

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach(function (to, from, next) {
  Vue.prototype.$NLoadingBar.theme = to.params.theme
  if (to.path !== from.path) {
    Vue.prototype.$NLoadingBar.start()
  }
  next()
})

router.afterEach(function (to, from) {
  if (to.path !== from.path) {
    Vue.prototype.$NLoadingBar.finish()
  }
})

export { Vue, router, routes, childRoutes, i18n }
