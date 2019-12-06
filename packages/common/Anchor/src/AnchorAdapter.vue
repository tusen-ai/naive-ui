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
    :position="position"
  >
    <anchor
      :target="target"
    >
      <slot />
    </anchor>
  </n-affix>
</template>

<script>
import Anchor from './Anchor'
import NAffix from '../../Affix'

export default {
  name: 'NAnchor',
  components: {
    Anchor,
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
      type: String,
      default: undefined
    }
  }
}
</script>
