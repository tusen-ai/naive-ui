<template>
  <div
    class="n-dialog"
    :class="{
      [`n-${mergedTheme}-theme`]: mergedTheme,
      'n-dialog--bordered': bordered,
      [`n-dialog--icon-${mergedIconPlacement}`]: true,
      [`n-dialog--${type}-type`]: type
    }"
    :style="mergedStyle"
  >
    <n-icon
      v-if="closable"
      class="n-dialog__close"
      @click="handleCloseClick"
    >
      <close-icon />
    </n-icon>
    <div
      v-if="showIcon && mergedIconPlacement === 'top'"
      class="n-dialog-icon-container"
    >
      <n-icon
        class="n-dialog__icon"
      >
        <slot name="icon">
          <render v-if="icon" :render="icon" />
          <component :is="iconType" v-else />
        </slot>
      </n-icon>
    </div>
    <div class="n-dialog__title">
      <n-icon
        v-if="showIcon && mergedIconPlacement === 'left'"
        class="n-dialog__icon"
      >
        <slot name="icon">
          <render v-if="icon" :render="icon" />
          <component :is="iconType" v-else />
        </slot>
      </n-icon>
      <slot name="header">
        <render :render="title" />
      </slot>
    </div>
    <div class="n-dialog__content">
      <slot>
        <render :render="content" />
      </slot>
    </div>
    <div class="n-dialog__action">
      <slot name="action">
        <n-button
          v-if="negativeText"
          :theme="theme"
          ghost
          size="small"
          @click="handleNegativeClick"
        >
          <render :render="negativeText" />
        </n-button>
        <n-button
          :theme="theme"
          :disabled="loading === true"
          :loading="loading"
          size="small"
          :type="type"
          @click="handlePositiveClick"
        >
          <render :render="positiveText" />
        </n-button>
      </slot>
    </div>
  </div>
</template>

<script>
import {
  configurable,
  themeable,
  withCssr
} from '../../_mixins'
import { render } from '../../_utils'
import { NIcon } from '../../icon'
import { NButton } from '../../button'
import {
  InfoIcon,
  SuccessIcon,
  CloseIcon,
  WarningIcon,
  ErrorIcon
} from '../../_base/icons'
import styles from './styles/index.js'

export default {
  name: 'Dialog',
  alias: [
    'NimbusConfirmCard', // deprecated
    'Confirm' // deprecated
  ],
  components: {
    NIcon,
    NButton,
    CloseIcon,
    WarningIcon,
    SuccessIcon,
    ErrorIcon,
    InfoIcon,
    render
  },
  mixins: [
    configurable,
    themeable,
    withCssr(styles)
  ],
  props: {
    icon: {
      type: Function,
      default: undefined
    },
    type: {
      type: String,
      default: 'warning'
    },
    title: {
      type: [String, Function],
      default: undefined
    },
    closable: {
      type: Boolean,
      default: true
    },
    negativeText: {
      type: String,
      default: undefined
    },
    positiveText: {
      type: String,
      default: undefined
    },
    content: {
      type: [String, Function],
      default: undefined
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    },
    iconPlacement: {
      type: String,
      default: 'left'
    },
    onPositiveClick: {
      type: Function,
      default: undefined
    },
    onNegativeClick: {
      type: Function,
      default: undefined
    },
    onClose: {
      type: Function,
      default: undefined
    }
  },
  computed: {
    mergedIconPlacement () {
      return this.$naive?.unstableConfig?.Confirm?.iconPlacement || this.iconPlacement
    },
    iconType () {
      return {
        error: 'error-icon',
        warning: 'warning-icon',
        success: 'success-icon',
        info: 'info-icon'
      }[this.type]
    }
  },
  methods: {
    handlePositiveClick (e) {
      const { onPositiveClick } = this
      if (onPositiveClick) onPositiveClick(e)
    },
    handleNegativeClick (e) {
      const { onNegativeClick } = this
      if (onNegativeClick) onNegativeClick(e)
    },
    handleCloseClick () {
      const { onClose } = this
      if (onClose) onClose()
    }
  }
}
</script>
