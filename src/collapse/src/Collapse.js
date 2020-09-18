import { h, markRaw } from 'vue'
import intersection from 'lodash-es/intersection'
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
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
    },
    onItemHeaderClick: {
      type: Function,
      default: () => {}
    },
    'onUpdate:expandedNames': {
      type: Function,
      default: () => {}
    },
    // deprecated
    onExpandedNamesChange: {
      type: Function,
      default: () => {}
    }
  },
  setup () {
    return {
      collectedItemNames: markRaw([])
    }
  },
  methods: {
    toggleItem (collapse, name, event) {
      if (this.accordion) {
        if (collapse) {
          this['onUpdate:expandedNames']([name])

          this.onExpandedNamesChange([name])
          this.onItemHeaderClick({ name, expanded: true, event })
        } else {
          this['onUpdate:expandedNames']([])
          this.onExpandedNamesChange([])
          this.onItemHeaderClick({ name, expanded: false, event })
        }
      } else {
        if (!Array.isArray(this.expandedNames)) {
          this['onUpdate:expandedNames']([name])
          this.onExpandedNamesChange([name])
          this.onItemHeaderClick({ name, expanded: true, event })
        } else {
          const activeNames = intersection(this.expandedNames, this.collectedItemNames)
          const index = activeNames.findIndex(activeName => name === activeName)
          if (~index) {
            activeNames.splice(index, 1)
            this['onUpdate:expandedNames'](activeNames)
            this.onExpandedNamesChange(activeNames)
            this.onItemHeaderClick({ name, expanded: false, event })
          } else {
            activeNames.push(name)
            this['onUpdate:expandedNames'](activeNames)
            this.onExpandedNamesChange(activeNames)
            this.onItemHeaderClick({ name, expanded: true, event })
          }
        }
      }
    }
  },
  render () {
    const { syntheticTheme } = this
    return h('div', {
      class: [
        'n-collapse',
        {
          [`n-${syntheticTheme}-theme`]: syntheticTheme
        }
      ]
    }, {
      ...this.$slots
    })
  }
}
