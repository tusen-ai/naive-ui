import {
  defineComponent,
  h,
  InjectionKey,
  PropType,
  provide,
  Ref,
  toRef
} from 'vue'
import { useMemo } from 'vooks'
import type { ExtractPublicPropTypes } from '../../_utils'
import { formatLength, keysOf } from '../../_utils'
import { useConfig, useStyle } from '../../_mixins'
import style from './styles/index.cssr'

export interface RowInjection {
  gutterRef: Ref<string | number | [number, number]>
  verticalGutterRef: Ref<number>
  horizontalGutterRef: Ref<number>
  cPrefixRef: Ref<string>
}

export const rowInjectionKey: InjectionKey<RowInjection> = Symbol('row')

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
    const { mergedClsPrefix } = useConfig(props)
    useStyle('LegacyGrid', style, mergedClsPrefix)
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
      cPrefixRef: mergedClsPrefix,
      gutterRef: toRef(props, 'gutter'),
      verticalGutterRef: verticalGutterRef,
      horizontalGutterRef: horizontalGutterRef
    })
    return {
      cPrefix: mergedClsPrefix,
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
        class={`${this.cPrefix}-row`}
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
