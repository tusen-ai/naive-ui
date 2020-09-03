<template>
  <div
    class="n-timeline-item"
    :class="{
      [`n-timeline-item--${type}-type`]: true
    }"
  >
    <div class="n-timeline-item-timeline">
      <div class="n-timeline-item-timeline__line" />
      <div
        class="n-timeline-item-timeline__circle"
        :style="{
          backgroundColor: ascendantBackgroundColor
        }"
      />
    </div>
    <div class="n-timeline-item-content">
      <div
        v-if="title"
        class="n-timeline-item-content__title"
      >
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
import hollowoutable from '../../_mixins/hollowoutable'

export default {
  inject: {
    NTimeline: {
      default: null
    }
  },
  name: 'TimelineItem',
  mixins: [ hollowoutable ],
  props: {
    time: {
      type: [String, Number],
      default: null
    },
    title: {
      type: String,
      default: null
    },
    content: {
      type: String,
      default: null
    },
    type: {
      validator (type) {
        return ['default', 'success', 'error', 'warning', 'info'].includes(type)
      },
      default: 'default'
    }
  },
  computed: {
    syntheticTheme () {
      if (this.NTimeline) {
        return this.NTimeline.syntheticTheme
      }
      return null
    }
  }
}
</script>
