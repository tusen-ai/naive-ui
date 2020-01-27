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
      padding: `${ verticalGutter / 2 }px ${ horizontalGutter / 2 }px`
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
export default {
  inject: {
    NRow: {
      gutter: 0
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
    verticalGutter () {
      return this.NRow.verticalGutter
    },
    horizontalGutter () {
      return this.NRow.horizontalGutter
    },
    computedPush () {
      return this.push - this.pull
    }
  }
}
</script>
