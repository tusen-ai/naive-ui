// private
import { provide, defineComponent } from 'vue'
import commonProps from './common-props'
import type { IconConfigProviderInjection } from './icon'

export default defineComponent({
  name: 'IconConfigProvider',
  props: commonProps,
  setup (props) {
    provide<IconConfigProviderInjection>('NIconConfigProvider', props)
  },
  render () {
    return this.$slots.default?.()
  }
})
