<script>
export default {
  name: 'NModal',
  model: {
    prop: 'isActive',
    event: 'toggle'
  },
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      overlay: null,
      app: null,
      content: null
    }
  },
  watch: {
    isActive (val) {
      if (!val) {
        this.removeOverlay()
      } else {
        this.addOverlayToApp()
      }
    }
  },
  beforeMount () {
    const app = document.querySelector('#app')
    console.log()
    if (!app) {
      console.warn('Modal will be mounted to #app element, but it doesn\'t exist! Modal component won\'t work!')
    }
  },
  mounted () {
    this.app = document.querySelector('#app')
    this.detachContentToApp()
  },
  beforeDestroy () {
    this.removeOverlay()
    this.app.removeChild(this.$refs.content)
  },
  methods: {
    addOverlayToApp () {
      let overlay = document.querySelector('#overlay')
      if (!overlay) {
        overlay = document.createElement('div')
        overlay.classList.add('n-modal-overlay')
        overlay.id = 'overlay'
        this.app.insertBefore(overlay, this.app.firstElementChild)
        this.overlay = overlay
      }
    },
    removeOverlay () {
      let overlay = document.querySelector('#overlay')
      console.log(overlay)
      if (overlay) {
        this.app.removeChild(overlay)
      }
    },
    detachContentToApp () {
      this.$refs.content.parentNode.removeChild(this.$refs.content)
      this.content = this.$refs.content
      this.app.insertBefore(this.content, this.app.firstElementChild)
    }
  },
  render (h) {
    return h('div', [
      this.$slots.activator,
      h('div', {
        staticClass: 'n-modal-content',
        ref: 'content',
        class: {
          'is-active': this.isActive
        }
      },
      this.$slots.default
      )
    ])
  }
}
</script>

<style lang="scss">
.n-modal-overlay {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .35);
  z-index: 200;
}

.n-modal-content {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 201;

  visibility: hidden;
  &.is-active {
    visibility: visible;
  }
}

</style>
