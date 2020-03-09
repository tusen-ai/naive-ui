<template>
  <div
    class="n-tag"
    :class="{
      [`n-tag--${size}-size`]: true,
      [`n-tag--${type}-type`]: true,
      'n-tag--closable': !checkable && closable,
      'n-tag--disabled': disabled,
      [`n-${syntheticTheme}-theme`]: syntheticTheme,
      'n-tag--checkable': checkable,
      'n-tag--checked': checkable && checked,
      'n-tag--round': round
    }"
    :style="syntheticStyle"
    @click="handleClick"
  >
    <slot />
    <div
      v-if="!checkable && closable"
      class="n-tag__close"
      @click="handleCloseClick"
    >
      <md-close />
    </div>
  </div>
</template>

<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import mdClose from '../../_icons/md-close.vue'

export default {
  name: 'NTag',
  components: {
    mdClose
  },
  mixins: [withapp, themeable],
  model: {
    prop: 'checked',
    event: 'checked-change'
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
          this.$emit('checked-change', !this.checked)
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
