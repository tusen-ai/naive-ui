import { h, defineComponent, computed, ref, CSSProperties } from 'vue'
import { NAffix } from '../../affix'
import { affixProps, affixPropKeys } from '../../affix/src/Affix'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import { keep } from '../../_utils'
import { anchorLight } from '../styles'
import type { AnchorTheme } from '../styles'
import style from './styles/index.cssr'
import NBaseAnchor, { baseAnchorProps, baseAnchorPropKeys } from './BaseAnchor'
import type { BaseAnchorInst } from './BaseAnchor'

export interface AnchorInst {
  scrollTo: (href: string) => void
}

const anchorProps = {
  ...(useTheme.props as ThemeProps<AnchorTheme>),
  affix: {
    type: Boolean,
    default: false
  },
  ...affixProps,
  ...baseAnchorProps
} as const

export type AnchorProps = ExtractPublicPropTypes<typeof anchorProps>

export default defineComponent({
  name: 'Anchor',
  props: anchorProps,
  setup (props, { slots }) {
    const { mergedClsPrefixRef } = useConfig(props)
    const themeRef = useTheme(
      'Anchor',
      'Anchor',
      style,
      anchorLight,
      props,
      mergedClsPrefixRef
    )
    const anchorRef = ref<BaseAnchorInst | null>(null)
    const cssVarsRef = computed(() => {
      const {
        self: {
          railColor,
          linkColor,
          railColorActive,
          linkTextColor,
          linkTextColorHover,
          linkTextColorPressed,
          linkTextColorActive,
          linkFontSize,
          railWidth,
          linkPadding
        },
        common: { cubicBezierEaseInOut }
      } = themeRef.value
      return {
        '--link-color': linkColor,
        '--link-font-size': linkFontSize,
        '--link-text-color': linkTextColor,
        '--link-text-color-hover': linkTextColorHover,
        '--link-text-color-active': linkTextColorActive,
        '--link-text-color-pressed': linkTextColorPressed,
        '--link-padding': linkPadding,
        '--bezier': cubicBezierEaseInOut,
        '--rail-color': railColor,
        '--rail-color-active': railColorActive,
        '--rail-width': railWidth
      }
    })
    return {
      scrollTo (href: string) {
        anchorRef.value?.setActiveHref(href)
      },
      renderAnchor: () => {
        return (
          <NBaseAnchor
            ref={anchorRef}
            style={cssVarsRef.value as CSSProperties}
            {...keep(props, baseAnchorPropKeys)}
            mergedClsPrefix={mergedClsPrefixRef.value}
          >
            {slots}
          </NBaseAnchor>
        )
      }
    }
  },
  render () {
    return !this.affix ? (
      this.renderAnchor()
    ) : (
      <NAffix {...keep(this, affixPropKeys)}>
        {{ default: this.renderAnchor }}
      </NAffix>
    )
  }
})
