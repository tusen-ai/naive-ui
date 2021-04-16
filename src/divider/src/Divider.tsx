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
  dashed: {
    type: Boolean,
    default: false
  },
  vertical: {
    type: Boolean,
    default: false
  }
} as const

export type DividerProps = ExtractPublicPropTypes<typeof dividerProps>

export default defineComponent({
  name: 'Divider',
  props: dividerProps,
  setup (props) {
    const { mergedClsPrefix } = useConfig(props)
    const themeRef = useTheme(
      'Divider',
      'Divider',
      style,
      dividerLight,
      props,
      mergedClsPrefix
    )
    return {
      cPrefix: mergedClsPrefix,
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
    const { $slots, titlePlacement, vertical, dashed, cssVars, cPrefix } = this
    return (
      <div
        class={[
          `${cPrefix}-divider`,
          {
            [`${cPrefix}-divider--vertical`]: vertical,
            [`${cPrefix}-divider--no-title`]: !$slots.default,
            [`${cPrefix}-divider--dashed`]: dashed,
            [`${cPrefix}-divider--title-position-${titlePlacement}`]:
              $slots.default && titlePlacement
          }
        ]}
        style={cssVars as CSSProperties}
      >
        {!vertical ? (
          <hr
            class={`${cPrefix}-divider__line ${cPrefix}-divider__line--left`}
          />
        ) : null}
        {!vertical && $slots.default ? (
          <>
            <div class={`${cPrefix}-divider__title`}>{this.$slots}</div>
            <div
              class={`${cPrefix}-divider__line ${cPrefix}-divider__line--right`}
            />
          </>
        ) : null}
      </div>
    )
  }
})
