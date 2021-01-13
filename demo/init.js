import ComponentDemo from './utils/ComponentDemo.vue'
import ComponentDemos from './utils/ComponentDemos.js'
import ComponentDocumentation from './utils/ComponentDocumentation.vue'
import DocumentationWrapper from './utils/DocumentationWrapper.js'
import EditOnGithubButton from './utils/EditOnGithubButton.vue'
import EditOnGithubHeader from './utils/EditOnGithubHeader.vue'
import './styles/demo.css'
import 'vfonts/Inter.css'
import 'vfonts/FiraCode.css'

export function installDemoComponents (app) {
  app.component('ComponentDemo', ComponentDemo)
  app.component('ComponentDemos', ComponentDemos)
  app.component('DocumentationWrapper', DocumentationWrapper)
  app.component('ComponentDocumentation', ComponentDocumentation)
  app.component('EditOnGithubButton', EditOnGithubButton)
  app.component('EditOnGithubHeader', EditOnGithubHeader)
}
