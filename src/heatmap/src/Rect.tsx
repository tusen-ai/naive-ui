import type { ExtractPublicPropTypes } from '../../_utils'
import type { RectData } from './interface'
import { format } from 'date-fns'
import { computed, defineComponent, h, type PropType } from 'vue'
import Tooltip from '../../tooltip/src/Tooltip'

export const rectProps = {
  mergedClsPrefix: {
    type: String,
    required: true
  },
  data: {
    type: Object as PropType<RectData>,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  style: Object
} as const

export type RectProps = ExtractPublicPropTypes<typeof rectProps>

export default defineComponent({
  name: 'Rect',
  props: rectProps,
  setup(props) {
    const cssVarsRef = computed(() => {
      return {
        '--n-rect-color': props.color
      }
    })

    return {
      cssVars: cssVarsRef
    }
  },
  render() {
    const { data, mergedClsPrefix, unit, style, cssVars } = this
    return (
      <Tooltip trigger="hover">
        {{
          default: () =>
            `${data.value} ${unit} on ${format(data.date, 'yyyy-MM-dd')}`,
          trigger: () => (
            <div
              class={`${mergedClsPrefix}-heatmap-rect`}
              style={{
                ...cssVars,
                ...style
              }}
            />
          )
        }}
      </Tooltip>
    )
  }
})
