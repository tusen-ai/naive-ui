<template>
  <n-base-anchor
    v-if="!affix"
    ref="anchor"
    :bound="bound"
    :target="target"
    :ignore-gap="ignoreGap"
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
      :bound="bound"
      :target="target"
      :ignore-gap="ignoreGap"
    >
      <slot />
    </n-base-anchor>
  </n-affix>
</template>

<script>
import NBaseAnchor from './BaseAnchor'
import NAffix from '../../affix'
import usecssr from '../../_mixins/usecssr'
import themeable from '../../_mixins/themeable'
import withapp from '../../_mixins/withapp'
import styles from './styles'

export default {
  name: 'Anchor',
  components: {
    NBaseAnchor,
    NAffix
  },
  mixins: [
    withapp,
    themeable,
    usecssr(styles)
  ],
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
    },
    bound: {
      type: Number,
      default: 12
    },
    ignoreGap: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    scrollTo (href) {
      this.$refs.anchor.setActiveHref(href)
    }
  }
}
</script>
