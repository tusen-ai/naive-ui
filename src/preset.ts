import * as components from './components'
import create from './create'

const naive = create({
  components: Object.keys(components).map(
    (key) => components[key as keyof typeof components]
  )
})

export default naive
export const install = naive.install
