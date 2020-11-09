<template>
  <div
    class="n-card"
    :class="{
      [`n-card--content${(segmented && segmented.content === 'soft') ? '-soft' : ''}-segmented`]: segmented === true || (segmented && segmented.content),
      [`n-card--footer${(segmented && segmented.footer === 'soft') ? '-soft' : ''}-segmented`]: segmented === true || (segmented && segmented.footer),
      [`n-card--action-segmented`]: segmented === true || (segmented && segmented.action),
      [`n-card--${size}-size`]: true,
      'n-card--bordered': bordered,
      [`n-${mergedTheme}-theme`]: mergedTheme
    }"
    :style="mergedStyle"
  >
    <div v-if="$slots.cover" class="n-card-cover">
      <slot name="cover" />
    </div>
    <div v-if="$slots.header || title || closable" class="n-card-header">
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
        size="16"
        @click="handleCloseClick"
      >
        <close-icon />
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
import {
  configurable,
  themeable,
  withCssr
} from '../../_mixins'
import NIcon from '../../icon'
import {
  CloseIcon
} from '../../_base/icons'
import styles from './styles'

export default {
  name: 'Card',
  components: {
    CloseIcon,
    NIcon
  },
  mixins: [
    configurable,
    themeable,
    withCssr(styles)
  ],
  props: {
    title: {
      type: String,
      default: undefined
    },
    contentStyle: {
      type: [Object, String],
      default: undefined
    },
    headerStyle: {
      type: [Object, String],
      default: undefined
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
    },
    onClose: {
      type: Function,
      default: undefined
    }
  },
  methods: {
    handleCloseClick () {
      const { onClose } = this
      if (onClose) onClose()
    }
  }
}
</script>
