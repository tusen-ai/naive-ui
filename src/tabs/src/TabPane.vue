<script>
import getDefaultSlot from '../../_utils/vue/getDefaultSlot'

export default {
  name: 'TabPane',
  inject: [ 'NTab' ],
  props: {
    label: {
      type: [String, Number],
      default: undefined
    },
    name: {
      type: [String, Number],
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    displayDirective: {
      type: String,
      default: 'if'
    }
  },
  data () {
    return {
    }
  },
  computed: {
    type () {
      return this.NTab.type
    }
  },
  created () {
    if (this.NTab) {
      this.NTab.addPanel(this)
    }
  },
  beforeDestroy () {
    if (this.NTab) {
      this.NTab.removePanel(this)
    }
  },
  render (h) {
    if (this.displayDirective === 'if') {
      return this.NTab && this.name === this.NTab.activeName ? h('div', {
        staticClass: 'n-tab-panel'
      }, getDefaultSlot(this)) : null
    } else {
      return h('div', {
        staticClass: 'n-tab-panel',
        directives: [
          {
            name: 'show',
            value: this.NTab && this.name === this.NTab.activeName
          }
        ]
      }, getDefaultSlot(this))
    }
  }
}
</script>
