import { h, ref, defineComponent } from 'vue'
import { NFadeInExpandTransition } from '../../_base'
import { NDropdown } from '../../dropdown'
import NMenuItemContent from './MenuItemContent.vue'
import menuChildMixin from './menu-child-mixin'
import { itemRenderer } from './utils'
import { useMemo } from 'vooks'
import { useInjectionRef } from '../../_utils/composable'

export default defineComponent({
  name: 'Submenu',
  mixins: [menuChildMixin],
  provide () {
    return {
      NSubmenu: this,
      NMenuItemGroup: null
    }
  },
  props: {
    rawNodes: {
      type: Array,
      required: true
    },
    tmNodes: {
      type: Array,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    icon: {
      type: Function,
      default: undefined
    },
    onClick: {
      type: Function,
      default: undefined
    }
  },
  setup (props) {
    const activePathRef = useInjectionRef('NMenu', 'activePath')
    return {
      childActive: useMemo(() => {
        return activePathRef.value.includes(props.internalKey)
      }),
      dropdownShow: ref(false)
    }
  },
  computed: {
    mergedDisabled () {
      const { NMenu, NSubmenu, disabled } = this
      if (NSubmenu && NSubmenu.mergedDisabled) return true
      if (NMenu.disabled) return true
      return disabled
    },
    collapsed () {
      if (this.horizontal) return false
      if (this.menuCollapsed) {
        return true
      }
      return !this.NMenu.mergedExpandedKeys.includes(this.internalKey)
    },
    dropdownEnabled () {
      return !this.mergedDisabled && (this.horizontal || this.menuCollapsed)
    }
  },
  methods: {
    doClick () {
      const { onClick } = this
      if (onClick) onClick()
    },
    handleClick () {
      if (!this.mergedDisabled) {
        if (!this.menuCollapsed) {
          this.NMenu.toggleExpand(this.internalKey)
        }
        this.doClick()
      }
    },
    handlePopoverShowChange (value) {
      this.dropdownShow = value
    }
  },
  render () {
    const createSubmenuItem = () => {
      const {
        paddingLeft,
        collapsed,
        mergedDisabled,
        maxIconSize,
        activeIconSize,
        title,
        horizontal,
        childActive,
        icon,
        handleClick,
        dropdownShow,
        iconMarginRight
      } = this
      return h(NMenuItemContent, {
        paddingLeft,
        collapsed,
        disabled: mergedDisabled,
        iconMarginRight,
        maxIconSize,
        activeIconSize,
        title,
        showArrow: !horizontal,
        childActive: childActive,
        icon,
        hover: dropdownShow,
        onClick: handleClick
      })
    }
    const createSubmenuChildren = () => {
      return h(NFadeInExpandTransition, null, {
        default: () => {
          const { tmNodes, collapsed } = this
          return !collapsed
            ? h(
              'div',
              {
                class: 'n-submenu-children'
              },
              tmNodes.map((item) => itemRenderer(item))
            )
            : null
        }
      })
    }
    return this.root
      ? h(
        NDropdown,
        {
          builtinThemeOverrides: {
            fontSizeLarge: '14px',
            optionIconSizeLarge: '18px'
          },
          value: this.NMenu.mergedValue,
          size: 'large',
          trigger: 'hover',
          disabled: !this.dropdownEnabled,
          placement: this.dropdownPlacement,
          'onUpdate:show': this.handlePopoverShowChange,
          options: this.rawNodes,
          onSelect: this.NMenu.doSelect
        },
        {
          default: () =>
            h(
              'div',
              {
                class: 'n-submenu'
              },
              [
                createSubmenuItem(),
                this.horizontal ? null : createSubmenuChildren()
              ]
            )
        }
      )
      : h(
        'div',
        {
          class: 'n-submenu'
        },
        [createSubmenuItem(), createSubmenuChildren()]
      )
  }
})
