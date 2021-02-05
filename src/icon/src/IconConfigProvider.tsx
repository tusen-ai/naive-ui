// private
import { h, provide, defineComponent } from 'vue'
import commonProps from './common-props'
import type { IconConfigProviderInjection } from './Icon'

export default defineComponent({
  name: 'IconConfigProvider',
  props: commonProps,
  setup (props) {
    provide<IconConfigProviderInjection>('NIconConfigProvider', props)
  },
  render () {
    return <div>{this.$slots}</div>
  }
})
