import ComponentDemo from './utils/ComponentDemo.vue'
import ComponentDemos from './utils/ComponentDemos'
import Contributors from './utils/Contributors.vue'
import EditOnGithubHeader from './utils/EditOnGithubHeader.vue'
import './styles/demo.css'
import 'vfonts/Inter.css'
import 'vfonts/FiraCode.css'
import 'katex/dist/katex.css'

export function installDemoComponents(app) {
  app.component('ComponentDemo', ComponentDemo)
  app.component('ComponentDemos', ComponentDemos)
  app.component('EditOnGithubHeader', EditOnGithubHeader)
  app.component('Contributors', Contributors)
}
