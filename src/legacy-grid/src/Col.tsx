import { h, computed, defineComponent, inject, PropType } from 'vue'
import { formatLength, keysOf } from '../../_utils'
import { useStyle } from '../../_mixins'
import type { RowInjection } from './Row'
import style from './styles/index.cssr'
import { Span } from './interface'

export const colProps = {
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
} as const

export const colPropKeys = keysOf(colProps)

export default defineComponent({
  name: 'Col',
  props: colProps,
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
        {gutter ? <div>{$slots}</div> : $slots}
      </div>
    )
  }
})
