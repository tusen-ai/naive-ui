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
    }
  },
  data () {
    return {
      timerId: null,
      active: true,
      inheritedTheme: null,
      theme: null,
      content: null,
      type: null,
      icon: null,
      closable: false,
      onHide: () => {},
      onAfterHide: () => {}
    }
  },
  computed: {
    syntheticTheme () {
      return this.theme || this.inheritedTheme
    }
  },
  mounted () {
    if (this.duration) {
      this.timerId = window.setTimeout(this.hide, this.duration)
    }
  },
  methods: {
    hide () {
      this.active = false
      if (this.timerId) {
        window.clearTimeout(this.timerId)
      }
      this.onHide()
    },
    handleClose () {
      this.hide()
    },
    deactivate () {
      this.hide()
    },
    handleAfterLeave () {
      this.onDestroy(this)
      this.onAfterHide()
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
            on: {
              close: this.handleClose
            },
            props: {
              theme: this.syntheticTheme,
              content: this.content,
              type: this.type,
              icon: this.icon,
              closable: this.closable
            }
          }) : null
      ]
    )
  }
}
</script>
