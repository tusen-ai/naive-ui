<template>
  <div
    class="n-card"
    :class="{
      'n-card--title-segmented': segmented === true || (segmented && segmented.title),
      'n-card--content-segmented': segmented === true || (segmented && segmented.content),
      'n-card--extra-segmented': segmented === true || (segmented && segmented.extra),
      'n-card--action-segmented': segmented === true || (segmented && segmented.action),
      [`n-card--${size}-size`]: true,
      'n-card--bordered': bordered,
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme
    }"
  >
    <div v-if="$slots.cover" class="n-card-cover">
      <slot name="cover" />
    </div>
    <div v-if="title" class="n-card-title">
      <div class="n-card-title__main">
        {{ title }}
      </div>
      <div v-if="$slots['title-extra']" class="n-card-title__extra">
        <slot name="title-extra" />
      </div>
    </div>
    <div v-else-if="$slots.title" class="n-card__title">
      <slot name="title" />
      <div v-if="$slots['title-extra']" class="n-card-title__extra">
        <slot name="title-extra" />
      </div>
    </div>
    <div class="n-card__content">
      <slot />
    </div>
    <div v-if="$slots.extra" class="n-card__extra">
      <slot name="extra" />
    </div>
    <div v-if="$slots.action" class="n-card__action">
      <slot name="action" />
    </div>
  </div>
</template>

<script>
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'

export default {
  name: 'NCard',
  mixins: [withapp, themeable],
  props: {
    title: {
      type: String,
      required: true
    },
    segmented: {
      type: [Boolean, Object],
      default: false
    },
    size: {
      type: String,
      default: 'medium'
    },
    bordered: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      style: {}
    }
  },
  beforeMount () {
    if (this.width !== undefined) {
      this.style.width = `${this.width}px`
    }
  }
}
</script>
