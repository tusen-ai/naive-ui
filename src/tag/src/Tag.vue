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
      <close-icon />
    </div>
  </div>
</template>

<script>
import CloseIcon from '../../_icons/md-close.vue'
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import usecssr from '../../_mixins/usecssr'
import commonProps from './common-props'
import styles from './styles'

export default {
  name: 'Tag',
  components: {
    CloseIcon
  },
  mixins: [
    withapp,
    themeable,
    usecssr(styles)
  ],
  model: {
    prop: 'checked',
    event: 'checked-change'
  },
  props: {
    ...commonProps,
    checked: {
      type: Boolean,
      default: false
    },
    checkable: {
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
