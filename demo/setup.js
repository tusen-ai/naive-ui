import ComponentDemo from './utils/ComponentDemo.vue'
import ComponentDemos from './utils/ComponentDemos'
import CopyDocActions from './utils/CopyDocActions.vue'
import DocHeader from './utils/DocHeader.vue'
import './styles/demo.css'
import 'vfonts/Inter.css'
import 'vfonts/FiraCode.css'
import 'katex/dist/katex.css'

export function installDemoComponents(app) {
  app.component('ComponentDemo', ComponentDemo)
  app.component('ComponentDemos', ComponentDemos)
  app.component('CopyDocActions', CopyDocActions)
  app.component('DocHeader', DocHeader)
}
