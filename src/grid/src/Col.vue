<template>
  <div
    class="n-col"
    :class="{
      [`n-col--${span}-span`]: true,
      [`n-col--${mergedPush}-push`]: mergedPush > 0,
      [`n-col--${-mergedPush}-pull`]: mergedPush < 0,
      [`n-col--${offset}-offset`]: offset
    }"
    :style="{
      padding: stylePadding
    }"
  >
    <div v-if="gutter" class="n-col__box">
      <slot />
    </div>
    <template v-else>
      <slot />
    </template>
  </div>
</template>

<script>
import { computed, defineComponent, inject } from 'vue'
import { formatLength } from '../../_utils'
import { useTheme } from '../../_mixins'
import style from './styles/index.cssr.js'

export default defineComponent({
  name: 'Col',
  props: {
    ...useTheme.props,
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
  setup (props) {
    useTheme('Grid', 'Grid', style, null, null)
    const NRow = inject('NRow')
    return {
      gutter: computed(() => NRow.gutter),
      stylePadding: computed(
        () =>
          `${formatLength(NRow.verticalGutter, {
            c: 0.5
          })} ${formatLength(NRow.horizontalGutter, { c: 0.5 })}`
      ),
      mergedPush: computed(() => props.push - props.pull)
    }
  }
})
</script>
