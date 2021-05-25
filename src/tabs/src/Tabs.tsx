import {
  h,
  ref,
  defineComponent,
  computed,
  PropType,
  provide,
  CSSProperties,
  watch,
  toRef,
  ComponentPublicInstance,
  VNode,
  nextTick,
  withDirectives,
  vShow
} from 'vue'
import { VResizeObserver, VXScroll } from 'vueuc'
import { throttle } from 'lodash-es'
import { useCompitable, onFontsReady, useMergedState } from 'vooks'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { warn, createKey, call, flatten } from '../../_utils'
import type { MaybeArray, ExtractPublicPropTypes } from '../../_utils'
import { tabsLight } from '../styles'
import type { TabsTheme } from '../styles'
import { Addable, OnClose, OnCloseImpl, tabsInjectionKey } from './interface'
import type { OnUpdateValue, OnUpdateValueImpl } from './interface'
import style from './styles/index.cssr'
import Tab from './Tab'

const tabsProps = {
  ...(useTheme.props as ThemeProps<TabsTheme>),
  value: [String, Number] as PropType<string | number>,
  defaultValue: [String, Number] as PropType<string | number>,
  type: {
    type: String as PropType<'bar' | 'line' | 'card'>,
    default: 'bar'
  },
  closable: Boolean,
  justifyContent: String as PropType<
  'space-between' | 'space-around' | 'space-evenly'
  >,
  /** deprecated */
  labelSize: {
    type: String as PropType<'small' | 'medium' | 'large' | 'huge'>,
    validator: () => {
      if (__DEV__) {
        warn('tabs', '`label-size` is deprecated, please use `size` instead.')
      }
      return true
    },
    default: undefined
  },
  size: {
    type: String as PropType<'small' | 'medium' | 'large' | 'huge'>,
    default: 'medium'
  },
  tabStyle: [String, Object] as PropType<string | CSSProperties>,
  addable: [Boolean, Object] as PropType<Addable>,
  tabsPadding: {
    type: Number,
    default: 0
  },
  onAdd: Function as PropType<() => void>,
  // eslint-disable-next-line vue/prop-name-casing
  'onUpdate:value': [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  onUpdateValue: [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  onClose: [Function, Array] as PropType<MaybeArray<OnClose>>,
  // deprecated
  activeName: {
    type: [String, Number] as PropType<string | number | undefined>,
    validator: () => {
      if (__DEV__) {
        warn('tabs', '`active-name` is deprecated, please use `value` instead.')
      }
      return true
    },
    default: undefined
  },
  onActiveNameChange: {
    type: [Function, Array] as PropType<
    MaybeArray<(value: string & number) => void> | undefined
    >,
    validator: () => {
      if (__DEV__) {
        warn(
          'tabs',
          '`on-active-name-change` is deprecated, please use `on-update:value` instead.'
        )
      }
      return true
    },
    default: undefined
  }
} as const

export type TabsProps = ExtractPublicPropTypes<typeof tabsProps>

export default defineComponent({
  name: 'Tabs',
  props: tabsProps,
  setup (props, { slots }) {
    const { mergedClsPrefixRef } = useConfig(props)
    const themeRef = useTheme(
      'Tabs',
      'Tabs',
      style,
      tabsLight,
      props,
      mergedClsPrefixRef
    )

    const tabWrapperRef = ref<HTMLElement | null>(null)
    const barRef = ref<HTMLElement | null>(null)
    const addTabInstRef = ref<ComponentPublicInstance | null>(null)
    const xScrollInstRef = ref<ComponentPublicInstance | null>(null)

    const compitableSizeRef = useCompitable(props, ['labelSize', 'size'])
    const compitableValueRef = useCompitable(props, ['activeName', 'value'])
    const uncontrolledValueRef = ref(
      compitableValueRef.value ??
        props.defaultValue ??
        ((flatten((slots as any).default())[0] as any).props.name as
          | string
          | number)
    )
    const mergedValueRef = useMergedState(
      compitableValueRef,
      uncontrolledValueRef
    )

    const tabWrapperStyleRef = computed(() => {
      if (!props.justifyContent || props.type === 'card') return undefined
      return {
        display: 'flex',
        justifyContent: props.justifyContent
      }
    })

    watch(mergedValueRef, () => {
      updateCurrentBarStyle()
    })

    function getCurrentEl (): HTMLElement | null {
      const { value } = mergedValueRef
      if (value === null) return null
      const tabEl = tabWrapperRef.value?.querySelector(`[data-name="${value}"]`)
      return tabEl as HTMLElement | null
    }
    function updateBarStyle (tabEl: HTMLElement): void {
      if (props.type === 'card') return
      const { value: barEl } = barRef
      if (!barEl) return
      if (tabEl) {
        const disabledClassName = `${mergedClsPrefixRef.value}-tabs-bar--disabled`
        if (tabEl.dataset.disabled === 'true') {
          barEl.classList.add(disabledClassName)
        } else {
          barEl.classList.remove(disabledClassName)
        }
        barEl.style.left = `${tabEl.offsetLeft}px`
        barEl.style.width = '8192px'
        barEl.style.maxWidth = `${tabEl.offsetWidth + 1}px`
      }
    }
    function updateCurrentBarStyle (): void {
      if (props.type === 'card') return
      const tabEl = getCurrentEl()
      if (tabEl) {
        updateBarStyle(tabEl)
      }
    }
    function handleTabClick (panelName: string | number): void {
      doUpdateValue(panelName)
    }
    function doUpdateValue (panelName: string | number): void {
      const {
        onActiveNameChange,
        onUpdateValue,
        'onUpdate:value': _onUpdateValue
      } = props
      if (onActiveNameChange) {
        call(onActiveNameChange as OnUpdateValueImpl, panelName)
      }
      if (onUpdateValue) call(onUpdateValue as OnUpdateValueImpl, panelName)
      if (_onUpdateValue) call(_onUpdateValue as OnUpdateValueImpl, panelName)
      uncontrolledValueRef.value = panelName
    }
    function handleClose (panelName: string | number): void {
      const { onClose } = props
      if (onClose) call(onClose as OnCloseImpl, panelName)
    }

    let firstTimeUpdatePosition = true
    const handleNavResize = throttle(function handleNavResize () {
      const { type } = props
      if (
        (type === 'line' || type === 'bar') &&
        (firstTimeUpdatePosition || props.justifyContent)
      ) {
        const { value: barEl } = barRef
        if (!barEl) return
        if (!firstTimeUpdatePosition) firstTimeUpdatePosition = false
        const disableTransitionClassName = `${mergedClsPrefixRef.value}-tabs-bar--transition-disabled`
        barEl.classList.add(disableTransitionClassName)
        updateCurrentBarStyle()
        barEl.classList.remove(disableTransitionClassName)
      }
    }, 64)

    const addTabFixedRef = ref(false)
    function handleTagsResize (entry: ResizeObserverEntry): void {
      const {
        target,
        contentRect: { width }
      } = entry
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const containerWidth = target.parentElement!.offsetWidth
      if (!addTabFixedRef.value) {
        if (containerWidth < width) {
          addTabFixedRef.value = true
        }
      } else {
        const { value: addTabInst } = addTabInstRef
        if (!addTabInst) return
        if (containerWidth - width > addTabInst.$el.offsetWidth) {
          addTabFixedRef.value = false
        }
      }
    }

    function handleAdd (): void {
      const { onAdd } = props
      if (onAdd) onAdd()
      void nextTick(() => {
        const currentEl = getCurrentEl()
        if (!currentEl) return
        const scrollContainer: HTMLElement = xScrollInstRef.value?.$el
        if (!scrollContainer) return
        scrollContainer.scroll({
          left: currentEl.offsetLeft,
          top: 0,
          behavior: 'smooth'
        })
      })
    }
    provide(tabsInjectionKey, {
      tabStyleRef: toRef(props, 'tabStyle'),
      mergedClsPrefixRef,
      typeRef: toRef(props, 'type'),
      closableRef: toRef(props, 'closable'),
      valueRef: mergedValueRef,
      handleTabClick,
      handleClose,
      handleAdd
    })
    onFontsReady(() => {
      updateCurrentBarStyle()
    })
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedValue: mergedValueRef,
      tabWrapperRef,
      barRef,
      addTabInstRef,
      xScrollInstRef,
      addTabFixed: addTabFixedRef,
      tabWrapperStyle: tabWrapperStyleRef,
      handleNavResize,
      mergedSize: compitableSizeRef,
      handleTagsResize,
      cssVars: computed(() => {
        const { value: size } = compitableSizeRef
        const { type } = props
        const {
          self: {
            barColor,
            closeColor,
            closeColorHover,
            closeColorPressed,
            tabColor,
            tabBorderColor,
            paneTextColor,
            tabFontWeight,
            tabBorderRadius,
            tabFontWeightActive,
            [createKey('tabTextColor', type)]: tabTextColor,
            [createKey('tabTextColorActive', type)]: tabTextColorActive,
            [createKey('tabTextColorHover', type)]: tabTextColorHover,
            [createKey('tabTextColorDisabled', type)]: tabTextColorDisabled,
            [createKey('tabFontSize', size)]: tabFontSize
          },
          common: { cubicBezierEaseInOut }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--bar-color': barColor,
          '--tab-font-size': tabFontSize,
          '--tab-text-color': tabTextColor,
          '--tab-text-color-active': tabTextColorActive,
          '--tab-text-color-disabled': tabTextColorDisabled,
          '--tab-text-color-hover': tabTextColorHover,
          '--pane-text-color': paneTextColor,
          '--tab-border-color': tabBorderColor,
          '--tab-border-radius': tabBorderRadius,
          '--close-color': closeColor,
          '--close-color-hover': closeColorHover,
          '--close-color-pressed': closeColorPressed,
          '--tab-color': tabColor,
          '--tab-font-weight': tabFontWeight,
          '--tab-font-weight-active': tabFontWeightActive
        }
      })
    }
  },
  render () {
    const {
      mergedClsPrefix,
      type,
      addTabFixed,
      addable,
      mergedSize,
      $slots: { default: defaultSlot, prefix: prefixSlot, suffix: suffixSlot }
    } = this
    const children = defaultSlot ? flatten(defaultSlot()) : []
    const prefix = prefixSlot ? prefixSlot() : null
    const suffix = suffixSlot ? suffixSlot() : null
    const isCard = type === 'card'
    const mergedJustifyContent = !isCard && this.justifyContent
    return (
      <div
        class={[
          `${mergedClsPrefix}-tabs`,
          `${mergedClsPrefix}-tabs--${type}-type`,
          `${mergedClsPrefix}-tabs--${mergedSize}-size`,
          mergedJustifyContent && `${mergedClsPrefix}-tabs--flex`
        ]}
        style={this.cssVars as CSSProperties}
      >
        <div class={`${mergedClsPrefix}-tabs-nav`}>
          {prefix ? (
            <div class={`${mergedClsPrefix}-tabs-nav__prefix`}>{prefix}</div>
          ) : null}
          <VResizeObserver onResize={this.handleNavResize}>
            {{
              default: () => (
                <VXScroll
                  class={`${mergedClsPrefix}-tabs-nav-scroll`}
                  ref="xScrollInstRef"
                >
                  {{
                    default: () => {
                      const rawWrappedTags = (
                        <div
                          style={this.tabWrapperStyle}
                          class={`${mergedClsPrefix}-tabs-wrapper`}
                        >
                          {mergedJustifyContent ? null : (
                            <div
                              class={`${mergedClsPrefix}-tabs-scroll-padding`}
                              style={{ width: `${this.tabsPadding}px` }}
                            />
                          )}
                          {children.map((tabPaneVNode: any, index: number) => {
                            return (
                              <Tab
                                {...tabPaneVNode.props}
                                leftPadded={
                                  index !== 0 && !mergedJustifyContent
                                }
                              >
                                {{
                                  default: tabPaneVNode.children.tab
                                }}
                              </Tab>
                            )
                          })}
                          {!addTabFixed && addable && isCard
                            ? createAddTag(addable, children.length !== 0)
                            : null}
                          {mergedJustifyContent ? null : (
                            <div
                              class={`${mergedClsPrefix}-tabs-scroll-padding`}
                              style={{ width: `${this.tabsPadding}px` }}
                            />
                          )}
                        </div>
                      )
                      let wrappedTags = rawWrappedTags
                      if (isCard && addable) {
                        wrappedTags = (
                          <VResizeObserver onResize={this.handleTagsResize}>
                            {{
                              default: () => rawWrappedTags
                            }}
                          </VResizeObserver>
                        )
                      }
                      return (
                        <div
                          ref="tabWrapperRef"
                          class={`${mergedClsPrefix}-tabs-nav-scroll-content`}
                        >
                          {wrappedTags}
                          {isCard ? (
                            <div class={`${mergedClsPrefix}-tabs-pad`} />
                          ) : null}
                          {isCard ? null : (
                            <div
                              ref="barRef"
                              class={`${mergedClsPrefix}-tabs-bar`}
                            />
                          )}
                        </div>
                      )
                    }
                  }}
                </VXScroll>
              )
            }}
          </VResizeObserver>
          {addTabFixed && addable && isCard
            ? createAddTag(addable, true)
            : null}
          {suffix ? (
            <div class={`${mergedClsPrefix}-tabs-nav__suffix`}>{suffix}</div>
          ) : null}
        </div>
        {filterMapTabPanes(children, this.mergedValue)}
      </div>
    )
  }
})

function filterMapTabPanes (
  tabPaneVNodes: VNode[],
  value: string | number | undefined
): VNode[] {
  const children: VNode[] = []
  tabPaneVNodes.forEach((vNode) => {
    const { name, displayDirective } = vNode.props as {
      name: string | number
      displayDirective: 'show' | 'if' | undefined
    }
    const useVShow = displayDirective === 'show'
    const show = value === name
    if (vNode.key !== undefined) {
      vNode.key = name
    }
    if (useVShow) {
      children.push(withDirectives(vNode, [[vShow, show]]))
    } else if (show) {
      children.push(vNode)
    }
  })
  return children
}

function createAddTag (addable: Addable, leftPadded: boolean): VNode {
  return (
    <Tab
      ref="addTabInstRef"
      key="__addable"
      name="__addable"
      addable
      leftPadded={leftPadded}
      disabled={typeof addable === 'object' && addable.disabled}
    />
  )
}
