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
  }
} as const

export type RectProps = ExtractPublicPropTypes<typeof rectProps>

export default defineComponent({
  name: 'heatmap',
  props: rectProps,
  setup() {},
  render() {
    const { data, mergedClsPrefix, color, unit } = this
    return (
      <span>
        <Tooltip trigger="hover">
          {{
            default: () =>
              `${data?.value} ${unit} on ${format(data!.date, 'yyy-MM-dd')}`,
            trigger: () => (
              <div
                class={`${mergedClsPrefix}-heatmap__rect`}
                style={{
                  backgroundColor: color
                }}
              />
            )
          }}
        </Tooltip>
      </span>
    )
  }
})
