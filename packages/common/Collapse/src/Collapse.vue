<script>
import intersection from 'lodash-es/intersection'
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'
import asthemecontext from '../../../mixins/asthemecontext'

export default {
  name: 'NCollapse',
  provide () {
    return {
      NCollapse: this
    }
  },
  mixins: [
    withapp,
    themeable,
    asthemecontext
  ],
  model: {
    prop: 'expandNames',
    event: 'expand-names-change'
  },
  props: {
    expandNames: {
      type: [Array, String],
      default: null
    },
    accordion: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      collectedItemNames: []
    }
  },
  methods: {
    toggleItem (collapse, name) {
      if (this.accordion) {
        if (collapse) {
          this.$emit('expand-names-change', [name])
        } else {
          this.$emit('expand-names-change', [])
        }
      } else {
        if (!Array.isArray(this.expandNames)) {
          this.$emit('expand-names-change', [name])
        } else {
          const activeNames = intersection(this.expandNames, this.collectedItemNames)
          const index = activeNames.findIndex(activeName => name === activeName)
          if (~index) {
            activeNames.splice(index, 1)
            this.$emit('expand-names-change', activeNames)
          } else {
            activeNames.push(name)
            this.$emit('expand-names-change', activeNames)
          }
        }
      }
    }
  },
  render (h) {
    return h('div', {
      staticClass: 'n-collapse',
      class: {
        [`n-${this.synthesizedTheme}-theme`]: this.synthesizedTheme
      },
      style: this.synthesizedStyle
    }, this.$slots.default)
  }
}
</script>
