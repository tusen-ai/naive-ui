<template>
  <anchor
    v-if="!affix"
    :target="target"
  >
    <slot />
  </anchor>
  <n-affix
    v-else
    :target="target"
    :top="top"
    :bottom="bottom"
    :offset-top="offsetTop"
    :offset-bottom="offsetBottom"
    :position="position"
  >
    <n-anchor
      :target="target"
    >
      <slot />
    </n-anchor>
  </n-affix>
</template>

<script>
import NAnchor from './Anchor'
import NAffix from '../../Affix'

export default {
  name: 'NAnchor',
  components: {
    NAnchor,
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
  }
}
</script>
