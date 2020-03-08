<template>
  <div
    class="n-card"
    :class="{
      [`n-card--content${(segmented && segmented.content === 'soft') ? '-soft' : ''}-segmented`]: segmented === true || (segmented && segmented.content),
      [`n-card--footer${(segmented && segmented.footer === 'soft') ? '-soft' : ''}-segmented`]: segmented === true || (segmented && segmented.footer),
      [`n-card--action-segmented`]: segmented === true || (segmented && segmented.action),
      [`n-card--${size}-size`]: true,
      'n-card--bordered': bordered,
      [`n-${syntheticTheme}-theme`]: syntheticTheme
    }"
    :style="syntheticStyle"
  >
    <div v-if="$slots.cover" class="n-card-cover">
      <slot name="cover" />
    </div>
    <div v-if="$slots.header || $scopedSlots.header || title || closable" class="n-card-header">
      <div class="n-card-header__main" :style="headerStyle">
        <slot name="header">
          {{ title }}
        </slot>
      </div>
      <div v-if="$slots['header-extra']" class="n-card-header__extra">
        <slot name="header-extra" />
      </div>
      <n-icon
        v-if="closable"
        class="n-card-header__close-mark"
        type="md-close"
        size="22"
        @click="handleCloseClick"
      >
        <md-close />
      </n-icon>
    </div>
    <div class="n-card__content" :style="contentStyle">
      <slot />
    </div>
    <div v-if="$slots.footer" class="n-card__footer">
      <slot name="footer" />
    </div>
    <div v-if="$slots.action" class="n-card__action">
      <slot name="action" />
    </div>
  </div>
</template>

<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import NIcon from '../../Icon'
import mdClose from '../../_icons/md-close'

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
      default: null
    },
    contentStyle: {
      type: [Object, String],
      default: null
    },
    headerStyle: {
      type: [Object, String],
      default: null
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
  methods: {
    handleCloseClick () {
      this.$emit('close')
    }
  }
}
</script>
