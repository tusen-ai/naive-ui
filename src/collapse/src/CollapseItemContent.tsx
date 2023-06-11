import {
  h,
  withDirectives,
  vShow,
  defineComponent,
  toRef,
  type PropType
} from 'vue'
import { useFalseUntilTruthy } from 'vooks'
import { NFadeInExpandTransition } from '../../_internal'

export default defineComponent({
  name: 'CollapseItemContent',
  props: {
    displayDirective: {
      type: String as PropType<'if' | 'show'>,
      required: true
    },
    show: Boolean,
    clsPrefix: {
      type: String,
      required: true
    }
  },
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
            const { show, displayDirective, onceTrue, clsPrefix } = this
            const useVShow = displayDirective === 'show' && onceTrue
            const contentNode = (
              <div class={`${clsPrefix}-collapse-item__content-wrapper`}>
                <div class={`${clsPrefix}-collapse-item__content-inner`}>
                  {this.$slots}
                </div>
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
