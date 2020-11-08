import { h, computed, inject, ref, Transition } from 'vue'
import { render } from '../../_utils/vue'
import { placeable } from '../../_mixins'
import { ChevronRightIcon } from '../../_base/icons'
import NIcon from '../../icon'
import { useMemo } from 'vooks'
import { useDelayedTrue } from '../../_utils/composable'
import NDropdownMenu from './DropdownMenu'
import { isSubmenuNode } from './utils'

export default {
  name: 'DropdownOption',
  mixins: [
    placeable
  ],
  provide () {
    return {
      NDropdownOption: this
    }
  },
  inject: [
    'NDropdown',
    'NDropdownMenu'
  ],
  props: {
    tmNode: {
      type: Object,
      required: true
    },
    parentKey: {
      type: [String, Number],
      default: null
    },
    placement: {
      ...placeable.props.placement,
      default: 'right-start'
    }
  },
  setup (props) {
    const NDropdown = inject('NDropdown')
    const NDropdownOption = inject('NDropdownOption', null)
    const rawNodeRef = computed(() => props.tmNode.rawNode)
    const hasSubmenuRef = computed(() => {
      return isSubmenuNode(props.tmNode.rawNode)
    })
    const showSubmenuRef = computed(() => {
      if (!hasSubmenuRef.value) return false
      const {
        hoverKey,
        keyboardKey,
        lastToggledSubmenuKey,
        activeKeyPath
      } = NDropdown
      const { key } = props.tmNode
      if (hoverKey !== null) return activeKeyPath.includes(key)
      if (keyboardKey !== null) {
        return (
          activeKeyPath.includes(key) &&
          activeKeyPath[activeKeyPath.length - 1] !== key
        )
      }
      if (lastToggledSubmenuKey !== null) return activeKeyPath.includes(key)
      return false
    })
    const shouldDelayRef = computed(() => {
      return NDropdown.keyboardKey === null && NDropdown.animated === false
    })
    const delayedSubmenuRef = useDelayedTrue(showSubmenuRef, 300, shouldDelayRef)
    const parentEnteringSubmenuRef = computed(() => {
      return !!(NDropdownOption && NDropdownOption.enteringSubmenu)
    })
    return {
      enteringSubmenu: ref(false),
      mergedShowSubmenu: computed(() => {
        return delayedSubmenuRef.value && !parentEnteringSubmenuRef.value
      }),
      rawNode: rawNodeRef,
      hasSubmenu: hasSubmenuRef,
      pending: useMemo(() => {
        const {
          activeKeyPath
        } = NDropdown
        const { key } = props.tmNode
        return activeKeyPath.includes(key) || activeKeyPath.includes(key)
      }),
      // placeable
      trackingRef: ref(null),
      offsetContainerRef: ref(null),
      bodyRef: ref(null),
      NDropdownOption
    }
  },
  computed: {
    __placeableEnabled () {
      return this.mergedShowSubmenu
    }
  },
  methods: {
    __placeableTracking () {
      return this.trackingRef
    },
    __placeableTracked () {
      return this.offsetContainerRef
    },
    __placeableOffsetContainer () {
      return this.offsetContainerRef
    },
    __placeableBody () {
      return this.bodyRef
    },
    handleSubmenuBeforeEnter () {
      this.enteringSubmenu = true
    },
    handleSubmenuAfterEnter () {
      this.enteringSubmenu = false
    },
    handleMouseEnter () {
      const {
        NDropdown,
        parentKey,
        tmNode
      } = this
      if (!NDropdown.mergedShow) return
      NDropdown.lastToggledSubmenuKey = parentKey
      NDropdown.keyboardKey = null
      NDropdown.hoverKey = tmNode.key
    },
    handleMouseMove (e) {
      const {
        NDropdown,
        tmNode
      } = this
      if (!NDropdown.mergedShow) return
      if (NDropdown.hoverKey === tmNode.key) return
      this.handleMouseEnter(e)
    },
    handleMouseLeave (e) {
      const {
        NDropdown
      } = this
      if (!NDropdown.mergedShow) return
      const {
        relatedTarget
      } = e
      if (relatedTarget && !relatedTarget.getAttribute('n-dropdown-option')) {
        NDropdown.hoverKey = null
      }
    },
    handleClick () {
      const {
        NDropdown,
        hasSubmenu,
        tmNode
      } = this
      if (!NDropdown.mergedShow) return
      if (
        !hasSubmenu &&
        !tmNode.disabled
      ) {
        NDropdown.doSelect(tmNode.key)
        NDropdown.doUpdateShow(false)
      }
    }
  },
  render () {
    const {
      NDropdown: {
        animated
      },
      mergedShowSubmenu
    } = this
    const submenuVNode = mergedShowSubmenu
      ? h(NDropdownMenu, {
        ref: 'bodyRef',
        tmNodes: this.tmNode.children,
        parentKey: this.tmNode.key
      })
      : null
    return h('div', {
      class: 'n-dropdown-option'
    }, [
      h('div', {
        class: [
          'n-dropdown-option-body',
          {
            'n-dropdown-option-body--pending': this.pending
          }
        ],
        onMouseMove: this.handleMouseMove,
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave,
        onClick: this.handleClick
      }, [
        h('div', {
          class: [
            'n-dropdown-option-body__prefix',
            {
              'n-dropdown-option-body__prefix--show-icon': this.NDropdownMenu.showIcon
            }
          ],
          'n-dropdown-option': true
        }, [
          h(render, { render: this.rawNode.icon })
        ]),
        h('div', {
          class: 'n-dropdown-option-body__label',
          'n-dropdown-option': true
        }, [
          h(render, { render: this.rawNode.label })
        ]),
        h('div', {
          class: [
            'n-dropdown-option-body__suffix',
            {
              'n-dropdown-option-body__suffix--has-submenu': this.NDropdownMenu.hasSubmenu
            }
          ],
          'n-dropdown-option': true
        }, [
          this.hasSubmenu ? h(NIcon, null, {
            default: () => h(ChevronRightIcon)
          }) : null
        ])
      ]),
      this.hasSubmenu ? h('div', {
        ref: 'offsetContainerRef',
        class: 'n-dropdown-offset-container'
      }, [
        h(
          'div',
          {
            ref: 'trackingRef',
            class: 'n-dropdown-menu-wrapper'
          },
          [
            animated ? h(Transition, {
              onBeforeEnter: this.handleSubmenuBeforeEnter,
              onAfterEnter: this.handleSubmenuAfterEnter,
              name: 'n-fade-in-scale-up-transition'
            }, {
              default: () => submenuVNode
            }) : submenuVNode
          ]
        )
      ]) : null
    ])
  }
}
