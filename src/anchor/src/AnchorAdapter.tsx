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
  affix: Boolean,
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
          linkPadding,
          borderRadius
        },
        common: { cubicBezierEaseInOut }
      } = themeRef.value
      return {
        '--n-link-border-radius': borderRadius,
        '--n-link-color': linkColor,
        '--n-link-font-size': linkFontSize,
        '--n-link-text-color': linkTextColor,
        '--n-link-text-color-hover': linkTextColorHover,
        '--n-link-text-color-active': linkTextColorActive,
        '--n-link-text-color-pressed': linkTextColorPressed,
        '--n-link-padding': linkPadding,
        '--n-bezier': cubicBezierEaseInOut,
        '--n-rail-color': railColor,
        '--n-rail-color-active': railColorActive,
        '--n-rail-width': railWidth
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
