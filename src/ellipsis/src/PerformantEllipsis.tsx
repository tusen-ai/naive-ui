import { h, defineComponent, ref, mergeProps } from 'vue'
import { useMergedClsPrefix } from '../../_mixins/use-config'
import { useStyle } from '../../_mixins'
import Ellipsis, {
  createCursorClass,
  createLineClampClass,
  ellipsisProps
} from './Ellipsis'
import style from './styles/index.cssr'

export const NPerformantEllipsis = defineComponent({
  name: 'PerformantEllipsis',
  props: ellipsisProps,
  inheritAttrs: false,
  setup (props, { attrs, slots }) {
    const mouseEnteredRef = ref(false)
    const mergedClsPrefixRef = useMergedClsPrefix()
    useStyle('-ellipsis', style, mergedClsPrefixRef)
    // Modified from Ellipsis.tsx
    const renderTrigger = (): JSX.Element => {
      const { lineClamp } = props
      const mergedClsPrefix = mergedClsPrefixRef.value
      return (
        <span
          {...mergeProps(attrs, {
            class: [
              `${mergedClsPrefix}-ellipsis`,
              lineClamp !== undefined
                ? createLineClampClass(mergedClsPrefix)
                : undefined,
              props.expandTrigger === 'click'
                ? createCursorClass(mergedClsPrefix, 'pointer')
                : undefined
            ],
            style:
              lineClamp === undefined
                ? {
                    textOverflow: 'ellipsis'
                  }
                : {
                    '-webkit-line-clamp': lineClamp
                  }
          })}
          onMouseenter={() => {
            mouseEnteredRef.value = true
          }}
        >
          {lineClamp ? slots : <span>{slots}</span>}
        </span>
      )
    }
    return {
      mouseEntered: mouseEnteredRef,
      renderTrigger
    }
  },
  render () {
    if (this.mouseEntered) {
      return h(Ellipsis, mergeProps({}, this.$attrs, this.$props), this.$slots)
    } else {
      return this.renderTrigger()
    }
  }
})
