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
  nextTick
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
    type: String as PropType<'line' | 'card'>,
    default: 'line'
  },
  closable: Boolean,
  justifyContent: String as PropType<
  'space-between' | 'space-around' | 'space-evenly'
  >,
  labelSize: {
    type: String as PropType<'small' | 'medium' | 'large' | 'huge'>,
    default: 'medium'
  },
  tabStyle: [String, Object] as PropType<string | CSSProperties>,
  addable: [Boolean, Object] as PropType<Addable>,
  tabsPadding: {
    type: Number,
    default: 0
  },
  showDivider: Boolean,
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

    const labelWrapperRef = ref<HTMLElement | null>(null)
    const labelBarRef = ref<HTMLElement | null>(null)
    const addTabInstRef = ref<ComponentPublicInstance | null>(null)
    const xScrollInstRef = ref<ComponentPublicInstance | null>(null)

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

    const labelWrapperStyleRef = computed(() => {
      if (!props.justifyContent || props.type !== 'line') return undefined
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
      const labelEl = labelWrapperRef.value?.querySelector(
        `[data-name="${value}"]`
      )
      return labelEl as HTMLElement | null
    }
    function updateBarStyle (labelEl: HTMLElement): void {
      if (props.type === 'card') return
      const { value: labelBarEl } = labelBarRef
      if (!labelBarEl) return
      if (labelEl) {
        const disabledClassName = `${mergedClsPrefixRef.value}-tabs-bar--disabled`
        if (labelEl.dataset.disabled === 'true') {
          labelBarEl.classList.add(disabledClassName)
        } else {
          labelBarEl.classList.remove(disabledClassName)
        }
        labelBarEl.style.left = `${labelEl.offsetLeft}px`
        labelBarEl.style.width = '8192px'
        labelBarEl.style.maxWidth = `${labelEl.offsetWidth + 1}px`
      }
    }
    function updateCurrentBarStyle (): void {
      if (props.type === 'card') return
      const labelEl = getCurrentEl()
      if (labelEl) {
        updateBarStyle(labelEl)
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
        type === 'line' &&
        (firstTimeUpdatePosition || props.justifyContent)
      ) {
        const { value: labelBarEl } = labelBarRef
        if (!labelBarEl) return
        if (!firstTimeUpdatePosition) firstTimeUpdatePosition = false
        const disableTransitionClassName = `${mergedClsPrefixRef.value}-tabs-bar--transition-disabled`
        labelBarEl.classList.add(disableTransitionClassName)
        updateCurrentBarStyle()
        labelBarEl.classList.remove(disableTransitionClassName)
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
      console.log(width, containerWidth)
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
      labelWrapperRef,
      labelBarRef,
      addTabInstRef,
      xScrollInstRef,
      addTabFixed: addTabFixedRef,
      labelWrapperStyle: labelWrapperStyleRef,
      handleNavResize,
      handleTagsResize,
      cssVars: computed(() => {
        const { labelSize } = props
        const {
          self: {
            labelTextColor,
            labelTextColorActive,
            labelTextColorHover,
            labelTextColorDisabled,
            labelBarColor,
            closeColor,
            closeColorHover,
            closeColorPressed,
            tabColor,
            tabBorderColorActive,
            tabTextColor,
            tabTextColorActive,
            tabBorderColor,
            paneTextColor,
            tabFontWeight,
            tabBorderRadius,
            labelFontSizeCard,
            tabFontWeightActive,
            [createKey('labelFontSizeLine', labelSize)]: labelFontSizeLine
          },
          common: { cubicBezierEaseInOut }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--label-bar-color': labelBarColor,
          '--label-font-size-card': labelFontSizeCard,
          '--label-font-size-line': labelFontSizeLine,
          '--label-text-color': labelTextColor,
          '--label-text-color-active': labelTextColorActive,
          '--label-text-color-disabled': labelTextColorDisabled,
          '--label-text-color-hover': labelTextColorHover,
          '--pane-text-color': paneTextColor,
          '--tab-border-color': tabBorderColor,
          '--tab-border-color-active': tabBorderColorActive,
          '--tab-border-radius': tabBorderRadius,
          '--close-color': closeColor,
          '--close-color-hover': closeColorHover,
          '--close-color-pressed': closeColorPressed,
          '--tab-color': tabColor,
          '--tab-font-weight': tabFontWeight,
          '--tab-font-weight-active': tabFontWeightActive,
          '--tab-text-color': tabTextColor,
          '--tab-text-color-active': tabTextColorActive
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
      $slots: { default: defaultSlot, prefix: prefixSlot, suffix: suffixSlot }
    } = this
    const children = defaultSlot ? flatten(defaultSlot()) : []
    const prefix = prefixSlot ? prefixSlot() : null
    const suffix = suffixSlot ? suffixSlot() : null
    const isLine = type === 'line'
    const mergedShowDivider = isLine && this.showDivider
    const mergedJustifyContent = isLine && this.justifyContent
    return (
      <div
        class={[
          `${mergedClsPrefix}-tabs`,
          `${mergedClsPrefix}-tabs--${type}-type`,
          `${mergedClsPrefix}-tabs--${this.labelSize}-size`,
          mergedShowDivider && `${mergedClsPrefix}-tabs--show-divider`,
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
                          style={this.labelWrapperStyle}
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
                              />
                            )
                          })}
                          {!addTabFixed && addable && !isLine
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
                      if (!isLine && addable) {
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
                          ref="labelWrapperRef"
                          class={`${mergedClsPrefix}-tabs-nav-scroll-content`}
                        >
                          {wrappedTags}
                          {isLine ? null : (
                            <div class={`${mergedClsPrefix}-tabs-pad`} />
                          )}
                          {isLine ? (
                            <div
                              ref="labelBarRef"
                              class={`${mergedClsPrefix}-tabs-bar`}
                            />
                          ) : null}
                        </div>
                      )
                    }
                  }}
                </VXScroll>
              )
            }}
          </VResizeObserver>
          {addTabFixed && addable && !isLine
            ? createAddTag(addable, true)
            : null}
          {suffix ? (
            <div class={`${mergedClsPrefix}-tabs-nav__suffix`}>{suffix}</div>
          ) : null}
        </div>
        {children}
      </div>
    )
  }
})

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
