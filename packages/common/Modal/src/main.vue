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
    // isActive (val) {
    //   if (!val) {
    //     this.removeOverlay()
    //   } else {
    //     this.addOverlayToApp()
    //   }
    // }
  },
  beforeMount () {
    const app = document.querySelector('body')
    if (!app) {
      console.warn('Modal will be mounted to body element, but it doesn\'t exist! Modal component won\'t work!')
    }
  },
  mounted () {
    this.app = document.querySelector('body')
    this.detachContentToApp()
  },
  beforeDestroy () {
    // this.removeOverlay()
    this.app.removeChild(this.$refs.content)
  },
  methods: {
    // addOverlayToApp () {
    //   let overlay = document.querySelector('#overlay')
    //   if (!overlay) {
    //     overlay = document.createElement('div')
    //     overlay.classList.add('n-modal-overlay')
    //     overlay.id = 'overlay'
    //     this.app.append(overlay)
    //     // this.app.insertBefore(overlay, this.app.firstElementChild)
    //     this.overlay = overlay
    //   }
    // },
    // removeOverlay () {
    //   let overlay = document.querySelector('#overlay')
    //   if (overlay) {
    //     this.app.removeChild(overlay)
    //   }
    // },
    deactivate () {
      this.$emit('toggle', false)
    },
    detachContentToApp () {
      this.$refs.content.parentNode.removeChild(this.$refs.content)
      this.content = this.$refs.content
      // this.addOverlayToApp()
      this.app.append(this.content)
      // this.app.insertBefore(this.content, this.app.firstElementChild)
    }
  },
  render (h) {
    return h('div', {
      staticClass: 'n-modal-activator'
    }, [
      this.$slots.activator,
      h('div', {
        staticClass: 'n-modal-content',
        ref: 'content',
        class: {
          'is-active': this.isActive
        }
      },
      [h('div', {
        staticClass: 'n-modal-overlay',
        ref: 'overlay',
        class: {
          'is-active': this.isActive
        },
        on: {
          click: this.deactivate
        }
      }), ...this.$slots.default]
      )
    ])
  }
}
</script>

<style lang="scss">
.n-modal-activator {
  display: inline-block;
}

.n-modal-overlay {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .35);
  display: none;
  &.is-active {
    display: block;
  }
}

.n-modal-content {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: none;
  overflow: auto;
  &.is-active {
    display: flex;
  }
}
</style>
