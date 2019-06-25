<script>
import NModalOverlay from './Overlay'
import NModalContent from './ModalContent'

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
        staticClass: 'n-modal-container',
        ref: 'content',
        class: {
          'n-modal-container--active': this.isActive
        }
      },
      // [h('div', {
      //   staticClass: 'n-modal-overlay',
      //   ref: 'overlay',
      //   class: {
      //     'is-active': this.isActive
      //   },
      //   on: {
      //     click: this.deactivate
      //   }
      // })
      [h(NModalOverlay, {
        props: { active: this.isActive }
      }),
      h(NModalContent, { ref: 'modalWrapper',
        props: { active: this.isActive },
        on: {
          click: (e) => {
            if (e.target.contains(this.$refs.modalWrapper.$el)) {
              this.deactivate()
            }
          }
        } }, this.$slots.default)]
      )
    ])
  }
}
</script>

<style lang="scss">
.n-modal-activator {
  display: inline-block;
}

.n-modal-container {
  position: fixed;
  left: 0;
  top: 0;
  height: 0;
  width: 0;
  overflow: auto;
  display: flex;
}
</style>
