<script>
import NModalOverlay from './Overlay'
import NModalContent from './ModalContent'
import NBasePortal from '../../_base/Portal'
import zindexable from '../../_mixins/zindexable'
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import presetProps from './presetProps'

export default {
  name: 'NModal',
  mixins: [
    withapp,
    zindexable,
    themeable
  ],
  model: {
    prop: 'show',
    event: 'hide'
  },
  props: {
    activateEvent: {
      validator (e) {
        return e instanceof MouseEvent
      },
      default: null
    },
    show: {
      type: Boolean,
      default: false
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    preset: {
      type: String,
      default: null
    },
    /** to make zindexable work */
    detached: {
      type: Boolean,
      default: true
    },
    ...presetProps
  },
  data () {
    return {
      mousedownTarget: null
    }
  },
  computed: {
    active () {
      return this.show
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
      this.$emit('hide', false)
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
            'n-modal-container--active': this.show,
            [this.namespace]: this.namespace
          }
        },
        [
          h(NModalOverlay, {
            props: { active: this.show }
          }),
          h(NModalContent,
            {
              ref: 'content',
              props: {
                ...this.$props,
                theme: this.synthesizedTheme,
                active: this.active
              },
              class: {
                [`n-${this.synthesizedTheme}-theme`]: this.synthesizedTheme
              },
              on: {
                deactivate: () => {
                  this.deactivate()
                },
                'close': () => {
                  if (!this.$listeners['close']) {
                    this.deactivate()
                  }
                  this.$emit('close')
                },
                'negative-click': () => {
                  if (!this.$listeners['negative-click']) {
                    this.deactivate()
                  }
                  this.$emit('negative-click')
                },
                'positive-click': () => {
                  if (!this.$listeners['positive-click']) {
                    this.deactivate()
                  }
                  this.$emit('positive-click')
                },
                'before-leave': () => {
                  this.$emit('before-hide')
                },
                'after-leave': () => {
                  this.$emit('after-hide')
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
              },
              scopedSlots: { ...this.$scopedSlots }
            }
          )
        ])
      }
    })
  }
}
</script>
