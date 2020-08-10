<script>
import intersection from 'lodash-es/intersection'
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import getDefaultSlot from '../../_utils/vue/getDefaultSlot'
import usecssr from '../../_mixins/usecssr'
import styles from './styles/index.js'

export default {
  name: 'Collapse',
  provide () {
    return {
      NCollapse: this
    }
  },
  mixins: [
    withapp,
    themeable,
    usecssr(styles)
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
    arrowPlacement: {
      validator (value) {
        return ['left', 'right'].includes(value)
      },
      default: 'left'
    },
    accordion: {
      type: Boolean,
      default: false
    },
    displayDirective: {
      validator (value) {
        return ['if', 'show'].includes(value)
      },
      default: 'if'
    }
  },
  data () {
    return {
      collectedItemNames: []
    }
  },
  methods: {
    toggleItem (collapse, name, event) {
      if (this.accordion) {
        if (collapse) {
          this.$emit('expanded-names-change', [name])
          this.$emit('item-header-click', { name, expanded: true, event })
        } else {
          this.$emit('expanded-names-change', [])
          this.$emit('item-header-click', { name, expanded: false, event })
        }
      } else {
        if (!Array.isArray(this.expandedNames)) {
          this.$emit('expanded-names-change', [name])
          this.$emit('item-header-click', { name, expanded: true, event })
        } else {
          const activeNames = intersection(this.expandedNames, this.collectedItemNames)
          const index = activeNames.findIndex(activeName => name === activeName)
          if (~index) {
            activeNames.splice(index, 1)
            this.$emit('expanded-names-change', activeNames)
            this.$emit('item-header-click', { name, expanded: false, event })
          } else {
            activeNames.push(name)
            this.$emit('expanded-names-change', activeNames)
            this.$emit('item-header-click', { name, expanded: true, event })
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
    }, getDefaultSlot(this))
  }
}
</script>
