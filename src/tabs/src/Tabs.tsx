import {
  h,
  ref,
  defineComponent,
  computed,
  PropType,
  provide,
  CSSProperties,
  watch,
  nextTick,
  reactive,
  toRef,
  Ref,
  renderSlot
} from 'vue'
import { VResizeObserver, VXScroll } from 'vueuc'
import { throttle } from 'lodash-es'
import { useCompitable, onFontsReady, useMergedState } from 'vooks'
import { NBaseClose } from '../../_internal'
import { useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { warn, createKey, call } from '../../_utils'
import type { MaybeArray } from '../../_utils'
import { tabsLight } from '../styles'
import type { TabsTheme } from '../styles'
import type { TabsInjection, TabPaneProps } from './TabPane'
import style from './styles/index.cssr'

export default defineComponent({
  name: 'Tabs',
  props: {
    ...(useTheme.props as ThemeProps<TabsTheme>),
    value: [String, Number] as PropType<string | number>,
    defaultValue: {
      type: [String, Number] as PropType<string | number | null>,
      default: null
    },
    type: {
      type: String as PropType<'line' | 'card'>,
      default: 'line'
    },
    closable: {
      type: Boolean,
      default: false
    },
    justifyContent: String as PropType<
    'space-between' | 'space-around' | 'space-evenly'
    >,
    labelSize: {
      type: String as PropType<'small' | 'medium' | 'large' | 'huge'>,
      default: 'medium'
    },
    navStyle: [String, Object] as PropType<string | CSSProperties>,
    onScrollableChange: Function as PropType<
    MaybeArray<(value: boolean) => void>
    >,
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:value': Function as PropType<
    MaybeArray<<T extends string | number>(value: T) => void>
    >,
    onClose: Function as PropType<MaybeArray<() => void>>,
    // deprecated
    activeName: {
      type: [String, Number] as PropType<string | number | undefined>,
      validator: () => {
        if (__DEV__) {
          warn(
            'tabs',
            '`active-name` is deprecated, please use `value` instead.'
          )
        }
        return true
      },
      default: undefined
    },
    onActiveNameChange: {
      type: Function as PropType<
      MaybeArray<<T extends string | number>(value: T) => void>
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
  },
  setup (props) {
    const themeRef = useTheme('Tabs', 'Tabs', style, tabsLight, props)

    const labelWrapperRef = ref<HTMLElement | null>(null)
    const labelBarRef = ref<HTMLElement | null>(null)

    const panelsRef = ref<TabPaneProps[]>([])
    const transitionDisabledRef = ref(false)
    const compitableValueRef = useCompitable(props, ['activeName', 'value'])
    const uncontrolledValueRef = ref(props.defaultValue)
    const mergedValueRef = useMergedState(
      compitableValueRef,
      uncontrolledValueRef
    )

    const compitableOnValueChangeRef = useCompitable(props, [
      'onActiveNameChange',
      'onUpdate:value'
    ])
    const labelWrapperStyleRef = computed(() => {
      if (!props.justifyContent) return undefined
      return {
        display: 'flex',
        justifyContent: props.justifyContent
      }
    })

    watch(mergedValueRef, () => {
      updateCurrentBarPosition()
    })

    function addPanel (panelProps: TabPaneProps): void {
      panelsRef.value.push(panelProps)
    }
    function removePanel (panelProps: TabPaneProps): void {
      const index = panelsRef.value.findIndex(
        (panel) => panel.name === panelProps.name
      )
      if (~index) {
        panelsRef.value.splice(index, 1)
      }
    }
    function updateBarPosition (labelEl: HTMLElement): void {
      if (props.type === 'card') return
      const { value: labelBarEl } = labelBarRef
      if (!labelBarEl) return
      if (labelEl) {
        labelBarEl.style.left = `${labelEl.offsetLeft}px`
        labelBarEl.style.width = '8192px'
        labelBarEl.style.maxWidth = `${labelEl.offsetWidth + 1}px`
      }
    }
    function updateCurrentBarPosition (): void {
      if (props.type === 'card') return
      const value = mergedValueRef.value
      for (const panel of panelsRef.value) {
        if (panel.name === value) {
          const labelEl = labelWrapperRef.value?.querySelector(
            `[data-name="${panel.name}"]`
          )
          if (labelEl) {
            updateBarPosition(labelEl as HTMLElement)
          }
          break
        }
      }
    }
    function handleTabClick (
      e: MouseEvent,
      panelName: string | number,
      disabled: boolean
    ): void {
      if (!disabled) {
        setPanelActive(panelName)
      }
    }
    function setPanelActive (panelName: string | number): void {
      const { value: compitableOnValueChange } = compitableOnValueChangeRef
      if (compitableOnValueChange) call(compitableOnValueChange, panelName)
    }
    function handleCloseClick (e: MouseEvent, panel: TabPaneProps): void {
      const { onClose } = props
      if (onClose) call(onClose, panel.name)
      e.stopPropagation()
    }
    const handleNavResize = throttle(function handleNavResize () {
      if (props.type === 'card') {
        // do nothing
      } else if (props.type === 'line') {
        transitionDisabledRef.value = true
        void nextTick(() => {
          updateCurrentBarPosition()
          transitionDisabledRef.value = false
        })
      }
    }, 64)
    provide<TabsInjection>(
      'NTabs',
      reactive({
        type: toRef(props, 'type') as Ref<'line' | 'card'>,
        value: mergedValueRef,
        removePanel,
        addPanel
      })
    )
    onFontsReady(() => {
      updateCurrentBarPosition()
    })
    return {
      mergedValue: mergedValueRef,
      compitableOnValueChange: compitableOnValueChangeRef,
      labelWrapperRef,
      labelBarRef,
      labelWrapperStyle: labelWrapperStyleRef,
      panels: panelsRef,
      transitionDisabled: transitionDisabledRef,
      handleTabClick,
      handleNavResize,
      handleCloseClick,
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
          '--tab-text-color': tabTextColor,
          '--tab-text-color-active': tabTextColorActive
        }
      })
    }
  },
  render () {
    return (
      <div
        class={[
          'n-tabs',
          `n-tabs--${this.type}-type`,
          `n-tabs--${this.labelSize}-size`,
          {
            'n-tabs--flex': this.justifyContent
          }
        ]}
        style={this.cssVars as CSSProperties}
      >
        <VResizeObserver onResize={this.handleNavResize}>
          {{
            default: () => (
              <VXScroll class="n-tabs-nav" style={this.navStyle}>
                {{
                  default: () => (
                    <div ref="labelWrapperRef" class="n-tabs-label-wrapper">
                      <div style={this.labelWrapperStyle}>
                        {this.panels.map((panel, i) => (
                          <div
                            key={i}
                            data-name={panel.name}
                            class={[
                              'n-tabs-label',
                              {
                                'n-tabs-label--active':
                                  this.mergedValue === panel.name,
                                'n-tabs-label--disabled': panel.disabled
                              }
                            ]}
                            onClick={(e) =>
                              this.handleTabClick(e, panel.name, panel.disabled)
                            }
                          >
                            <span class="n-tabs-label__label">
                              {panel.label}
                            </span>
                            {this.closable && this.type === 'card' ? (
                              <NBaseClose
                                class="n-tabs-label__close"
                                onClick={(e) => this.handleCloseClick(e, panel)}
                              />
                            ) : null}
                          </div>
                        ))}
                      </div>
                      {this.type === 'line' ? (
                        <div
                          ref="labelBarRef"
                          class={[
                            'n-tabs-label-bar',
                            {
                              'n-tabs-label-bar--transition-disabled': this
                                .transitionDisabled
                            }
                          ]}
                        />
                      ) : null}
                    </div>
                  )
                }}
              </VXScroll>
            )
          }}
        </VResizeObserver>
        {renderSlot(this.$slots, 'default')}
      </div>
    )
  }
})
