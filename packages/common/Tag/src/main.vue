<template>
  <div
    class="n-tag"
    :class="{
      [`n-tag--${size}-size`]: true,
      [`n-tag--${type}-type`]: true,
      'n-tag--closable': closable,
      'n-tag--disabled': disabled,
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme
    }"
  >
    <slot />
    <div
      v-if="closable"
      class="n-tag__close-mark"
      @click="handleClick"
    >
      <close-icon />
    </div>
  </div>
</template>

<script>
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'
import CloseIcon from './CloseIcon'

export default {
  name: 'NTag',
  components: {
    CloseIcon
  },
  mixins: [withapp, themeable],
  props: {
    type: {
      validator (value) {
        return ['default', 'success', 'info', 'warning', 'error'].includes(value)
      },
      default: 'default'
    },
    size: {
      validator (value) {
        return ['small', 'medium', 'large'].includes(value)
      },
      default: 'medium'
    },
    closable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    stopClickPropagation: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick (e) {
      if (this.stopClickPropagation) {
        e.stopPropagation()
      }
      if (!this.disabled) {
        this.$emit('close', e)
      }
    }
  }
}
</script>
