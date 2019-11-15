<template>
  <div
    class="n-card"
    :class="{
      [`n-card--title${(segmented && segmented.title === 'soft') ? '-soft' : ''}-segmented`]: segmented === true || (segmented && segmented.title),
      [`n-card--content${(segmented && segmented.content === 'soft') ? '-soft' : ''}-segmented`]: segmented === true || (segmented && segmented.content),
      [`n-card--extra${(segmented && segmented.extra === 'soft') ? '-soft' : ''}-segmented`]: segmented === true || (segmented && segmented.extra),
      [`n-card--action${(segmented && segmented.action === 'soft') ? '-soft' : ''}-segmented`]: segmented === true || (segmented && segmented.action),
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
      <n-icon
        class="n-card-title__close-mark"
        type="md-close"
        size="22"
        style="cursor:pointer;"
        @click="handleCloseClick"
      >
        <md-close />
      </n-icon>
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
import mdClose from 'packages/icons/md-close'
import NIcon from 'packages/common/Icon'

export default {
  name: 'NCard',
  components: {
    mdClose,
    NIcon
  },
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
    },
    closable: {
      type: Boolean,
      default: false
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
  },
  methods: {
    handleCloseClick () {
      this.$emit('close')
    }
  }
}
</script>
