<template>
  <n-base-anchor
    v-if="!affix"
    ref="anchor"
    :target="target"
  >
    <slot />
  </n-base-anchor>
  <n-affix
    v-else
    :target="target"
    :top="top"
    :bottom="bottom"
    :offset-top="offsetTop"
    :offset-bottom="offsetBottom"
    :position="position"
  >
    <n-base-anchor
      ref="anchor"
      :target="target"
    >
      <slot />
    </n-base-anchor>
  </n-affix>
</template>

<script>
import NBaseAnchor from './BaseAnchor'
import NAffix from '../../Affix'

export default {
  name: 'NAnchor',
  components: {
    NBaseAnchor,
    NAffix
  },
  props: {
    top: {
      type: Number,
      default: null
    },
    target: {
      type: Function,
      default: null
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
    }
  },
  methods: {
    scrollTo (href) {
      this.$refs.anchor.setActiveHref(href)
    }
  }
}
</script>
