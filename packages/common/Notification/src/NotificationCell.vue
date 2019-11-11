<template>
  <div
    :class="{
      [`n-notification__cell--${type}`]: true
    }"
    class="n-notification__cell"
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
          v-if="notification.subtitle"
          class="n-notification-cell__title-meta"
        >
          {{ notification.subtitle }}
        </div>
        <pre class="n-notification-cell__content">{{ notification.content }}</pre>
        <div class="n-notification-cell__footer">
          <div class="n-notification-cell__meta">
            {{ notification.meta }}
          </div>
          <div
            v-for="action in actions"
            :key="action.name"
            class="n-notification-cell__action"
            @click="action._onClick"
          >
            {{ action.name }}
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
  },
  computed: {
    actions () {
      let actions = this.notification.actions || this.notification.action
      if (!Array.isArray(actions)) actions = [actions]
      actions.forEach(action => {
        if (action.onClick) action._onClick = () => action.onClick(this)
        else action._onClick = () => {}
      })
      return actions
    }
  }
}
</script>
