import { h, defineComponent, computed, type PropType } from 'vue'
import { depx, getGap } from 'seemly'
import { useRtl } from '../../_mixins/use-rtl'
import { createKey, flatten, getSlot } from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { flexLight } from '../styles'
import type { FlexTheme } from '../styles'
import type { FlexAlign, FlexJustify } from './type'

export const flexProps = {
  ...(useTheme.props as ThemeProps<FlexTheme>),
  align: String as PropType<FlexAlign>,
  justify: {
    type: String as PropType<FlexJustify>,
    default: 'start'
  },
  inline: Boolean,
  vertical: Boolean,
  reverse: Boolean,
  size: {
    type: [String, Number, Array] as PropType<
    'small' | 'medium' | 'large' | number | [number, number]
    >,
    default: 'medium'
  },
  wrap: {
    type: Boolean,
    default: true
  }
} as const

export type FlexProps = ExtractPublicPropTypes<typeof flexProps>

export default defineComponent({
  name: 'Flex',
  props: flexProps,
  setup (props) {
    const { mergedClsPrefixRef, mergedRtlRef } = useConfig(props)
    const themeRef = useTheme(
      'Flex',
      '-flex',
      undefined,
      flexLight,
      props,
      mergedClsPrefixRef
    )
    const rtlEnabledRef = useRtl('Flex', mergedRtlRef, mergedClsPrefixRef)
    return {
      rtlEnabled: rtlEnabledRef,
      mergedClsPrefix: mergedClsPrefixRef,
      margin: computed<{ horizontal: number, vertical: number }>(() => {
        const { size } = props
        if (Array.isArray(size)) {
          return {
            horizontal: size[0],
            vertical: size[1]
          }
        }
        if (typeof size === 'number') {
          return {
            horizontal: size,
            vertical: size
          }
        }
        const {
          self: { [createKey('gap', size)]: gap }
        } = themeRef.value
        const { row, col } = getGap(gap)
        return {
          horizontal: depx(col),
          vertical: depx(row)
        }
      })
    }
  },
  render () {
    const {
      vertical,
      reverse,
      align,
      inline,
      justify,
      margin,
      wrap,
      mergedClsPrefix,
      rtlEnabled
    } = this
    const children = flatten(getSlot(this), false)
    if (!children.length) return null
    return (
      <div
        role="none"
        class={[
          `${mergedClsPrefix}-flex`,
          rtlEnabled && `${mergedClsPrefix}-flex--rtl`
        ]}
        style={{
          display: inline ? 'inline-flex' : 'flex',
          flexDirection: (() => {
            if (vertical && !reverse) return 'column'
            if (vertical && reverse) return 'column-reverse'
            if (!vertical && reverse) return 'row-reverse'
            else return 'row'
          })(),
          justifyContent: justify,
          flexWrap: !wrap || vertical ? 'nowrap' : 'wrap',
          alignItems: align,
          gap: `${margin.vertical}px ${margin.horizontal}px`
        }}
      >
        {children}
      </div>
    )
  }
})
