import { createTheme } from '../../_mixins'
import { commonLight } from '../../_styles/common'

const mermaidLight = createTheme({
  name: 'Mermaid',
  common: commonLight
})

export default mermaidLight
export type MermaidTheme = typeof mermaidLight
