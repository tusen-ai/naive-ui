<template>
  <n-modal
    v-model="active"
    :activate-event="event"
    @after-hide="handleAfterHide"
  >
    <div
      class="n-confirm"
      :class="{
        [`n-${theme}-theme`]: theme
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
          {{ title }}
        </span>
        <n-icon
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
        {{ content }}
      </div>
      <div class="n-confirm__footer">
        <n-button
          v-if="type === 'confirm'"
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
      </div>
    </div>
  </n-modal>
</template>

<script>
import NIcon from '../../Icon'
import NModal from '../../Modal'
import NButton from '../../Button'
import iosCheckmarkCircle from '../../../icons/ios-checkmark-circle'
import mdClose from '../../../icons/md-close'
import iosHelpCircle from '../../../icons/ios-help-circle'
import iosCloseCircle from '../../../icons/ios-close-circle'

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
  data () {
    return {
      theme: null,
      maskClosable: true,
      active: false,
      content: 'content',
      positiveText: 'Confirm',
      negativeText: 'Cancel',
      type: 'confirm',
      title: 'title',
      loading: false,
      event: null,
      onPositiveClick: () => {
        this.active = false
      },
      onNegativeClick: () => {
        this.active = false
      },
      onCloseClick: () => {
        this.active = false
      },
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
    handleAfterHide () {
      this.instances.delete(this)
      this.$destroy()
    },
    handlePositiveClick () {
      this.onPositiveClick(this.hide)
    },
    handleNegativeClick () {
      this.onNegativeClick(this.hide)
    },
    handleCloseClick () {
      this.onCloseClick(this.hide)
    },
    hide () {
      this.active = false
    }
  }
}
</script>
