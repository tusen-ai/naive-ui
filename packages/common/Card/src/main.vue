<template>
  <div
    class="n-card"
    :class="{
      [`n-card--title${(segmented && segmented.header === 'soft') ? '-soft' : ''}-segmented`]: segmented === true || (segmented && segmented.header),
      [`n-card--content${(segmented && segmented.content === 'soft') ? '-soft' : ''}-segmented`]: segmented === true || (segmented && segmented.content),
      [`n-card--extra${(segmented && segmented.footer === 'soft') ? '-soft' : ''}-segmented`]: segmented === true || (segmented && segmented.footer),
      [`n-card--action${(segmented && segmented.action === 'soft') ? '-soft' : ''}-segmented`]: segmented === true || (segmented && segmented.action),
      [`n-card--${size}-size`]: true,
      'n-card--bordered': bordered,
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme
    }"
  >
    <div v-if="$slots.cover" class="n-card-cover">
      <slot name="cover" />
    </div>
    <div class="n-card-title">
      <div class="n-card-title__main">
        <slot name="header">
          {{ title }}
        </slot>
      </div>
      <div v-if="$slots['header-extra']" class="n-card-title__extra">
        <slot name="header-extra" />
      </div>
      <n-icon
        v-if="closable"
        class="n-card-title__close-mark"
        type="md-close"
        size="22"
        @click="handleCloseClick"
      >
        <md-close />
      </n-icon>
    </div>
    <div class="n-card__content">
      <slot />
    </div>
    <div v-if="$slots.footer" class="n-card__extra">
      <slot name="footer" />
    </div>
    <div v-if="$slots.action" class="n-card__action">
      <slot name="action" />
    </div>
  </div>
</template>

<script>
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'
import mdClose from '../../../icons/md-close'
import NIcon from '../../../common/Icon'

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
