<template>
  <div
    class="n-notification__cell"
    :class="{
      [`n-notification__cell--${type}`]: true
    }"
  >
    <div class="n-notification-cell__wrapper">
      <div
        v-if="!notification.avator"
        class="n-notification-cell__avator"
      >
        !
      </div>
      <div
        class="n-notification-cell__deactivator"
        @click="close"
      />
      <div
        ref="body"
        class="n-notification-cell__body"
      >
        <div class="n-notification-cell__header">
          {{ notification.title }}
        </div>
        <div
          v-if="notification.titleMeta"
          class="n-notification-cell__title-meta"
        >
          {{ notification.titleMeta }}
        </div>
        <div class="n-notification-cell__content">
          {{ notification.content }}
        </div>
        <div class="n-notification-cell__footer">
          <div class="n-notification-cell__meta">
            {{ notification.meta }}
          </div>
          <div
            class="n-notification-cell__action"
            @click="handleActionClick"
          >
            {{ notification.action }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
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
