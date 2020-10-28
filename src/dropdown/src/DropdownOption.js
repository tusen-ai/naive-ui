import { h, computed, inject, ref } from 'vue'
import { render } from '../../_utils/vue'
import { placeable } from '../../_mixins'
import { ChevronRightIcon } from '../../_base/icons'
import NIcon from '../../icon'
import { useMemo } from 'vooks'
import { useDelayedTrue } from '../../_utils/composition'
import NDropdownMenu from './DropdownMenu'
import { isSubmenuNode } from './utils'

export default {
  name: 'DropdownOption',
  inject: ['NDropdown', 'NDropdownMenu'],
  mixins: [placeable],
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
    const shouldDelayRef = computed(() => NDropdown.keyboardKey === null)
    return {
      rawNode: rawNodeRef,
      hasSubmenu: hasSubmenuRef,
      showSubmenu: useDelayedTrue(showSubmenuRef, 300, shouldDelayRef),
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
      bodyRef: ref(null)
    }
  },
  computed: {
    __placeableEnabled () {
      return this.showSubmenu
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
              'n-dropdown-option-body__suffix--show-submenu': this.NDropdownMenu.showSubmenu
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
            this.showSubmenu
              ? h(NDropdownMenu, {
                ref: 'bodyRef',
                tmNodes: this.tmNode.children,
                parentKey: this.tmNode.key
              })
              : null
          ]
        )
      ]) : null
    ])
  }
}
