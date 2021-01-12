import * as components from './components'
import { enUS, zhCN } from './locales'

// deprecated
import { NServiceLayout } from './_deprecated/nimbus-service-layout/index'
import styleScheme from './_deprecated/style-scheme'

import create from './create'

export default create({
  components: [
    ...Object.keys(components).map((key) => components[key]),
    // Deprecated
    NServiceLayout
  ],
  // deprecated
  locales: [enUS, zhCN],
  styleSchemes: styleScheme
})
