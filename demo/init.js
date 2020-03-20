import Vue from 'vue'
import VueI18n from 'vue-i18n'
import ComponentDemo from './utils/ComponentDemo'
import ComponentDemos from './utils/ComponentDemos'
import ComponentDocumentation from './utils/ComponentDocumentation'
import DocumentationWrapper from './utils/DocumentationWrapper'
import EditOnGithubButton from './utils/EditOnGithubButton'
import EditOnGithubHeader from './utils/EditOnGithubHeader'
import './styles/demo.scss'

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

export { Vue, i18n }
