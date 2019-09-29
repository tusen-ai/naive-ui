<script>
import NModalOverlay from './Overlay'
import NModalContent from './ModalContent'
import NBasePortal from '../../../base/Protal'
import zindexable from '../../../mixins/zindexable'

export default {
  name: 'NModal',
  mixins: [
    zindexable
  ],
  props: {
    activateEvent: {
      validator (e) {
        return e instanceof MouseEvent
      },
      default: null
    },
    value: {
      type: Boolean,
      default: false
    },
    maskClosable: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      mousedownTarget: null
    }
  },
  computed: {
    active () {
      return this.value
    }
  },
  watch: {
    active (value) {
      if (value) {
        this.$refs.portal.transferElement()
      }
    }
  },
  mounted () {
    if (this.active) {
      this.$refs.portal.transferElement()
    }
  },
  methods: {
    deactivate () {
      this.$emit('input', false)
    }
  },
  render (h) {
    return h(NBasePortal, {
      ref: 'portal',
      scopedSlots: {
        default: () => h('div', {
          staticClass: 'n-modal-container',
          ref: 'contentContainer',
          class: {
            'n-modal-container--active': this.value,
            [this.namespace]: this.namespace
          }
        },
        [
          h(NModalOverlay, {
            props: { active: this.value }
          }),
          h(NModalContent,
            {
              ref: 'content',
              props: { active: this.value, activateEvent: this.activateEvent },
              on: {
                'after-leave': () => {
                  this.$emit('after-hide')
                },
                beforeLeave: () => {
                  this.$emit('before-hide')
                },
                mousedown: (e) => {
                  this.mousedownTarget = e.target
                },
                mouseup: (e) => {
                  const slotDOM = this.$refs.content.slotDOM()
                  const scollbars = this.$refs.content.$el.querySelectorAll('.n-scrollbar-rail__scrollbar')
                  const elsToAvoid = [...slotDOM, ...scollbars]
                  if (this.maskClosable) {
                    if (
                      !elsToAvoid.some(el => el.contains(e.target)) &&
                      !elsToAvoid.some(el => el.contains(this.mousedownTarget))
                    ) {
                      this.deactivate()
                    }
                  }
                }
              }
            },
            this.$scopedSlots.default()
          )
        ])
      }
    })
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
  display: flex;
}
</style>
