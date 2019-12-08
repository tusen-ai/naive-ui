<script>
import NNotification from './Notification'

export default {
  name: 'NNotificationEnvironment',
  props: {
    onDestroy: {
      type: Function,
      required: true
    },
    duration: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      type: 'default',
      active: true,
      theme: null,
      avatar: null,
      title: null,
      description: null,
      content: null,
      meta: null,
      action: null,
      closable: true,
      onClose: next => next(),
      onAfterOpen: () => {},
      onAfterClose: () => {}
    }
  },
  mounted () {
    if (this.duration) {
      window.setTimeout(this.close, this.duration)
    }
  },
  methods: {
    deactivate () {
      this.close()
    },
    close () {
      this.active = false
    },
    handleEnter () {
      this.$nextTick().then(() => {
        this.$el.style.height = this.$el.offsetHeight + 'px'
        this.$el.style.maxHeight = 0
        this.$el.style.transition = 'none'
        this.$el.getBoundingClientRect()
        this.$el.style.transition = null
        this.$el.style.maxHeight = this.$el.style.height
      })
    },
    handleAfterEnter () {
      this.$el.style.height = null
      this.$el.style.maxHeight = null
      this.onAfterOpen(this)
    },
    handleBeforeLeave () {
      this.$el.style.maxHeight = this.$el.offsetHeight + 'px'
      this.$el.style.height = this.$el.offsetHeight + 'px'
      this.$el.getBoundingClientRect()
    },
    handleLeave () {
      this.$el.style.maxHeight = 0
      this.$el.getBoundingClientRect()
    },
    handleAfterLeave () {
      this.onDestroy(this)
      this.onAfterClose()
    },
    handleClose () {
      this.onClose(this.close)
    }
  },
  render (h) {
    return h('transition', {
      props: {
        name: 'n-notification-transition',
        appear: true
      },
      on: {
        'enter': this.handleEnter,
        'after-enter': this.handleAfterEnter,
        'before-leave': this.handleBeforeLeave,
        'leave': this.handleLeave,
        'after-leave': this.handleAfterLeave
      }
    }, [
      this.active ? h(NNotification, {
        props: {
          type: this.type,
          theme: this.theme,
          avatar: this.avatar,
          title: this.title,
          description: this.description,
          content: this.content,
          meta: this.meta,
          action: this.action,
          closable: this.closable
        },
        on: {
          close: () => {
            this.handleClose()
          }
        }
      }) : null
    ])
  }
}
</script>
