import * as components from './components'
// deprecated
import { NServiceLayout } from './_deprecated/service-layout/index'

import create from './create'

export default create({
  components: [
    ...Object.keys(components).map(
      (key) => components[key as keyof typeof components]
    ),
    // Deprecated
    NServiceLayout
  ]
})
