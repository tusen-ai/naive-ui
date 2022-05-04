import { tooltipLight } from '../../tooltip/styles'
import { createTheme } from '../../_mixins'
import { commonLight } from '../../_styles/common'

function self () {
  return {
    toolbarIconColor: 'rgba(255, 255, 255, .9)',
    toolbarColor: 'rgba(0, 0, 0, .35)',
    toolbarBoxShadow: 'none',
    toolbarBorderRadius: '24px'
  }
}
export const imageLight = createTheme({
  name: 'Image',
  common: commonLight,
  peers: {
    Tooltip: tooltipLight
  },
  self
})

export type ImageTheme = typeof imageLight
export type ImageThemeVars = ReturnType<typeof self>
