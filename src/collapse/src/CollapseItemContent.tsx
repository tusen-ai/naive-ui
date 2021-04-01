import { h, withDirectives, vShow, defineComponent, toRef } from 'vue'
import { useFalseUntilTruthy } from 'vooks'
import { NFadeInExpandTransition } from '../../_internal'

export default defineComponent({
  name: 'CollapseItemContent',
  props: ['displayDirective', 'show'],
  setup (props) {
    const onceTrueRef = useFalseUntilTruthy(toRef(props, 'show'))
    return {
      onceTrue: onceTrueRef
    }
  },
  render () {
    return (
      <NFadeInExpandTransition>
        {{
          default: () => {
            const { show, displayDirective, onceTrue } = this
            const useVShow = displayDirective === 'show' && onceTrue
            const contentNode = (
              <div class="n-collapse-item__content-wrapper">
                <div class="n-collapse-item__content-inner">{this.$slots}</div>
              </div>
            )
            return useVShow
              ? withDirectives(contentNode, [[vShow, show]])
              : show
                ? contentNode
                : null
          }
        }}
      </NFadeInExpandTransition>
    )
  }
})
