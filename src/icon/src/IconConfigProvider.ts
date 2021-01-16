// private
import {
  provide,
  defineComponent,
  openBlock,
  renderSlot,
  createBlock
} from 'vue'
import commonProps from './common-props'
import type { IconConfigProviderInjection } from './icon'

export default defineComponent({
  name: 'IconConfigProvider',
  props: commonProps,
  setup (props) {
    provide<IconConfigProviderInjection>('NIconConfigProvider', props)
  },
  render () {
    return (
      openBlock(),
      createBlock('div', null, [renderSlot(this.$slots, 'default')])
    )
  }
})
