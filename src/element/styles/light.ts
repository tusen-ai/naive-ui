import { Theme } from '../../_mixins'
import { commonLight } from '../../_styles/new-common'

const elementLight: Theme = {
  name: 'Element',
  common: commonLight
}

export default elementLight
export type ElementTheme = typeof elementLight
