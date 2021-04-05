import {
  h,
  ref,
  toRef,
  defineComponent,
  PropType,
  watch,
  computed,
  CSSProperties
} from 'vue'
import { useMergedState } from 'vooks'
import { useRoute, useRouter } from 'vue-router'
import SiderHeader from './SiderHeader'
import { NMenu } from '../../../menu'
import type { MenuOption } from '../../../menu'
import NLayout from '../../../layout/src/Layout'
import type { LayoutProps } from '../../../layout/src/Layout'
import NLayoutSider from '../../../layout/src/LayoutSider'
import type { LayoutSiderProps } from '../../../layout/src/LayoutSider'
import NLayoutHeader from '../../../layout/src/LayoutHeader'
import type { LayoutHeaderProps } from '../../../layout/src/LayoutHeader'
import { createItems } from './utils'
import type { Item } from './interface'
import { LayoutRef } from '../../../layout'

export default defineComponent({
  name: 'ServiceLayout',
  alias: ['NimbusServiceLayout'],
  props: {
    items: {
      type: Array as PropType<Item[]>,
      default: () => []
    },
    name: String,
    headerProps: Object as PropType<
    Partial<LayoutHeaderProps & { style: CSSProperties }>
    >,
    contentProps: Object as PropType<
    Partial<LayoutProps & { style: CSSProperties }>
    >,
    siderProps: Object as PropType<
    Partial<LayoutSiderProps & { style: CSSProperties }>
    >,
    value: String,
    'onUpdate:value': Function as PropType<(value: string) => void>,
    // deprecated
    paddingBody: {
      type: Boolean,
      default: false
    },
    onInput: Function as PropType<(value: string) => void>,
    onSelect: Function as PropType<(value: string) => void>,
    onExpandedNamesChange: Function as PropType<(value: string[]) => void>
  },
  setup (props) {
    const router = useRouter()
    const route = useRoute()
    const bodyLayoutInstRef = ref<LayoutRef | null>(null)
    const uncontrolledValueRef = ref<string | null>(null)
    const controlledValueRef = toRef(props, 'value')
    const mergedValueRef = useMergedState(
      controlledValueRef,
      uncontrolledValueRef
    )
    const uncontrolledCollapsedRef = ref(false)
    const menuItemsRef = computed(() => {
      return createItems(props.items)
    })
    if (route) {
      syncPath(route.path)
      watch(toRef(route, 'path'), (path) => {
        syncPath(path)
      })
      watch(toRef(props, 'items'), () => {
        syncPath(route.path)
      })
    }
    function doUpdateCollapsed (value: boolean): void {
      uncontrolledCollapsedRef.value = value
    }
    function doUpdateValue (value: string): void {
      const { onInput, onSelect, 'onUpdate:value': onUpdateValue } = props
      uncontrolledValueRef.value = value
      if (onSelect) onSelect(value)
      if (onInput) onInput(value)
      if (onUpdateValue) onUpdateValue(value)
    }
    function handleMenuUpdateValue (value: string, item: MenuOption): void {
      if (router && item.path) {
        // path is copied to menu item in utils.createItems
        Promise.resolve(router.push(item.path as string)).catch((err) => {
          console.log(err)
        })
      }
      doUpdateValue(value)
    }
    const scrollTo: LayoutRef['scrollTo'] = (...args: any[]): void => {
      ;(bodyLayoutInstRef.value?.scrollTo as Function)(...args)
    }
    function syncPath (path?: string, items?: Item[]): void {
      if (items === undefined) items = props.items
      for (const item of items) {
        if (item.childItems || item.children) {
          syncPath(path, item.childItems || item.children)
        } else if (item.path === path) {
          doUpdateValue(item.name || item.key || '')
          return
        }
      }
    }
    return {
      bodyLayoutInstRef,
      scrollTo,
      doUpdateCollapsed,
      handleMenuUpdateValue,
      menuItems: menuItemsRef,
      mergedValue: mergedValueRef,
      uncontrolledValue: uncontrolledValueRef,
      uncontrolledCollapsed: uncontrolledCollapsedRef
    }
  },
  render () {
    const siderProps: Partial<LayoutSiderProps> & { style: CSSProperties } = {
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
      style: this.siderProps?.style as any,
      onUpdateCollapsed: this.doUpdateCollapsed
    }
    const contentProps = {
      ...this.contentProps,
      ref: 'bodyLayoutInstRef',
      nativeScrollbar: false,
      scrollbarProps: {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        contentStyle: {
          width: '100%',
          boxSizing: 'border-box',
          padding: this.paddingBody ? '21px 48px' : ''
        } as CSSProperties
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
    return h(
      NLayout,
      {
        position: 'absolute'
      },
      {
        default: () => [
          navSlot ? h(NLayoutHeader, headerProps, navSlot()) : null,
          h(
            NLayout,
            {
              hasSider: true,
              style: {
                top: navSlot ? '64px' : undefined
              },
              position: 'absolute'
            },
            {
              default: () => [
                h(NLayoutSider, siderProps, {
                  default: () => [
                    h(
                      SiderHeader,
                      {
                        name: this.name
                      },
                      {
                        icon: this.$slots['drawer-header-icon']
                      }
                    ),
                    h(NMenu, {
                      value: this.mergedValue,
                      defaultExpandAll: true,
                      rootIndent: 36,
                      indent: 40,
                      options: this.menuItems,
                      'onUpdate:expandedKeys': this.onExpandedNamesChange,
                      'onUpdate:value': this.handleMenuUpdateValue
                    })
                  ]
                }),
                h(NLayout, contentProps, {
                  default: this.$slots.default
                })
              ]
            }
          )
        ]
      }
    )
  }
})
