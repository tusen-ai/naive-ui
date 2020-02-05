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
          round
          size="small"
          @click="handleNegativeClick"
        >
          <render :render="negativeText" />
        </n-button>
        <n-button
          :theme="theme"
          round
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
import NIcon from '../../../common/Icon'
import NButton from '../../../common/Button'
import iosCheckmarkCircle from '../../../icons/ios-checkmark-circle'
import mdClose from '../../../icons/md-close'
import iosHelpCircle from '../../../icons/ios-help-circle'
import iosCloseCircle from '../../../icons/ios-close-circle'
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'
import asthemecontext from '../../../mixins/asthemecontext'
import render from '../../../utils/render'
export default {
  name: 'NConfirm',
  components: {
    NIcon,
    NButton,
    mdClose,
    iosHelpCircle,
    iosCheckmarkCircle,
    iosCloseCircle,
    render
  },
  mixins: [withapp, themeable, asthemecontext],
  props: {
    icon: {
      type: Function,
      default: null
    },
    type: {
      type: String,
      default: 'warning'
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
      default: null
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
        warning: 'ios-help-circle',
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
