<template>
  <div
    class="n-confirm"
    :class="{
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme
    }"
  >
    <div class="n-confirm-title">
      <span class="n-confirm-title-content">
        <n-icon
          class="n-confirm-title-icon"
          :class="{
            [`n-confirm-title-icon--${type}-type`]: type
          }"
          size="28"
        >
          <component :is="iconType.type" />
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
          v-if="type === 'confirm'"
          :theme="synthesizedTheme"
          style="margin-right:12px;"
          round
          size="small"
          @click="handleNegativeClick"
        >
          {{ cancelText }}
        </n-button>
        <n-button
          :theme="synthesizedTheme"
          round
          :disabled="loading === true"
          :loading="loading"
          size="small"
          type="primary"
          auto-text-color
          @click="handlePositiveClick"
        >
          {{ submitText }}
        </n-button>
      </slot>
    </div>
  </div>
</template>
<script>
import NIcon from '../../Icon'
import NModal from '../../Modal'
import NButton from '../../Button'
import iosCheckmarkCircle from '../../../icons/ios-checkmark-circle'
import mdClose from '../../../icons/md-close'
import iosHelpCircle from '../../../icons/ios-help-circle'
import iosCloseCircle from '../../../icons/ios-close-circle'
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'

export default {
  name: 'NConfirm',
  components: {
    NIcon,
    NModal,
    NButton,
    mdClose,
    iosHelpCircle,
    iosCheckmarkCircle,
    iosCloseCircle
  },
  mixins: [withapp, themeable],
  props: {
    title: {
      type: String,
      default: 'Confirm'
    },
    closable: {
      type: Boolean,
      default: true
    },
    cancelText: {
      type: String,
      default: 'Cancel'
    },
    submitText: {
      type: String,
      default: 'Confirm'
    },
    content: {
      type: String,
      default: 'content'
    }
  },
  data () {
    return {
      maskClosable: true,
      // content: 'content',
      // positiveText: 'Confirm',
      // negativeText: 'Cancel',
      type: 'confirm',
      loading: false,
      instances: null
    }
  },
  computed: {
    iconType () {
      const colors = {
        error: { type: 'ios-close-circle' },
        confirm: { type: 'ios-help-circle' },
        success: { type: 'ios-checkmark-circle' }
      }
      return colors[this.type]
    }
  },
  methods: {
    handlePositiveClick () {
      this.$emit('submit')
    },
    handleNegativeClick () {
      this.$emit('cancel')
    },
    handleCloseClick () {
      this.$emit('deactivate')
    }
  }
}
</script>
