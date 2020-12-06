import * as components from './components'
import * as styles from './styles'
import {
  enUS,
  zhCN
} from './locales'

// deprecated
import { NServiceLayout } from './_deprecated/nimbus-service-layout/index'
import styleScheme from './_deprecated/style-scheme'

import create from './create'

export default create({
  locales: [enUS, zhCN],
  components: [
    ...Object.keys(components).map(key => components[key]),
    // Deprecated
    NServiceLayout
  ],
  styles: Object.keys(styles).map(key => styles[key]),
  // deprecated
  styleSchemes: styleScheme
})
