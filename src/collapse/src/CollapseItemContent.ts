import {
  h,
  withDirectives,
  vShow,
  defineComponent,
  DirectiveArguments
} from 'vue'
import { NFadeInExpandTransition } from '../../_internal'

export default defineComponent({
  name: 'NCollapseItemContent',
  props: {
    displayDirective: {
      validator () {
        // already validated outside
        return true
      },
      required: true
    },
    show: {
      validator () {
        // already validated outside
        return true
      },
      required: true
    }
  },
  render () {
    const { show, displayDirective } = this
    const useVShow = displayDirective === 'show'
    const directives: DirectiveArguments = useVShow ? [[vShow, show]] : []
    return h(NFadeInExpandTransition, null, {
      default: () =>
        useVShow || show
          ? withDirectives(
            h(
              'div',
              {
                class: 'n-collapse-item__content-wrapper'
              },
              [
                h(
                  'div',
                  {
                    class: 'n-collapse-item__content-inner'
                  },
                  this.$slots
                )
              ]
            ),
            directives
          )
          : null
    })
  }
})
