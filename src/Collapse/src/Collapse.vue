<script>
import intersection from 'lodash-es/intersection'
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'

export default {
  name: 'NCollapse',
  provide () {
    return {
      NCollapse: this
    }
  },
  mixins: [
    withapp,
    themeable
  ],
  model: {
    prop: 'expandedNames',
    event: 'expanded-names-change'
  },
  props: {
    expandedNames: {
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
          this.$emit('expanded-names-change', [name])
        } else {
          this.$emit('expanded-names-change', [])
        }
      } else {
        if (!Array.isArray(this.expandedNames)) {
          this.$emit('expanded-names-change', [name])
        } else {
          const activeNames = intersection(this.expandedNames, this.collectedItemNames)
          const index = activeNames.findIndex(activeName => name === activeName)
          if (~index) {
            activeNames.splice(index, 1)
            this.$emit('expanded-names-change', activeNames)
          } else {
            activeNames.push(name)
            this.$emit('expanded-names-change', activeNames)
          }
        }
      }
    }
  },
  render (h) {
    return h('div', {
      staticClass: 'n-collapse',
      class: {
        [`n-${this.syntheticTheme}-theme`]: this.syntheticTheme
      }
    }, this.$slots.default)
  }
}
</script>
