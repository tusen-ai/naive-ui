import { h, nextTick, ref, toRef, computed, onMounted } from 'vue'
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import usecssr from '../../_mixins/usecssr'
import styles from './styles/index'
import { useMergedState } from '../../_utils/composition'
import {
  getActivePath,
  getWrappedItems,
  itemRenderer
} from './utils'

export default {
  name: 'Menu',
  provide () {
    return {
      NMenu: this,
      NSubmenu: null
    }
  },
  mixins: [
    withapp,
    themeable,
    usecssr(styles)
  ],
  props: {
    items: {
      type: Array,
      required: true
    },
    collapsed: {
      type: Boolean,
      default: false
    },
    collapsedWidth: {
      type: Number,
      default: null
    },
    iconSize: {
      type: Number,
      default: 20
    },
    collapsedIconSize: {
      type: Number,
      default: 20
    },
    rootIndent: {
      type: Number,
      default: null
    },
    indent: {
      type: Number,
      default: 32
    },
    defaultExpandedNames: {
      type: Array,
      default: () => []
    },
    expandedNames: {
      type: Array,
      default: undefined
    },
    modelValue: {
      type: String,
      default: null
    },
    mode: {
      validator (value) {
        return ['vertical', 'horizontal'].includes(value)
      },
      default: 'vertical'
    },
    onExpandedNamesChange: {
      type: Function,
      default: () => {}
    },
    'onUpdate:modelValue': {
      type: Function,
      default: () => {}
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // deprecated
    onOpenNamesChange: {
      type: Function,
      default: () => {}
    },
    onSelect: {
      type: Function,
      default: () => {}
    },
    overlayWidth: {
      type: [Number, String],
      default: null
    },
    overlayMinWidth: {
      type: [Number, String],
      default: 180
    }
  },
  setup (props) {
    const uncontrolledExpandedNamesRef = ref(props.defaultExpandedNames)
    const controlledExpandedNamesRef = toRef(props, 'expandedNames')
    const mergedExpandedNamesRef = useMergedState(
      controlledExpandedNamesRef,
      uncontrolledExpandedNamesRef
    )
    const itemsRef = toRef(props, 'items')
    const valueRef = toRef(props, 'modelValue')
    const activePathRef = computed(() => getActivePath(itemsRef.value, valueRef.value))
    const transitionDisabledRef = ref(true)
    onMounted(() => {
      nextTick(() => {
        transitionDisabledRef.value = false
      })
    })
    return {
      uncontrolledExpanededNames: uncontrolledExpandedNamesRef,
      mergedExpandedNames: mergedExpandedNamesRef,
      activePath: activePathRef,
      menuItems: getWrappedItems(props.items),
      transitionDisabled: transitionDisabledRef
    }
  },
  methods: {
    handleSelect (value) {
      this['onUpdate:modelValue'](value)
      // deprecated
      this.onSelect(value)
    },
    toggleExpand (name) {
      const currentExpandedNames = Array.from(this.mergedExpandedNames)
      const index = currentExpandedNames.findIndex(
        expanededName => expanededName === name
      )
      if (~index) {
        currentExpandedNames.splice(index, 1)
      } else {
        currentExpandedNames.push(name)
      }
      if (this.expandedNames === undefined) {
        this.uncontrolledExpanededNames = currentExpandedNames
      }
      this.onExpandedNamesChange(currentExpandedNames)
      // deprecated
      this.onOpenNamesChange(currentExpandedNames)
    }
  },
  render () {
    return h('div', {
      class: [
        'n-menu',
        `n-menu--${this.mode}`,
        {
          [`n-${this.syntheticTheme}-theme`]: this.syntheticTheme,
          'n-menu--collapsed': this.collapsed,
          'n-menu--transition-disabled': this.transitionDisabled
        }
      ]
    }, this.menuItems.map(item => itemRenderer(item)))
  }
}
