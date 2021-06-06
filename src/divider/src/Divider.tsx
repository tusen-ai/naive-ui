import {
  h,
  computed,
  defineComponent,
  CSSProperties,
  PropType,
  Fragment
} from 'vue'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import { dividerLight } from '../styles'
import type { DividerTheme } from '../styles'
import style from './styles/index.cssr'

const dividerProps = {
  ...(useTheme.props as ThemeProps<DividerTheme>),
  titlePlacement: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'center'
  },
  dashed: Boolean,
  vertical: Boolean
} as const

export type DividerProps = ExtractPublicPropTypes<typeof dividerProps>

export default defineComponent({
  name: 'Divider',
  props: dividerProps,
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)
    const themeRef = useTheme(
      'Divider',
      'Divider',
      style,
      dividerLight,
      props,
      mergedClsPrefixRef
    )
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: computed(() => {
        const {
          common: { cubicBezierEaseInOut },
          self: { color, textColor, fontWeight }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--color': color,
          '--text-color': textColor,
          '--font-weight': fontWeight
        }
      })
    }
  },
  render () {
    const {
      $slots,
      titlePlacement,
      vertical,
      dashed,
      cssVars,
      mergedClsPrefix
    } = this
    return (
      <div
        role="separator"
        class={[
          `${mergedClsPrefix}-divider`,
          {
            [`${mergedClsPrefix}-divider--vertical`]: vertical,
            [`${mergedClsPrefix}-divider--no-title`]: !$slots.default,
            [`${mergedClsPrefix}-divider--dashed`]: dashed,
            [`${mergedClsPrefix}-divider--title-position-${titlePlacement}`]:
              $slots.default && titlePlacement
          }
        ]}
        style={cssVars as CSSProperties}
      >
        {!vertical ? (
          <div
            class={`${mergedClsPrefix}-divider__line ${mergedClsPrefix}-divider__line--left`}
          />
        ) : null}
        {!vertical && $slots.default ? (
          <>
            <div class={`${mergedClsPrefix}-divider__title`}>{this.$slots}</div>
            <div
              class={`${mergedClsPrefix}-divider__line ${mergedClsPrefix}-divider__line--right`}
            />
          </>
        ) : null}
      </div>
    )
  }
})
