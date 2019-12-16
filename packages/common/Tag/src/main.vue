<template>
  <div
    class="n-tag"
    :class="{
      [`n-tag--${size}-size`]: true,
      [`n-tag--${type}-type`]: true,
      'n-tag--closable': !checkable && closable,
      'n-tag--disabled': disabled,
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme,
      'n-tag--checkable': checkable,
      'n-tag--checked': checkable && checked,
      'n-tag--round': round
    }"
    :style="synthesizedStyle"
    @click="handleClick"
  >
    <slot />
    <div
      v-if="!checkable && closable"
      class="n-tag__close-mark"
      @click="handleCloseClick"
    >
      <md-close />
    </div>
  </div>
</template>

<script>
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'
import asthemecontext from '../../../mixins/asthemecontext'
import mdClose from '../../../icons/md-close'

export default {
  name: 'NTag',
  components: {
    mdClose
  },
  mixins: [withapp, themeable, asthemecontext],
  model: {
    prop: 'checked',
    event: 'input'
  },
  props: {
    type: {
      validator (value) {
        return ['default', 'success', 'info', 'warning', 'error'].includes(value)
      },
      default: 'default'
    },
    round: {
      type: Boolean,
      default: false
    },
    checked: {
      type: Boolean,
      default: false
    },
    value: {
      validator () {
        return true
      },
      default: undefined
    },
    checkable: {
      type: Boolean,
      default: false
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
      if (!this.disabled) {
        if (this.checkable) {
          this.$emit('change', !this.checked)
          this.$emit('input', !this.checked)
        }
      }
    },
    handleCloseClick (e) {
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
