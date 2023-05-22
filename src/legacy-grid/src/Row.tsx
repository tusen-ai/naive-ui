import {
  defineComponent,
  h,
  type PropType,
  provide,
  type Ref,
  toRef
} from 'vue'
import { useMemo } from 'vooks'
import {
  createInjectionKey,
  type ExtractPublicPropTypes,
  formatLength,
  keysOf
} from '../../_utils'
import { useConfig, useStyle, useRtl } from '../../_mixins'
import style from './styles/index.cssr'

export interface RowInjection {
  gutterRef: Ref<string | number | [number, number]>
  verticalGutterRef: Ref<number>
  horizontalGutterRef: Ref<number>
  mergedClsPrefixRef: Ref<string>
}

export const rowInjectionKey = createInjectionKey<RowInjection>('n-row')

export const rowProps = {
  gutter: {
    type: [Array, Number, String] as PropType<
    string | number | [number, number]
    >,
    default: 0
  },
  alignItems: String,
  justifyContent: String
} as const

export const rowPropKeys = keysOf(rowProps)

export type RowProps = ExtractPublicPropTypes<typeof rowProps>

export default defineComponent({
  name: 'Row',
  props: rowProps,
  setup (props) {
    const { mergedClsPrefixRef, mergedRtlRef } = useConfig(props)
    useStyle('-legacy-grid', style, mergedClsPrefixRef)
    const rtlEnabledRef = useRtl('Row', mergedRtlRef, mergedClsPrefixRef)
    const verticalGutterRef = useMemo(() => {
      const { gutter } = props
      if (Array.isArray(gutter)) {
        return gutter[1] || 0
      }
      return 0
    })
    const horizontalGutterRef = useMemo(() => {
      const { gutter } = props
      if (Array.isArray(gutter)) {
        return gutter[0]
      }
      return Number(gutter)
    })
    provide(rowInjectionKey, {
      mergedClsPrefixRef,
      gutterRef: toRef(props, 'gutter'),
      verticalGutterRef,
      horizontalGutterRef
    })
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      rtlEnabled: rtlEnabledRef,
      styleMargin: useMemo(
        () =>
          `-${formatLength(verticalGutterRef.value, {
            c: 0.5
          })} -${formatLength(horizontalGutterRef.value, { c: 0.5 })}`
      ),
      styleWidth: useMemo(
        () => `calc(100% + ${formatLength(horizontalGutterRef.value)})`
      )
    }
  },
  render () {
    return (
      <div
        class={[
          `${this.mergedClsPrefix}-row`,
          this.rtlEnabled && `${this.mergedClsPrefix}-row--rtl`
        ]}
        style={{
          margin: this.styleMargin,
          width: this.styleWidth,
          alignItems: this.alignItems,
          justifyContent: this.justifyContent
        }}
      >
        {this.$slots}
      </div>
    )
  }
})
