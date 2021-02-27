import { h, defineComponent, computed, ref, CSSProperties } from 'vue'
import { NAffix } from '../../affix'
import { affixProps, affixPropKeys } from '../../affix/src/Affix'
import { useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { keep } from '../../_utils'
import { anchorLight } from '../styles'
import type { AnchorTheme } from '../styles'
import style from './styles/index.cssr'
import NBaseAnchor, { baseAnchorProps, baseAnchorPropKeys } from './BaseAnchor'
import type { BaseAnchorRef } from './BaseAnchor'

export interface AnchorRef {
  scrollTo: (href: string) => void
}

export default defineComponent({
  name: 'Anchor',
  props: {
    ...(useTheme.props as ThemeProps<AnchorTheme>),
    affix: {
      type: Boolean,
      default: false
    },
    ...affixProps,
    ...baseAnchorProps
  },
  setup (props) {
    const themeRef = useTheme('Anchor', 'Anchor', style, anchorLight, props)
    const anchorRef = ref<BaseAnchorRef | null>(null)
    return {
      anchorRef,
      scrollTo (href: string) {
        anchorRef.value?.setActiveHref(href)
      },
      mergedTheme: themeRef,
      cssVars: computed(() => {
        const {
          self: {
            railColor,
            linkColor,
            railColorActive,
            linkTextColor,
            linkTextColorHover,
            linkTextColorPressed,
            linkTextColorActive,
            linkFontSize
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
          '--bezier': cubicBezierEaseInOut,
          '--rail-color': railColor,
          '--rail-color-active': railColorActive
        }
      })
    }
  },
  render () {
    const anchorNode = (
      <NBaseAnchor
        ref="anchorRef"
        style={this.cssVars as CSSProperties}
        {...keep(this, baseAnchorPropKeys)}
      >
        {this.$slots}
      </NBaseAnchor>
    )
    return !this.affix ? (
      anchorNode
    ) : (
      <NAffix {...keep(this, affixPropKeys)}>
        {{ default: () => anchorNode }}
      </NAffix>
    )
  }
})
