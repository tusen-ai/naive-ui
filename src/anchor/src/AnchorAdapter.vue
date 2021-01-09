<template>
  <n-base-anchor
    v-if="!affix"
    ref="anchorRef"
    :style="cssVars"
    :listen-to="listenTo"
    :bound="bound"
    :target="target"
    :ignore-gap="ignoreGap"
  >
    <slot />
  </n-base-anchor>
  <n-affix
    v-else
    :unstable-theme="mergedTheme.peers.Affix"
    :unstable-theme-overrides="mergedTheme.overrides.Affix"
    :listen-to="listenTo"
    :top="top"
    :bottom="bottom"
    :offset-top="offsetTop"
    :offset-bottom="offsetBottom"
    :position="position"
    :target="target"
  >
    <n-base-anchor
      ref="anchorRef"
      :style="cssVars"
      :bound="bound"
      :listen-to="listenTo"
      :ignore-gap="ignoreGap"
      :target="target"
    >
      <slot />
    </n-base-anchor>
  </n-affix>
</template>

<script>
import { defineComponent, computed, ref } from 'vue'
import { NAffix } from '../../affix'
import { useTheme } from '../../_mixins'
import { anchorLight } from '../styles'
import style from './styles/index.cssr'
import NBaseAnchor from './BaseAnchor.vue'

export default defineComponent({
  name: 'Anchor',
  components: {
    NBaseAnchor,
    NAffix
  },
  props: {
    ...useTheme.props,
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
      type: [String, Object],
      default: undefined
    },
    // deprecated
    target: {
      validator () {
        return true
      },
      default: undefined
    }
  },
  setup (props) {
    const themeRef = useTheme('Anchor', 'Anchor', style, anchorLight, props)
    const anchorRef = ref(null)
    return {
      anchorRef,
      scrollTo (href) {
        anchorRef.value.setActiveHref(href)
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
  }
})
</script>
