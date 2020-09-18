import { h, withDirectives, vShow } from 'vue'
import NFadeInHeightExpandTransition from '../../_transition/FadeInHeightExpandTransition'

export default {
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
    const directives = useVShow ? [
      [vShow, show]
    ] : []
    return h(NFadeInHeightExpandTransition, null, {
      default: () => (useVShow || show) ? withDirectives(
        h('div', {
          class: 'n-collapse-item__content-wrapper'
        }, [
          h('div', {
            class: 'n-collapse-item__content-inner'
          }, {
            ...this.$slots
          })
        ]),
        directives
      ) : null
    })
  }
}
