import type { Theme } from '../../_mixins'
import { commonLight } from '../../_styles/common'

const elementLight: Theme<'Element'> = {
  name: 'Element',
  common: commonLight
}

export default elementLight
export type ElementTheme = typeof elementLight
