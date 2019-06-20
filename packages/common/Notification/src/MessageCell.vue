<template>
  <div
    class="n-notification__cell"
    :class="{
      [`n-notification__cell--${type}`]: true
    }"
  >
    <div class="n-notification-cell__avator" />
    <div class="n-notification-cell__body">
      <div class="n-notification-cell__header">
        {{ notification.title }}
      </div>
      <div class="n-notification-cell__title-meta">
        {{ notification.titleMeta }}
      </div>
      <div class="n-notification-cell__content">
        {{ notification.content }}
      </div>
      <div class="n-notification-cell__footer">
        <div class="n-notification-cell__meta">
          {{ notification.meta }}
        </div>
        <div class="n-notification-cell__action">
          {{ notification.action }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NIcon from '../../Icon/index'

export default {
  components: {
    NIcon
  },
  props: {
    type: {
      type: String,
      default: 'success'
    },
    content: {
      type: String,
      default: ''
    },
    notification: {
      type: Object,
      default: null
    }
  }
}
</script>
