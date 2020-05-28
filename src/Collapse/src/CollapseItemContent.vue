<script>
import NFadeInHeightExpandTransition from '../../_transition/FadeInHeightExpandTransition'
import getDefaultSlot from '../../_utils/vue/getDefaultSlot'

export default {
  name: 'NCollapseItemContent',
  components: {
    NFadeInHeightExpandTransition
  },
  props: {
    displayDirective: {
      validator (value) {
        // already validated outside
        return true
      },
      required: true
    },
    show: {
      validator (value) {
        // already validated outside
        return true
      },
      required: true
    }
  },
  render (h) {
    const defaultSlot = getDefaultSlot(this)
    const vIf = this.displayDirective === 'if'
    return h('n-fade-in-height-expand-transition', (vIf && !this.show) ? [] : [
      h('div', {
        staticClass: 'n-collapse-item__content-wrapper',
        directives: [
          !vIf ? {
            name: 'show',
            value: this.show
          } : null
        ].filter(v => v)
      }, [
        h('div', {
          staticClass: 'n-collapse-item__content-inner'
        }, defaultSlot)
      ])
    ])
  }
}
</script>
