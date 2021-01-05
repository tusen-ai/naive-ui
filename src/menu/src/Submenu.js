import { h, withDirectives, vShow, ref } from 'vue'
import { NFadeInExpandTransition } from '../../_base'
import { NPopover } from '../../popover'
import NMenuItemContent from './MenuItemContent.vue'
import menuChildMixin from './menu-child-mixin'
import { itemRenderer } from './utils'
import { useMemo } from 'vooks'
import { useInjectionRef } from '../../_utils/composable'

export default {
  name: 'Submenu',
  mixins: [menuChildMixin],
  provide () {
    return {
      NSubmenu: this,
      NMenuItemGroup: null
    }
  },
  props: {
    extra: {
      type: [String, Function],
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    },
    tmNodes: {
      type: Array,
      required: true
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
      selectedInside: useMemo(() => {
        return activePathRef.value.includes(props.internalKey)
      }),
      popoverShow: ref(false)
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
      if (this.insidePopover) return false
      if (this.menuCollapsed) {
        return true
      }
      return !this.NMenu.mergedExpandedKeys.includes(this.internalKey)
    },
    popoverEnabled () {
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
      this.popoverShow = value
    }
  },
  render () {
    const createSubmenuItem = () => {
      const {
        delayedPaddingLeft,
        collapsed,
        mergedDisabled,
        maxIconSize,
        activeIconSize,
        title,
        extra,
        horizontal,
        selectedInside,
        icon,
        handleClick,
        popoverShow,
        insidePopover
      } = this
      return h(NMenuItemContent, {
        paddingLeft: delayedPaddingLeft,
        collapsed,
        disabled: mergedDisabled,
        maxIconSize,
        activeIconSize,
        title,
        extra,
        showArrow: !horizontal && !insidePopover,
        uncollapsable: insidePopover,
        childActive: selectedInside,
        icon,
        hover: popoverShow,
        onClick: handleClick
      })
    }
    const createSubmenuChildren = (insidePopover = false) => {
      return h(NFadeInExpandTransition, null, {
        default: () => {
          const { tmNodes, collapsed } = this
          return withDirectives(
            h(
              'div',
              {
                class: 'n-submenu-children'
              },
              tmNodes.map((item) => itemRenderer(item, insidePopover))
            ),
            [[vShow, insidePopover || !collapsed]]
          )
        }
      })
    }
    return this.root
      ? h(
        NPopover,
        {
          class: 'n-menu-popover',
          trigger: 'hover',
          disabled: !this.popoverEnabled,
          placement: this.popoverPlacement,
          showArrow: false,
          padded: false,
          'onUpdate:show': this.handlePopoverShowChange
        },
        {
          trigger: () =>
            h(
              'div',
              {
                class: 'n-submenu'
              },
              [
                createSubmenuItem(),
                !this.horizontal ? createSubmenuChildren() : null
              ]
            ),
          default: () => {
            return h(
              'div',
              {
                class: 'n-menu'
              },
              createSubmenuChildren(true)
            )
          }
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
}
