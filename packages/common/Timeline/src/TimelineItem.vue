<template>
  <div
    class="n-timeline-item"
    :class="{
      [`n-timeline-item--${type}-type`]: type
    }"
  >
    <div class="n-timeline-item-timeline">
      <div class="n-timeline-item-timeline__line" />
      <div class="n-timeline-item-timeline__circle" />
    </div>
    <div class="n-timeline-item-content">
      <div class="n-timeline-item-content__body">
        <slot />
      </div>
      <div class="n-timeline-item-content__meta">
        {{ timestamp }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NTimelineItem',
  props: {
    timestamp: {
      type: [String, Number],
      default: null
    },
    type: {
      validator (type) {
        return ['success', 'error', 'warning', 'info'].includes(type)
      },
      default: null
    }
  }
}
</script>
