import { createI18n } from 'vue-i18n'
import ComponentDemo from './utils/ComponentDemo'
import ComponentDemos from './utils/ComponentDemos'
import ComponentDocumentation from './utils/ComponentDocumentation'
import DocumentationWrapper from './utils/DocumentationWrapper'
import EditOnGithubButton from './utils/EditOnGithubButton'
import EditOnGithubHeader from './utils/EditOnGithubHeader'
import './styles/demo.scss'

export function installDemoComponents (app) {
  app.component('ComponentDemo', ComponentDemo)
  app.component('ComponentDemos', ComponentDemos)
  app.component('DocumentationWrapper', DocumentationWrapper)
  app.component('ComponentDocumentation', ComponentDocumentation)
  app.component('EditOnGithubButton', EditOnGithubButton)
  app.component('EditOnGithubHeader', EditOnGithubHeader)
}

export const i18n = createI18n({
  locale: 'zh-CN'
})
