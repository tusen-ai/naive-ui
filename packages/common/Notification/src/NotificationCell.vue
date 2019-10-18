<template>
  <div
    :class="{
      [`n-notification__cell--${type}`]: true
    }"
    class="n-notification__cell 222"
  >
    <div class="n-notification-cell__wrapper">
      <div
        class="n-notification-cell__avator"
        v-if="!notification.avator"
      >!</div>
      <div
        @click="close"
        class="n-notification-cell__deactivator"
      />
      <div
        class="n-notification-cell__body"
        ref="body"
      >
        <div class="n-notification-cell__header">{{ notification.title }}</div>
        <div
          class="n-notification-cell__title-meta"
          v-if="notification.titleMeta"
        >{{ notification.titleMeta }}</div>
        <div class="n-notification-cell__content">{{ notification.content }}</div>
        <div class="n-notification-cell__footer">
          <div class="n-notification-cell__meta">{{ notification.meta }}</div>
          <div
            @click="handleActionClick"
            class="n-notification-cell__action"
          >{{ notification.action }}</div>
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
