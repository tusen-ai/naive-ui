import {
  h,
  ref,
  defineComponent,
  computed,
  PropType,
  provide,
  CSSProperties,
  watch,
  toRef
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
import { Addable, tabsInjectionKey } from './interface'
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
  // eslint-disable-next-line vue/prop-name-casing
  'onUpdate:value': [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  onUpdateValue: [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  onClose: [Function, Array] as PropType<MaybeArray<() => void>>,
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
      const value = mergedValueRef.value
      if (value === null) return
      const labelEl = labelWrapperRef.value?.querySelector(
        `[data-name="${value}"]`
      )
      if (labelEl) {
        updateBarStyle(labelEl as HTMLElement)
      }
    }
    function handleTabClick (
      panelName: string | number,
      disabled: boolean
    ): void {
      if (!disabled) {
        doUpdateValue(panelName)
      }
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
    function handleClose (e: MouseEvent, panelName: string | number): void {
      const { onClose } = props
      if (onClose) call(onClose, panelName)
      e.stopPropagation()
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

    function handleAdd (): void {}
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
      labelWrapperStyle: labelWrapperStyleRef,
      handleNavResize,
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
      $slots: { default: defaultSlot, prefix: prefixSlot, suffix: suffixSlot }
    } = this
    const children = defaultSlot ? flatten(defaultSlot()) : []
    const prefix = prefixSlot ? prefixSlot() : null
    const suffix = suffixSlot ? suffixSlot() : null
    const isLine = type === 'line'
    const mergedShowDivider = isLine && this.showDivider
    const mregedJustifyContent = isLine && this.justifyContent
    return (
      <div
        class={[
          `${mergedClsPrefix}-tabs`,
          `${mergedClsPrefix}-tabs--${type}-type`,
          `${mergedClsPrefix}-tabs--${this.labelSize}-size`,
          mergedShowDivider && `${mergedClsPrefix}-tabs--show-divider`,
          mregedJustifyContent && `${mergedClsPrefix}-tabs--flex`
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
                <VXScroll class={`${mergedClsPrefix}-tabs-nav-scroll`}>
                  {{
                    default: () => (
                      <div
                        ref="labelWrapperRef"
                        class={`${mergedClsPrefix}-tabs-nav-scroll-content`}
                      >
                        <div
                          style={this.labelWrapperStyle}
                          class={`${mergedClsPrefix}-tabs-wrapper`}
                        >
                          <div
                            class={`${mergedClsPrefix}-tabs-scroll-padding`}
                            style={{ width: `${this.tabsPadding}px` }}
                          />
                          {children.map((tabPaneVNode: any) => {
                            return <Tab {...tabPaneVNode.props} />
                          })}
                          {this.addable && !isLine ? (
                            <Tab
                              key="__addable"
                              name="__addable"
                              addable
                              disabled={
                                typeof this.addable === 'object' &&
                                this.addable.disabled
                              }
                            />
                          ) : null}
                          <div
                            class={`${mergedClsPrefix}-tabs-scroll-padding`}
                            style={{ width: `${this.tabsPadding}px` }}
                          />
                        </div>
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
                  }}
                </VXScroll>
              )
            }}
          </VResizeObserver>
          {suffix ? (
            <div class={`${mergedClsPrefix}-tabs-nav__suffix`}>{suffix}</div>
          ) : null}
        </div>
        {children}
      </div>
    )
  }
})
