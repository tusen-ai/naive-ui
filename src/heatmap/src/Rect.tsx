import type { ExtractPublicPropTypes } from '../../_utils'
import type { RectData } from './interface'
import { format } from 'date-fns'
import { defineComponent, h, type PropType } from 'vue'
import Tooltip from '../../tooltip/src/Tooltip'

export const rectProps = {
  mergedClsPrefix: {
    type: String,
    required: true
  },
  data: Object as PropType<RectData>,
  color: String,
  unit: {
    type: String,
    require: true
  },
  style: Object
} as const

export type RectProps = ExtractPublicPropTypes<typeof rectProps>

export default defineComponent({
  name: 'Rect',
  props: rectProps,
  setup() {},
  render() {
    const { data, mergedClsPrefix, color, unit, style } = this
    return (
      <Tooltip trigger="hover">
        {{
          default: () =>
            `${data!.value} ${unit} on ${format(data!.date, 'yyyy-MM-dd')}`,
          trigger: () => (
            <div
              class={`${mergedClsPrefix}-heatmap__rect`}
              style={{
                backgroundColor: color,
                ...style
              }}
            />
          )
        }}
      </Tooltip>
    )
  }
})
