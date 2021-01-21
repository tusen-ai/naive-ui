import { h, defineComponent, computed, ref, CSSProperties, PropType } from 'vue'
import { NAffix } from '../../affix'
import { useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { anchorLight } from '../styles'
import type { AnchorTheme } from '../styles'
import style from './styles/index.cssr'
import NBaseAnchor from './BaseAnchor'
import type { BaseAnchorRef } from './BaseAnchor'

export interface AnchorRef {
  scrollTo: (href: string) => void
}

export default defineComponent({
  name: 'Anchor',
  props: {
    ...(useTheme.props as ThemeProps<AnchorTheme>),
    top: {
      type: Number,
      default: undefined
    },
    affix: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: undefined
    },
    bottom: {
      type: Number,
      default: undefined
    },
    offsetBottom: {
      type: Number,
      default: undefined
    },
    offsetTop: {
      type: Number,
      default: undefined
    },
    bound: {
      type: Number,
      default: 12
    },
    ignoreGap: {
      type: Boolean,
      default: false
    },
    listenTo: {
      type: [String, Object] as PropType<
      string | (() => HTMLElement) | undefined
      >,
      default: undefined
    },
    // deprecated
    target: {
      type: Function as PropType<(() => HTMLElement) | undefined>,
      validator: () => {
        return true
      },
      default: undefined
    }
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
        listenTo={this.listenTo}
        bound={this.bound}
        target={this.target}
        ignoreGap={this.ignoreGap}
      >
        {this.$slots}
      </NBaseAnchor>
    )
    return !this.affix ? (
      anchorNode
    ) : (
      <NAffix
        listenTo={this.listenTo}
        top={this.top}
        bottom={this.bottom}
        offsetTop={this.offsetTop}
        offsetBottom={this.offsetBottom}
        position={this.position}
        target={this.target}
      >
        {{ default: () => anchorNode }}
      </NAffix>
    )
  }
})
