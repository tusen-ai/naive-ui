<template>
  <div
    :class="{
      [`n-${mergedTheme}-theme`]: mergedTheme,
      'n-notification--closable': closable,
      'n-notification--show-avatar': showAvatar,
      [`n-notification--${type}-type`]: type
    }"
    class="n-notification"
  >
    <div
      v-if="showAvatar"
      class="n-notification__avatar"
    >
      <render v-if="avatar" :render="avatar" />
      <n-icon v-else>
        <info-icon v-if="type === 'info'" />
        <warning-icon v-else-if="type === 'warning'" />
        <error-icon v-else-if="type === 'error'" />
        <success-icon v-else-if="type === 'success'" />
      </n-icon>
    </div>
    <div
      v-if="closable"
      class="n-notification__close"
      @click="handleCloseClick"
    >
      <n-icon>
        <close-icon />
      </n-icon>
    </div>
    <div
      ref="body"
      class="n-notification-main"
    >
      <div v-if="title" class="n-notification-main__header">
        <render :render="title" />
      </div>
      <div
        v-if="description"
        class="n-notification-main__description"
      >
        <render :render="description" />
      </div>
      <pre v-if="content" class="n-notification-main__content"><render :render="content" /></pre>
      <div v-if="meta || action" class="n-notification-main-footer">
        <div v-if="meta" class="n-notification-main-footer__meta">
          <render :render="meta" />
        </div>
        <div v-if="action" class="n-notification-main-footer__action">
          <render :render="action" />
        </div>
      </div>
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
import styles from './styles'
import NIcon from '../../icon'
import {
  CloseIcon,
  InfoIcon,
  SuccessIcon,
  WarningIcon,
  ErrorIcon
} from '../../_base/icons'

export default {
  name: 'Notification',
  components: {
    NIcon,
    render,
    CloseIcon,
    SuccessIcon,
    WarningIcon,
    InfoIcon,
    ErrorIcon
  },
  mixins: [
    configurable,
    themeable,
    withCssr(styles)
  ],
  props: {
    closable: {
      type: Boolean,
      default: true
    },
    type: {
      validator (value) {
        return ['info', 'success', 'warning', 'error', 'default'].includes(value)
      },
      default: 'default'
    },
    avatar: {
      type: Function,
      default: undefined
    },
    title: {
      type: [String, Function],
      default: undefined
    },
    description: {
      type: [String, Function],
      default: undefined
    },
    content: {
      type: [String, Function],
      default: undefined
    },
    meta: {
      type: [String, Function],
      default: undefined
    },
    action: {
      type: Function,
      default: undefined
    },
    onClose: {
      type: Function,
      required: true
    }
  },
  computed: {
    showAvatar () {
      return this.avatar || this.type !== 'default'
    }
  },
  methods: {
    handleCloseClick () {
      this.onClose()
    }
  }
}
</script>
