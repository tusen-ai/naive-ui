<template>
  <div
    class="n-timeline-item"
    :class="{
      [`n-timeline-item--${type}-type`]: true
    }"
  >
    <div class="n-timeline-item-timeline">
      <div class="n-timeline-item-timeline__line" />
      <div class="n-timeline-item-timeline__circle" />
    </div>
    <div class="n-timeline-item-content">
      <div v-if="title" class="n-timeline-item-content__title">
        <slot name="header">
          {{ title }}
        </slot>
      </div>
      <div class="n-timeline-item-content__content">
        <slot>
          {{ content }}
        </slot>
      </div>
      <div class="n-timeline-item-content__meta">
        <slot name="footer">
          {{ time }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimelineItem',
  inject: {
    NTimeline: {
      default: null
    }
  },
  props: {
    time: {
      type: [String, Number],
      default: undefined
    },
    title: {
      type: String,
      default: undefined
    },
    content: {
      type: String,
      default: undefined
    },
    type: {
      validator (type) {
        return ['default', 'success', 'error', 'warning', 'info'].includes(type)
      },
      default: 'default'
    }
  },
  computed: {
    mergedTheme () {
      if (this.NTimeline) {
        return this.NTimeline.mergedTheme
      }
      return null
    }
  }
}
</script>
