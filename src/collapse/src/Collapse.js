import { h, markRaw } from 'vue'
import { intersection } from 'lodash-es'
import { configurable, themeable, withCssr } from '../../_mixins'
import { call, warn } from '../../_utils'
import styles from './styles/index.js'

export default {
  name: 'Collapse',
  provide () {
    return {
      NCollapse: this
    }
  },
  mixins: [configurable, themeable, withCssr(styles)],
  props: {
    expandedNames: {
      type: [Array, String],
      default: undefined
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
      default: undefined
    },
    'onUpdate:expandedNames': {
      type: Function,
      default: undefined
    },
    // deprecated
    onExpandedNamesChange: {
      validator () {
        if (__DEV__) {
          warn(
            'collapse',
            '`on-expanded-names-change` is deprecated, please use `on-update:expanded-names` instead.'
          )
        }
        return true
      },
      default: undefined
    }
  },
  setup () {
    return {
      collectedItemNames: markRaw([])
    }
  },
  methods: {
    doUpdateExpandedNames (...args) {
      const {
        'onUpdate:expandedNames': updateExpandedNames,
        onExpandedNamesChange
      } = this
      if (updateExpandedNames) call(updateExpandedNames, ...args)
      if (onExpandedNamesChange) call(onExpandedNamesChange, ...args)
    },
    doItemHeaderClick (...args) {
      const { onItemHeaderClick } = this
      if (onItemHeaderClick) call(onItemHeaderClick, ...args)
    },
    toggleItem (collapse, name, event) {
      if (this.accordion) {
        if (collapse) {
          this.doUpdateExpandedNames([name])
          this.doItemHeaderClick({ name, expanded: true, event })
        } else {
          this.doUpdateExpandedNames([])
          this.doItemHeaderClick({ name, expanded: false, event })
        }
      } else {
        if (!Array.isArray(this.expandedNames)) {
          this.doUpdateExpandedNames([name])
          this.doItemHeaderClick({ name, expanded: true, event })
        } else {
          const activeNames = intersection(
            this.expandedNames,
            this.collectedItemNames
          )
          const index = activeNames.findIndex(
            (activeName) => name === activeName
          )
          if (~index) {
            activeNames.splice(index, 1)
            this.doUpdateExpandedNames(activeNames)
            this.doItemHeaderClick({ name, expanded: false, event })
          } else {
            activeNames.push(name)
            this.doUpdateExpandedNames(activeNames)
            this.doItemHeaderClick({ name, expanded: true, event })
          }
        }
      }
    }
  },
  render () {
    const { mergedTheme } = this
    return h(
      'div',
      {
        class: [
          'n-collapse',
          {
            [`n-${mergedTheme}-theme`]: mergedTheme
          }
        ]
      },
      {
        ...this.$slots
      }
    )
  }
}
