import { h, computed, defineComponent, inject, renderSlot, PropType } from 'vue'
import { formatLength } from '../../_utils'
import { useStyle } from '../../_mixins'
import type { RowInjection } from './Row'
import style from './styles/index.cssr'

type Span =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | '13'
  | '14'
  | '15'
  | '16'
  | '17'
  | '18'
  | '19'
  | '20'
  | '21'
  | '22'
  | '23'
  | '24'

export default defineComponent({
  name: 'Col',
  props: {
    span: {
      type: [String, Number] as PropType<Span>,
      default: 1
    },
    push: {
      type: [String, Number] as PropType<Span>,
      default: 0
    },
    pull: {
      type: [String, Number] as PropType<Span>,
      default: 0
    },
    offset: {
      type: [String, Number] as PropType<Span>,
      default: 0
    }
  },
  setup (props) {
    useStyle('Grid', style)
    const NRow = inject<RowInjection>('NRow') as RowInjection
    return {
      gutter: computed(() => NRow.gutter),
      stylePadding: computed(
        () =>
          `${formatLength(NRow.verticalGutter, {
            c: 0.5
          })} ${formatLength(NRow.horizontalGutter, { c: 0.5 })}`
      ),
      mergedPush: computed(() => Number(props.push) - Number(props.pull))
    }
  },
  render () {
    const { $slots, span, mergedPush, offset, stylePadding, gutter } = this
    return (
      <div
        class={[
          'n-col',
          {
            [`n-col--${span}-span`]: true,
            [`n-col--${mergedPush}-push`]: mergedPush > 0,
            [`n-col--${-mergedPush}-pull`]: mergedPush < 0,
            [`n-col--${offset}-offset`]: offset
          }
        ]}
        style={{
          padding: stylePadding
        }}
      >
        {gutter ? (
          <div>{renderSlot($slots, 'default')}</div>
        ) : (
          renderSlot($slots, 'default')
        )}
      </div>
    )
  }
})
