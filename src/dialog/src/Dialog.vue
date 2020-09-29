<template>
  <div
    class="n-confirm"
    :class="{
      [`n-${syntheticTheme}-theme`]: syntheticTheme,
      'n-confirm--bordered': bordered
    }"
    :style="syntheticStyle"
  >
    <div class="n-confirm-title">
      <span class="n-confirm-title-content">
        <n-icon
          v-if="showIcon"
          class="n-confirm-title-icon"
          :class="{
            [`n-confirm-title-icon--${type}-type`]: type
          }"
          size="28"
        >
          <slot name="icon">
            <render v-if="icon" :render="icon" />
            <component :is="iconType" v-else />
          </slot>
        </n-icon>
        <slot name="header">
          <render :render="title" />
        </slot>
      </span>
      <n-icon
        v-if="closable"
        class="n-confirm-title__close"
        size="22"
        style="cursor:pointer;"
        @click="handleCloseClick"
      >
        <close-icon />
      </n-icon>
    </div>
    <div class="n-confirm__content">
      <slot>
        <render :render="content" />
      </slot>
    </div>
    <div class="n-confirm__footer">
      <slot name="action">
        <n-button
          v-if="negativeText"
          :theme="theme"
          style="margin-right:12px;"
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
          type="primary"
          @click="handlePositiveClick"
        >
          <render :render="positiveText" />
        </n-button>
      </slot>
    </div>
  </div>
</template>

<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import { render } from '../../_utils/vue'
import usecssr from '../../_mixins/usecssr'
import NIcon from '../../icon'
import NButton from '../../button'
import SuccessIcon from '../../_icons/ios-checkmark-circle.vue'
import CloseIcon from '../../_icons/md-close.vue'
import WarningIcon from '../../_icons/ios-help-circle.vue'
import ErrorIcon from '../../_icons/ios-close-circle.vue'
import styles from './styles/index.js'

export default {
  name: 'Dialog',
  components: {
    NIcon,
    NButton,
    CloseIcon,
    WarningIcon,
    SuccessIcon,
    ErrorIcon,
    render
  },
  mixins: [
    withapp,
    themeable,
    usecssr(styles)
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
    iconType () {
      const iconName = {
        error: 'error-icon',
        warning: 'warning-icon',
        success: 'success-icon'
      }
      return iconName[this.type]
    }
  },
  methods: {
    handlePositiveClick () {
      const { onPositiveClick } = this
      if (onPositiveClick) onPositiveClick()
    },
    handleNegativeClick () {
      const { onNegativeClick } = this
      if (onNegativeClick) onNegativeClick()
    },
    handleCloseClick () {
      const { onClose } = this
      if (onClose) onClose()
    }
  }
}
</script>
