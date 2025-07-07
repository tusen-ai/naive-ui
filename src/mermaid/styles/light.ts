import { createTheme } from '../../_mixins'
import { commonLight } from '../../_styles/common'

export function self() {
  return {}
}

const mermaidLight = createTheme({
  name: 'Mermaid',
  common: commonLight,
  self
})

export default mermaidLight
export type MermaidTheme = typeof mermaidLight
