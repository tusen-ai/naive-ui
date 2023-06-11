import { h, computed, defineComponent, inject, type PropType } from 'vue'
import {
  type ExtractPublicPropTypes,
  formatLength,
  keysOf,
  throwError
} from '../../_utils'
import { rowInjectionKey } from './Row'
import type { Span } from './interface'

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

export type ColProps = ExtractPublicPropTypes<typeof colProps>

export default defineComponent({
  name: 'Col',
  props: colProps,
  setup (props) {
    const NRow = inject(rowInjectionKey, null)
    if (!NRow) throwError('col', '`n-col` must be placed inside `n-row`.')
    return {
      mergedClsPrefix: NRow.mergedClsPrefixRef,
      gutter: NRow.gutterRef,
      stylePadding: computed(
        () =>
          `${formatLength(NRow.verticalGutterRef.value, {
            c: 0.5
          })} ${formatLength(NRow.horizontalGutterRef.value, { c: 0.5 })}`
      ),
      mergedPush: computed(() => Number(props.push) - Number(props.pull))
    }
  },
  render () {
    const {
      $slots,
      span,
      mergedPush,
      offset,
      stylePadding,
      gutter,
      mergedClsPrefix
    } = this
    return (
      <div
        class={[
          `${mergedClsPrefix}-col`,
          {
            [`${mergedClsPrefix}-col--${span}-span`]: true,
            [`${mergedClsPrefix}-col--${mergedPush}-push`]: mergedPush > 0,
            [`${mergedClsPrefix}-col--${-mergedPush}-pull`]: mergedPush < 0,
            [`${mergedClsPrefix}-col--${offset}-offset`]: offset
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
