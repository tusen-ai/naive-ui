import SiderMenu from './SiderMenu.js'
import SiderHeader from './SiderHeader.js'
import NLayout from '../../../layout/src/Layout.vue'
import NLayoutSider from '../../../layout/src/LayoutSider.vue'
import NLayoutHeader from '../../../layout/src/LayoutHeader.vue'

import { h, ref, toRef } from 'vue'
import { useMergedState } from 'vooks'

export default {
  name: 'ServiceLayout',
  alias: [
    'NimbusServiceLayout'
  ],
  provide () {
    return {
      ServiceLayout: this
    }
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    name: {
      type: String,
      default: undefined
    },
    headerProps: {
      type: Object,
      default: undefined
    },
    contentProps: {
      type: Object,
      default: undefined
    },
    siderProps: {
      type: Object,
      default: undefined
    },
    value: {
      type: String,
      default: undefined
    },
    'onUpdate:value': {
      type: Function,
      default: undefined
    },
    // deprecated
    paddingBody: {
      type: Boolean,
      default: false
    },
    onInput: {
      type: Function,
      default: undefined
    },
    onSelect: {
      type: Function,
      default: undefined
    },
    onExpandedNamesChange: {
      type: Function,
      default: undefined
    }
  },
  setup (props) {
    const uncontrolledValueRef = ref(null)
    const controlledValueRef = toRef(props, 'value')
    const mergedValueRef = useMergedState(controlledValueRef, uncontrolledValueRef)
    const uncontrolledCollapsedRef = ref(false)
    return {
      mergedValue: mergedValueRef,
      uncontrolledValue: uncontrolledValueRef,
      uncontrolledCollapsed: uncontrolledCollapsedRef
    }
  },
  watch: {
    $route (to) {
      this.syncValue(to.path)
    }
  },
  created () {
    if (this.$route) {
      this.syncValue(this.$route.path)
    }
  },
  methods: {
    doUpdateCollapsed (value) {
      this.uncontrolledCollapsed = value
    },
    doUpdateValue (value) {
      const {
        onInput,
        onSelect,
        'onUpdate:value': onUpdateValue
      } = this
      this.uncontrolledValue = value
      if (onSelect) onSelect(value)
      if (onInput) onInput(value)
      if (onUpdateValue) onUpdateValue(value)
    },
    scrollTo (...args) {
      this.$refs.body.scrollTo(...args)
    },
    syncValue (path, items) {
      if (items === undefined) items = this.items
      for (const item of items) {
        if (item.childItems) {
          this.syncValue(path, item.childItems)
        } else if (item.path === path) {
          this.doUpdateValue(item.name)
          return
        }
      }
    }
  },
  render () {
    const siderProps = {
      bordered: true,
      ...this.siderProps,
      showTrigger: true,
      collapsed: this.uncontrolledCollapsed,
      collapseMode: 'width',
      showContent: !this.uncontrolledCollapsed,
      nativeScrollbar: false,
      collapsedWidth: 0,
      width: 288,
      triggerStyle: {
        top: 'calc(50% - 78px)'
      },
      scrollbarProps: {
        style: {
          width: '288px',
          flexShrink: 0
        }
      },
      style: [
        this.siderProps?.style,
        {
          display: 'flex',
          justifyContent: 'flex-end'
        }
      ],
      onCollapse: () => {
        this.doUpdateCollapsed(true)
      },
      onExpand: () => {
        this.doUpdateCollapsed(false)
      }
    }
    const contentProps = {
      ...this.contentProps,
      ref: 'body',
      nativeScrollbar: false,
      scrollbarProps: {
        contentStyle: {
          width: '100%',
          boxSizing: 'border-box',
          padding: this.paddingBody ? '21px 48px' : null
        }
      }
    }
    const headerProps = {
      ...this.headerProps,
      style: {
        ...this.headerProps?.style,
        height: '64px'
      },
      bordered: true
    }
    const navSlot = this.$slots.nav
    return h(NLayout, {
      position: 'absolute'
    }, {
      default: () => [
        navSlot ? h(NLayoutHeader, headerProps, navSlot()) : null,
        h(NLayout, {
          style: {
            top: navSlot ? '64px' : null
          },
          position: 'absolute'
        }, {
          default: () => [
            h(NLayoutSider, siderProps, {
              default: () => [
                h(SiderHeader, {
                  name: this.name
                }, {
                  icon: this.$slots['drawer-header-icon']
                }),
                h(SiderMenu)
              ]
            }),
            h(NLayout, contentProps, {
              default: this.$slots.default
            })
          ]
        })
      ]
    })
  }
}
