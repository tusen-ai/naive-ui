<script>
import NModalOverlay from './Overlay'
import NModalContent from './ModalContent'

import detachable from '../../../mixins/detachable'
import zindexable from '../../../mixins/zindexable'
import toggleable from '../../../mixins/toggleable'

export default {
  name: 'NModal',
  mixins: [
    toggleable,
    detachable,
    zindexable
  ],
  props: {
    activateEvent: {
      validator (e) {
        return e instanceof MouseEvent
      },
      default: null
    }
  },
  data () {
    return {
      mousedownTarget: null
    }
  },
  render (h) {
    return h('div', {
      staticClass: 'n-modal-activator',
      ref: 'activator'
    }, [
      this.$slots.activator,
      h('div', {
        staticClass: 'n-modal-container',
        ref: 'contentContainer',
        class: {
          'n-modal-container--active': this.active
        }
      },
      [
        h(NModalOverlay, {
          props: { active: this.active }
        }),
        h(NModalContent,
          {
            ref: 'content',
            props: { active: this.active, activateEvent: this.activateEvent },
            on: {
              mousedown: (e) => {
                this.mousedownTarget = e.target
              },
              mouseup: (e) => {
                const slotDOM = this.$refs.content.slotDOM
                const scollbars = this.$refs.content.$el.querySelectorAll('.n-scrollbar-rail__scrollbar')
                const elsToAvoid = [...slotDOM, ...scollbars]
                if (
                  !elsToAvoid.some(el => el.contains(e.target)) &&
                  !elsToAvoid.some(el => el.contains(this.mousedownTarget))
                ) {
                  this.deactivate()
                }
              }
            }
          },
          this.$slots.default
        )
      ])
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
  display: flex;
}
</style>
