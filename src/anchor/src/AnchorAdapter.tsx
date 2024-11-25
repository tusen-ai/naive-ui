import type { ThemeProps } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import type { AnchorTheme } from '../styles'
import type { BaseAnchorInst } from './BaseAnchor'
import { computed, type CSSProperties, defineComponent, h, ref } from 'vue'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import { keep } from '../../_utils'
import { NAffix } from '../../affix'
import { affixPropKeys, affixProps } from '../../affix/src/Affix'
import { anchorLight } from '../styles'
import NBaseAnchor, { baseAnchorPropKeys, baseAnchorProps } from './BaseAnchor'
import style from './styles/index.cssr'

export interface AnchorInst {
  scrollTo: (href: string) => void
}

export const anchorProps = {
  ...(useTheme.props as ThemeProps<AnchorTheme>),
  affix: Boolean,
  ...affixProps,
  ...baseAnchorProps
} as const

export type AnchorProps = ExtractPublicPropTypes<typeof anchorProps>

export default defineComponent({
  name: 'Anchor',
  props: anchorProps,
  setup(props, { slots }) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const themeRef = useTheme(
      'Anchor',
      '-anchor',
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
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('anchor', undefined, cssVarsRef, props)
      : undefined
    return {
      scrollTo(href: string) {
        anchorRef.value?.setActiveHref(href)
      },
      renderAnchor: () => {
        themeClassHandle?.onRender()
        return (
          <NBaseAnchor
            ref={anchorRef}
            style={
              inlineThemeDisabled
                ? undefined
                : (cssVarsRef.value as CSSProperties)
            }
            class={themeClassHandle?.themeClass.value}
            {...keep(props, baseAnchorPropKeys)}
            mergedClsPrefix={mergedClsPrefixRef.value}
          >
            {slots}
          </NBaseAnchor>
        )
      }
    }
  },
  render() {
    return !this.affix ? (
      this.renderAnchor()
    ) : (
      <NAffix {...keep(this, affixPropKeys)}>
        {{ default: this.renderAnchor }}
      </NAffix>
    )
  }
})
