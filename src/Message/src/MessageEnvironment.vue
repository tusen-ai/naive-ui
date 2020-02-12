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
      active: true,
      theme: null,
      content: null,
      type: null,
      icon: null,
      onHide: () => {},
      onAfterHide: () => {}
    }
  },
  mounted () {
    if (this.duration) {
      window.setTimeout(this.hide, this.duration)
    }
  },
  methods: {
    hide () {
      this.active = false
      this.onHide()
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
