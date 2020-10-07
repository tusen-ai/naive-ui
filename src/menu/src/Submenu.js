import { h, withDirectives, vShow, ref } from 'vue'
import NFadeInExpandTransition from '../../_transition/FadeInExpandTransition'
import NPopover from '../../popover/src/Popover'
import NMenuItemContent from './MenuItemContent.vue'
import menuChildMixin from './menu-child-mixin'
import { itemRenderer } from './utils'
import { useInjectionRef, useMemo } from '../../_utils/composition'

export default {
  name: 'Submenu',
  mixins: [
    menuChildMixin
  ],
  provide () {
    return {
      NSubmenu: this,
      NMenuItemGroup: null
    }
  },
  props: {
    extra: {
      type: [String, Function],
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    children: {
      type: Array,
      required: true
    },
    icon: {
      type: Function,
      default: null
    },
    onClick: {
      type: Function,
      default: () => {}
    }
  },
  setup (props) {
    const activePathRef = useInjectionRef('NMenu', 'activePath')
    return {
      selectedInside: useMemo(() => {
        return activePathRef.value.includes(props.internalKey)
      }),
      popoverBodyStyle: useInjectionRef('NMenu', 'popoverBodyStyle'),
      popoverShow: ref(false)
    }
  },
  computed: {
    mergedDisabled () {
      const {
        NMenu,
        NSubmenu,
        disabled
      } = this
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
      return this.NMenu.mergedExpandedKeys.includes(this.internalKey)
    },
    popoverEnabled () {
      return !this.mergedDisabled && (this.horizontal || this.menuCollapsed)
    }
  },
  methods: {
    handleClick () {
      if (!this.mergedDisabled) {
        if (!this.menuCollapsed) {
          this.NMenu.toggleExpand(this.internalKey)
        }
        this.onClick()
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
        childSelected: selectedInside,
        icon,
        hover: popoverShow,
        onClick: handleClick
      })
    }
    const createSubmenuChildren = (insidePopover = false) => {
      return h(NFadeInExpandTransition, null, {
        default: () => {
          const {
            children,
            collapsed
          } = this
          return withDirectives(
            h('div', {
              class: 'n-submenu-children'
            }, children.map(item => itemRenderer(item, insidePopover))),
            [
              [vShow, insidePopover || !collapsed]
            ]
          )
        }
      })
    }
    return this.root ? h(NPopover, {
      trigger: 'hover',
      disabled: !this.popoverEnabled,
      bodyStyle: this.popoverBodyStyle,
      placement: this.popoverPlacement,
      showArrow: false,
      'onUpdate:show': this.handlePopoverShowChange
    }, {
      trigger: () => h('div', {
        class: 'n-submenu'
      }, [
        createSubmenuItem(),
        !this.horizontal ? createSubmenuChildren() : null
      ]),
      default: () => {
        const theme = this.NMenu.syntheticTheme
        return h('div', {
          class: [
            'n-menu',
            {
              [`n-${theme}-theme`]: theme
            }
          ]
        }, createSubmenuChildren(true))
      }
    }) : h('div', {
      class: 'n-submenu'
    }, [
      createSubmenuItem(),
      createSubmenuChildren()
    ])
  }
}
