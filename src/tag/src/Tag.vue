<template>
  <div
    class="n-tag"
    :class="{
      [`n-tag--${size}-size`]: true,
      [`n-tag--${type}-type`]: true,
      'n-tag--closable': !checkable && closable,
      'n-tag--disabled': disabled,
      [`n-${mergedTheme}-theme`]: mergedTheme,
      'n-tag--checkable': checkable,
      'n-tag--checked': checkable && checked,
      'n-tag--round': round
    }"
    :style="mergedStyle"
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
import { warn } from '../../_utils/naive/warn'

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
    onClose: {
      type: Function,
      default: undefined
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:checked': {
      type: Function,
      default: undefined
    },
    // private
    stopClickPropagation: {
      type: Boolean,
      default: false
    },
    // deprecated
    onCheckedChange: {
      validator () {
        if (__DEV__) warn('tag', '`on-checked-change` is deprecated, please use `on-update:checked` instead')
        return true
      },
      default: undefined
    }
  },
  methods: {
    handleClick (e) {
      if (!this.disabled) {
        if (this.checkable) {
          const {
            checked,
            onCheckedChange,
            'onUpdate:checked': onUpdateChecked
          } = this
          if (onUpdateChecked) onUpdateChecked(!checked)
          // deprecated
          if (onCheckedChange) onCheckedChange(!checked)
        }
      }
    },
    handleCloseClick (e) {
      if (this.stopClickPropagation) {
        e.stopPropagation()
      }
      if (!this.disabled) {
        const { onClose } = this
        if (onClose) onClose()
      }
    }
  }
}
</script>
