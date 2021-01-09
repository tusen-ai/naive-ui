<template>
  <div
    :class="{
      'n-notification--closable': closable,
      'n-notification--show-avatar': showAvatar
    }"
    class="n-notification"
    :style="cssVars"
  >
    <div v-if="showAvatar" class="n-notification__avatar">
      <render v-if="avatar" :render="avatar" />
      <n-base-icon v-else>
        <info-icon v-if="type === 'info'" />
        <warning-icon v-else-if="type === 'warning'" />
        <error-icon v-else-if="type === 'error'" />
        <success-icon v-else-if="type === 'success'" />
      </n-base-icon>
    </div>
    <n-base-close
      v-if="closable"
      class="n-notification__close"
      @click="handleCloseClick"
    />
    <div ref="body" class="n-notification-main">
      <div v-if="title" class="n-notification-main__header">
        <render :render="title" />
      </div>
      <div v-if="description" class="n-notification-main__description">
        <render :render="description" />
      </div>
      <pre
        v-if="content"
        class="n-notification-main__content"
      ><render :render="content" /></pre>
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
import { defineComponent, computed, inject } from 'vue'
import { createKey, render } from '../../_utils'
import { NBaseIcon, NBaseClose } from '../../_base'
import {
  InfoIcon,
  SuccessIcon,
  WarningIcon,
  ErrorIcon
} from '../../_base/icons'

export default defineComponent({
  name: 'Notification',
  components: {
    NBaseIcon,
    render,
    NBaseClose,
    SuccessIcon,
    WarningIcon,
    InfoIcon,
    ErrorIcon
  },
  props: {
    closable: {
      type: Boolean,
      default: true
    },
    type: {
      validator (value) {
        return ['info', 'success', 'warning', 'error', 'default'].includes(
          value
        )
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
  setup (props) {
    const NNotificationProvider = inject('NNotificationProvider')
    return {
      showAvatar: computed(() => {
        return props.avatar || props.type !== 'default'
      }),
      handleCloseClick () {
        this.onClose()
      },
      cssVars: computed(() => {
        const { type } = props
        const {
          self: {
            color,
            textColor,
            closeColor,
            closeColorHover,
            closeColorPressed,
            headerTextColor,
            descriptionTextColor,
            actionTextColor,
            borderRadius,
            headerFontWeight,
            boxShadow,
            lineHeight,
            fontSize,
            [createKey('iconColor', type)]: iconColor
          },
          common: {
            cubicBezierEaseOut,
            cubicBezierEaseIn,
            cubicBezierEaseInOut
          }
        } = NNotificationProvider.mergedTheme
        return {
          '--color': color,
          '--font-size': fontSize,
          '--text-color': textColor,
          '--description-text-color': descriptionTextColor,
          '--action-text-color': actionTextColor,
          '--title-text-color': headerTextColor,
          '--title-font-weight': headerFontWeight,
          '--bezier': cubicBezierEaseInOut,
          '--bezier-ease-out': cubicBezierEaseOut,
          '--bezier-ease-in': cubicBezierEaseIn,
          '--border-radius': borderRadius,
          '--box-shadow': boxShadow,
          '--close-color': closeColor,
          '--close-color-hover': closeColorHover,
          '--close-color-pressed': closeColorPressed,
          '--line-height': lineHeight,
          '--icon-color': iconColor
        }
      })
    }
  }
})
</script>
