<script>
import NMessage from './Message'

export default {
  props: {
    duration: {
      type: Number,
      default: 3000
    },
    onDestroy: {
      type: Function,
      required: true
    },
    onClose: {
      type: Function,
      default: () => {}
    },
    onAfterClose: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      active: true,
      theme: null,
      content: null,
      type: null,
      icon: null
    }
  },
  mounted () {
    if (this.duration) {
      window.setTimeout(this.close, this.duration)
    }
  },
  methods: {
    close () {
      this.active = false
      this.onClose()
    },
    deactivate () {
      this.close()
    },
    handleAfterLeave () {
      this.onDestroy(this)
      this.onAfterClose()
    }
  },
  render (h) {
    return h(
      'transition', {
        props: {
          name: 'n-message-transition',
          appear: true
        },
        on: {
          'after-leave': this.handleAfterLeave
        }
      },
      [
        this.active
          ? h(NMessage, {
            props: {
              theme: this.theme,
              content: this.content,
              type: this.type,
              icon: this.icon
            }
          }) : null
      ]
    )
  }
}
</script>
