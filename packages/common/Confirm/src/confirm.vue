<template>
  <div
    class="n-confirm"
    :class="{
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme,
      'n-confirm--bordered': bordered
    }"
    :style="synthesizedStyle"
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
            <component :is="iconType" />
          </slot>
        </n-icon>
        <slot name="header">
          {{ title }}
        </slot>
      </span>
      <n-icon
        v-if="closable"
        class="n-confirm-title__close-mark"
        type="md-close"
        size="22"
        style="cursor:pointer;"
        @click="handleCloseClick"
      >
        <md-close />
      </n-icon>
    </div>
    <div class="n-confirm__content">
      <slot name="content">
        {{ content }}
      </slot>
    </div>
    <div class="n-confirm__footer">
      <slot name="footer">
        <n-button
          v-if="negativeText"
          :theme="theme"
          style="margin-right:12px;"
          round
          size="small"
          @click="handleNegativeClick"
        >
          {{ negativeText }}
        </n-button>
        <n-button
          :theme="theme"
          round
          :disabled="loading === true"
          :loading="loading"
          size="small"
          type="primary"
          auto-text-color
          @click="handlePositiveClick"
        >
          {{ positiveText }}
        </n-button>
      </slot>
    </div>
  </div>
</template>
<script>
import NIcon from '../../../common/Icon'
import NButton from '../../../common/Button'
import iosCheckmarkCircle from '../../../icons/ios-checkmark-circle'
import mdClose from '../../../icons/md-close'
import iosHelpCircle from '../../../icons/ios-help-circle'
import iosCloseCircle from '../../../icons/ios-close-circle'
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'
import asthemecontext from '../../../mixins/asthemecontext'

export default {
  name: 'NConfirm',
  components: {
    NIcon,
    NButton,
    mdClose,
    iosHelpCircle,
    iosCheckmarkCircle,
    iosCloseCircle
  },
  mixins: [withapp, themeable, asthemecontext],
  props: {
    type: {
      type: String,
      default: 'confirm'
    },
    title: {
      type: String,
      default: 'Confirm'
    },
    closable: {
      type: Boolean,
      default: true
    },
    negativeText: {
      type: String,
      default: 'Cancel'
    },
    positiveText: {
      type: String,
      default: 'Confirm'
    },
    content: {
      type: String,
      default: 'content'
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
    }
  },
  computed: {
    iconType () {
      const colors = {
        error: 'ios-close-circle',
        confirm: 'ios-help-circle',
        success: 'ios-checkmark-circle'
      }
      return colors[this.type]
    }
  },
  methods: {
    handlePositiveClick () {
      this.$emit('positive-click')
    },
    handleNegativeClick () {
      this.$emit('negative-click')
    },
    handleCloseClick () {
      this.$emit('close')
    }
  }
}
</script>
