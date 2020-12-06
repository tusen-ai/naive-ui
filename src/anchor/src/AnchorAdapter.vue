<template>
  <n-base-anchor
    v-if="!affix"
    ref="anchor"
    :theme="theme"
    :listen-to="listenTo"
    :bound="bound"
    :target="target"
    :ignore-gap="ignoreGap"
  >
    <slot />
  </n-base-anchor>
  <n-affix
    v-else
    :listen-to="listenTo"
    :top="top"
    :bottom="bottom"
    :offset-top="offsetTop"
    :offset-bottom="offsetBottom"
    :position="position"
    :target="target"
  >
    <n-base-anchor
      ref="anchor"
      :theme="theme"
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
import NBaseAnchor from './BaseAnchor.vue'
import { NAffix } from '../../affix'
import { themeable } from '../../_mixins'

export default {
  name: 'Anchor',
  components: {
    NBaseAnchor,
    NAffix
  },
  mixins: [
    themeable
  ],
  props: {
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
  methods: {
    scrollTo (href) {
      this.$refs.anchor.setActiveHref(href)
    }
  }
}
</script>
