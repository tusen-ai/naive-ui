<template>
  <div
    class="n-col"
    :class="{
      [`n-col--${span}-span`]: true,
      [`n-col--${computedPush}-push`]: computedPush > 0,
      [`n-col--${-computedPush}-pull`]: computedPush < 0,
      [`n-col--${offset}-offset`]: offset
    }"
    :style="{
      padding: stylePadding
    }"
  >
    <div
      v-if="gutter"
      class="n-col__box"
    >
      <slot />
    </div>
    <template v-else>
      <slot />
    </template>
  </div>
</template>

<script>
import formatLength from '../../_utils/css/formatLength'

export default {
  inject: {
    NRow: {
      default: null
    }
  },
  name: 'NCol',
  props: {
    span: {
      type: [String, Number],
      default: 1
    },
    push: {
      type: [String, Number],
      default: 0
    },
    pull: {
      type: [String, Number],
      default: 0
    },
    offset: {
      type: [String, Number],
      default: 0
    }
  },
  computed: {
    gutter () {
      return this.NRow.gutter
    },
    stylePadding () {
      return `${formatLength(this.NRow.verticalGutter, 0.5)} ${formatLength(this.NRow.horizontalGutter, 0.5)}`
    },
    computedPush () {
      return this.push - this.pull
    }
  }
}
</script>
