import {
  type CSSProperties,
  type ComponentPublicInstance,
  type ExtractPropTypes,
  type PropType,
  TransitionGroup,
  type VNode,
  type VNodeChild,
  cloneVNode,
  computed,
  defineComponent,
  h,
  nextTick,
  onMounted,
  provide,
  ref,
  toRef,
  vShow,
  watch,
  watchEffect,
  withDirectives
} from 'vue'
import { VResizeObserver, VXScroll, type VXScrollInst } from 'vueuc'
import { throttle } from 'lodash-es'
import { onFontsReady, useCompitable, useMergedState } from 'vooks'
import { depx, getPadding } from 'seemly'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import {
  call,
  createKey,
  flatten,
  resolveWrappedSlot,
  warnOnce
} from '../../_utils'
import type { ExtractPublicPropTypes, MaybeArray } from '../../_utils'
import { tabsLight } from '../styles'
import type { TabsTheme } from '../styles'
import type {
  Addable,
  OnBeforeLeave,
  OnClose,
  OnCloseImpl,
  OnUpdateValue,
  OnUpdateValueImpl,
  TabsInst,
  TabsType
} from './interface'
import { tabsInjectionKey } from './interface'
import Tab from './Tab'
import type { tabPaneProps } from './TabPane'
import style from './styles/index.cssr'

type TabPaneProps = ExtractPropTypes<typeof tabPaneProps> & {
  'display-directive': 'if' | 'show' | 'show:lazy'
}

export const tabsProps = {
  ...(useTheme.props as ThemeProps<TabsTheme>),
  value: [String, Number] as PropType<string | number>,
  defaultValue: [String, Number] as PropType<string | number>,
  trigger: {
    type: String as PropType<'click' | 'hover'>,
    default: 'click'
  },
  type: {
    type: String as PropType<TabsType>,
    default: 'bar'
  },
  closable: Boolean,
  justifyContent: String as PropType<
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'center'
    | 'start'
    | 'end'
  >,
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium'
  },
  placement: {
    type: String as PropType<'top' | 'left' | 'right' | 'bottom'>,
    default: 'top'
  },
  tabStyle: [String, Object] as PropType<string | CSSProperties>,
  tabClass: String,
  addTabStyle: [String, Object] as PropType<string | CSSProperties>,
  addTabClass: String,
  barWidth: Number,
  paneClass: String,
  paneStyle: [String, Object] as PropType<string | CSSProperties>,
  paneWrapperClass: String,
  paneWrapperStyle: [String, Object] as PropType<string | CSSProperties>,
  addable: [Boolean, Object] as PropType<Addable>,
  tabsPadding: {
    type: Number,
    default: 0
  },
  animated: Boolean,
  onBeforeLeave: Function as PropType<OnBeforeLeave>,
  onAdd: Function as PropType<() => void>,
  'onUpdate:value': [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  onUpdateValue: [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  onClose: [Function, Array] as PropType<MaybeArray<OnClose>>,
  // deprecated
  labelSize: String as PropType<'small' | 'medium' | 'large'>,
  activeName: [String, Number] as PropType<string | number>,
  onActiveNameChange: [Function, Array] as PropType<
    MaybeArray<(value: string & number) => void>
  >
} as const

export type TabsProps = ExtractPublicPropTypes<typeof tabsProps>

export default defineComponent({
  name: 'Tabs',
  props: tabsProps,
  setup(props, { slots }) {
    if (__DEV__) {
      watchEffect(() => {
        if (props.labelSize !== undefined) {
          warnOnce(
            'tabs',
            '`label-size` is deprecated, please use `size` instead.'
          )
        }
        if (props.activeName !== undefined) {
          warnOnce(
            'tabs',
            '`active-name` is deprecated, please use `value` instead.'
          )
        }
        if (props.onActiveNameChange !== undefined) {
          warnOnce(
            'tabs',
            '`on-active-name-change` is deprecated, please use `on-update:value` instead.'
          )
        }
      })
    }

    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const themeRef = useTheme(
      'Tabs',
      '-tabs',
      style,
      tabsLight,
      props,
      mergedClsPrefixRef
    )

    const tabsElRef = ref<HTMLElement | null>(null)
    const barElRef = ref<HTMLElement | null>(null)
    const scrollWrapperElRef = ref<HTMLElement | null>(null)
    const addTabInstRef = ref<ComponentPublicInstance | null>(null)
    const xScrollInstRef = ref<(VXScrollInst & ComponentPublicInstance) | null>(
      null
    )
    const yScrollElRef = ref<HTMLElement | null>(null)

    const startReachedRef = ref(true)
    const endReachedRef = ref(true)

    const compitableSizeRef = useCompitable(props, ['labelSize', 'size'])
    const compitableValueRef = useCompitable(props, ['activeName', 'value'])
    const uncontrolledValueRef = ref(
      compitableValueRef.value
      ?? props.defaultValue
      ?? (slots.default
        ? ((flatten((slots as any).default() as VNodeChild[])[0] as any)
            ?.props?.name as string | number)
        : null)
    )
    const mergedValueRef = useMergedState(
      compitableValueRef,
      uncontrolledValueRef
    )

    const tabChangeIdRef = { id: 0 }

    const tabWrapperStyleRef = computed(() => {
      if (!props.justifyContent || props.type === 'card')
        return undefined
      return {
        display: 'flex',
        justifyContent: props.justifyContent
      }
    })

    watch(mergedValueRef, () => {
      tabChangeIdRef.id = 0
      updateCurrentBarStyle()
      updateCurrentScrollPosition()
    })

    function getCurrentEl(): HTMLElement | null {
      const { value } = mergedValueRef
      if (value === null)
        return null
      const tabEl = tabsElRef.value?.querySelector(`[data-name="${value}"]`)
      return tabEl as HTMLElement | null
    }
    function updateBarStyle(tabEl: HTMLElement): void {
      if (props.type === 'card')
        return
      const { value: barEl } = barElRef
      if (!barEl)
        return
      const barIsHide = barEl.style.opacity === '0'
      if (tabEl) {
        const disabledClassName = `${mergedClsPrefixRef.value}-tabs-bar--disabled`
        const { barWidth, placement } = props
        if (tabEl.dataset.disabled === 'true') {
          barEl.classList.add(disabledClassName)
        }
        else {
          barEl.classList.remove(disabledClassName)
        }
        if (['top', 'bottom'].includes(placement)) {
          clearBarStyle(['top', 'maxHeight', 'height'])
          if (typeof barWidth === 'number' && tabEl.offsetWidth >= barWidth) {
            const offsetDiffLeft
              = Math.floor((tabEl.offsetWidth - barWidth) / 2) + tabEl.offsetLeft
            barEl.style.left = `${offsetDiffLeft}px`
            barEl.style.maxWidth = `${barWidth}px`
          }
          else {
            barEl.style.left = `${tabEl.offsetLeft}px`
            barEl.style.maxWidth = `${tabEl.offsetWidth}px`
          }
          barEl.style.width = '8192px'
          if (barIsHide) {
            barEl.style.transition = 'none'
          }
          void barEl.offsetWidth
          if (barIsHide) {
            barEl.style.transition = ''
            barEl.style.opacity = '1'
          }
        }
        else {
          clearBarStyle(['left', 'maxWidth', 'width'])
          if (typeof barWidth === 'number' && tabEl.offsetHeight >= barWidth) {
            const offsetDiffTop
              = Math.floor((tabEl.offsetHeight - barWidth) / 2) + tabEl.offsetTop
            barEl.style.top = `${offsetDiffTop}px`
            barEl.style.maxHeight = `${barWidth}px`
          }
          else {
            barEl.style.top = `${tabEl.offsetTop}px`
            barEl.style.maxHeight = `${tabEl.offsetHeight}px`
          }
          barEl.style.height = '8192px'
          if (barIsHide) {
            barEl.style.transition = 'none'
          }
          void barEl.offsetHeight
          if (barIsHide) {
            barEl.style.transition = ''
            barEl.style.opacity = '1'
          }
        }
      }
    }
    function hideBarStyle(): void {
      if (props.type === 'card')
        return
      const { value: barEl } = barElRef
      if (!barEl)
        return
      barEl.style.opacity = '0'
    }
    function clearBarStyle(styleProps: string[]): void {
      const { value: barEl } = barElRef
      if (!barEl)
        return
      for (const prop of styleProps) {
        barEl.style[prop as any] = ''
      }
    }
    function updateCurrentBarStyle(): void {
      if (props.type === 'card')
        return
      const tabEl = getCurrentEl()
      if (tabEl) {
        updateBarStyle(tabEl)
      }
      else {
        hideBarStyle()
      }
    }
    function updateCurrentScrollPosition(): void {
      const scrollWrapperEl: HTMLElement | undefined = xScrollInstRef.value?.$el
      if (!scrollWrapperEl)
        return
      const tabEl = getCurrentEl()
      if (!tabEl)
        return
      const {
        scrollLeft: scrollWrapperElScrollLeft,
        offsetWidth: scrollWrapperElOffsetWidth
      } = scrollWrapperEl
      const { offsetLeft: tabElOffsetLeft, offsetWidth: tabElOffsetWidth }
        = tabEl
      if (scrollWrapperElScrollLeft > tabElOffsetLeft) {
        scrollWrapperEl.scrollTo({
          top: 0,
          left: tabElOffsetLeft,
          behavior: 'smooth'
        })
      }
      else if (
        tabElOffsetLeft + tabElOffsetWidth
        > scrollWrapperElScrollLeft + scrollWrapperElOffsetWidth
      ) {
        scrollWrapperEl.scrollTo({
          top: 0,
          left: tabElOffsetLeft + tabElOffsetWidth - scrollWrapperElOffsetWidth,
          behavior: 'smooth'
        })
      }
    }

    const tabsPaneWrapperRef = ref<HTMLElement | null>(null)
    let fromHeight = 0
    let hangingTransition: (() => void) | null = null
    function onAnimationBeforeLeave(el: HTMLElement): void {
      const tabsPaneWrapperEl = tabsPaneWrapperRef.value
      if (tabsPaneWrapperEl) {
        fromHeight = el.getBoundingClientRect().height
        const fromHeightPx = `${fromHeight}px`
        const applyFromStyle = (): void => {
          tabsPaneWrapperEl.style.height = fromHeightPx
          tabsPaneWrapperEl.style.maxHeight = fromHeightPx
        }
        if (!hangingTransition) {
          hangingTransition = applyFromStyle
        }
        else {
          applyFromStyle()
          hangingTransition()
          hangingTransition = null
        }
      }
    }
    function onAnimationEnter(el: HTMLElement): void {
      const tabsPaneWrapperEl = tabsPaneWrapperRef.value
      if (tabsPaneWrapperEl) {
        const targetHeight = el.getBoundingClientRect().height
        const applyTargetStyle = (): void => {
          void document.body.offsetHeight
          tabsPaneWrapperEl.style.maxHeight = `${targetHeight}px`
          tabsPaneWrapperEl.style.height = `${Math.max(
            fromHeight,
            targetHeight
          )}px`
        }
        if (!hangingTransition) {
          hangingTransition = applyTargetStyle
        }
        else {
          hangingTransition()
          hangingTransition = null
          applyTargetStyle()
        }
      }
    }
    function onAnimationAfterEnter(): void {
      const tabsPaneWrapperEl = tabsPaneWrapperRef.value
      if (tabsPaneWrapperEl) {
        tabsPaneWrapperEl.style.maxHeight = ''
        tabsPaneWrapperEl.style.height = ''
        const { paneWrapperStyle } = props
        if (typeof paneWrapperStyle === 'string') {
          tabsPaneWrapperEl.style.cssText = paneWrapperStyle
        }
        else if (paneWrapperStyle) {
          const { maxHeight, height } = paneWrapperStyle
          if (maxHeight !== undefined) {
            tabsPaneWrapperEl.style.maxHeight = maxHeight as string
          }
          if (height !== undefined) {
            tabsPaneWrapperEl.style.height = height as string
          }
        }
      }
    }

    const renderNameListRef: { value: Array<string | number> } = { value: [] }
    const animationDirectionRef = ref<'next' | 'prev'>('next')
    function activateTab(panelName: string | number): void {
      const currentValue = mergedValueRef.value
      let dir: 'next' | 'prev' = 'next'
      for (const name of renderNameListRef.value) {
        if (name === currentValue) {
          break
        }
        if (name === panelName) {
          dir = 'prev'
          break
        }
      }
      animationDirectionRef.value = dir
      doUpdateValue(panelName)
    }
    function doUpdateValue(panelName: string | number): void {
      const {
        onActiveNameChange,
        onUpdateValue,
        'onUpdate:value': _onUpdateValue
      } = props
      if (onActiveNameChange) {
        call(onActiveNameChange as OnUpdateValueImpl, panelName)
      }
      if (onUpdateValue)
        call(onUpdateValue as OnUpdateValueImpl, panelName)
      if (_onUpdateValue)
        call(_onUpdateValue as OnUpdateValueImpl, panelName)
      uncontrolledValueRef.value = panelName
    }
    function handleClose(panelName: string | number): void {
      const { onClose } = props
      if (onClose)
        call(onClose as OnCloseImpl, panelName)
    }

    let firstTimeUpdatePosition = true
    function updateBarPositionInstantly(): void {
      const { value: barEl } = barElRef
      if (!barEl)
        return
      if (!firstTimeUpdatePosition)
        firstTimeUpdatePosition = false
      const disableTransitionClassName = 'transition-disabled'
      barEl.classList.add(disableTransitionClassName)
      updateCurrentBarStyle()
      // here we don't need to force layout after update bar style
      // since deriveScrollShadow will force layout
      barEl.classList.remove(disableTransitionClassName)
    }

    const segmentCapsuleElRef = ref<HTMLElement | null>(null)

    function updateSegmentPosition({
      transitionDisabled
    }: {
      transitionDisabled: boolean
    }): void {
      const tabsEl = tabsElRef.value
      if (!tabsEl)
        return
      if (transitionDisabled)
        tabsEl.classList.add('transition-disabled')
      const activeTabEl = getCurrentEl()
      if (activeTabEl && segmentCapsuleElRef.value) {
        // move segment capsule to match the position of the active tab
        segmentCapsuleElRef.value.style.width = `${activeTabEl.offsetWidth}px`
        segmentCapsuleElRef.value.style.height = `${activeTabEl.offsetHeight}px`
        segmentCapsuleElRef.value.style.transform = `translateX(${
          activeTabEl.offsetLeft - depx(getComputedStyle(tabsEl).paddingLeft)
        }px)`
        if (transitionDisabled) {
          void segmentCapsuleElRef.value.offsetWidth
        }
      }
      if (transitionDisabled) {
        tabsEl.classList.remove('transition-disabled')
      }
    }

    watch([mergedValueRef], () => {
      if (props.type === 'segment') {
        void nextTick(() => {
          updateSegmentPosition({
            transitionDisabled: false
          })
        })
      }
    })

    onMounted(() => {
      if (props.type === 'segment') {
        updateSegmentPosition({
          transitionDisabled: true
        })
      }
    })

    let memorizedWidth = 0
    function _handleNavResize(entry: ResizeObserverEntry): void {
      if (entry.contentRect.width === 0 && entry.contentRect.height === 0) {
        return
      }
      if (memorizedWidth === entry.contentRect.width) {
        return
      }
      memorizedWidth = entry.contentRect.width
      const { type } = props
      if (type === 'line' || type === 'bar') {
        if (
          firstTimeUpdatePosition
          || props.justifyContent?.startsWith('space')
        ) {
          updateBarPositionInstantly()
        }
      }
      if (type !== 'segment') {
        const { placement } = props
        deriveScrollShadow(
          (placement === 'top' || placement === 'bottom'
            ? (xScrollInstRef.value?.$el as undefined | HTMLElement)
            : yScrollElRef.value) || null
        )
      }
    }
    const handleNavResize = throttle(_handleNavResize, 64)
    watch([() => props.justifyContent, () => props.size], () => {
      void nextTick(() => {
        const { type } = props
        if (type === 'line' || type === 'bar') {
          updateBarPositionInstantly()
        }
      })
    })

    const addTabFixedRef = ref(false)
    function _handleTabsResize(entry: ResizeObserverEntry): void {
      const {
        target,
        contentRect: { width, height }
      } = entry
      const containerWidth = target.parentElement!.parentElement!.offsetWidth
      const containerHeight = target.parentElement!.parentElement!.offsetHeight
      // console.log(target, target.parentElement, width, containerWidth)
      const { placement } = props
      if (!addTabFixedRef.value) {
        if (placement === 'top' || placement === 'bottom') {
          if (containerWidth < width) {
            addTabFixedRef.value = true
          }
        }
        else {
          if (containerHeight < height) {
            addTabFixedRef.value = true
          }
        }
      }
      else {
        const { value: addTabInst } = addTabInstRef
        if (!addTabInst)
          return
        if (placement === 'top' || placement === 'bottom') {
          if (
            containerWidth - width
            > (addTabInst.$el as HTMLElement).offsetWidth
          ) {
            addTabFixedRef.value = false
          }
        }
        else {
          if (
            containerHeight - height
            > (addTabInst.$el as HTMLElement).offsetHeight
          ) {
            addTabFixedRef.value = false
          }
        }
      }
      deriveScrollShadow(
        (xScrollInstRef.value?.$el as undefined | HTMLElement) || null
      )
    }
    const handleTabsResize = throttle(_handleTabsResize, 64)

    function handleAdd(): void {
      const { onAdd } = props
      if (onAdd)
        onAdd()
      void nextTick(() => {
        const currentEl = getCurrentEl()
        const { value: xScrollInst } = xScrollInstRef
        if (!currentEl || !xScrollInst)
          return
        xScrollInst.scrollTo({
          left: currentEl.offsetLeft,
          top: 0,
          behavior: 'smooth'
        })
      })
    }

    function deriveScrollShadow(el: HTMLElement | null): void {
      if (!el)
        return
      const { placement } = props
      if (placement === 'top' || placement === 'bottom') {
        const { scrollLeft, scrollWidth, offsetWidth } = el
        startReachedRef.value = scrollLeft <= 0
        endReachedRef.value = scrollLeft + offsetWidth >= scrollWidth
      }
      else {
        const { scrollTop, scrollHeight, offsetHeight } = el
        startReachedRef.value = scrollTop <= 0
        endReachedRef.value = scrollTop + offsetHeight >= scrollHeight
      }
    }

    const handleScroll = throttle((e: Event) => {
      deriveScrollShadow(e.target as HTMLElement)
    }, 64)
    provide(tabsInjectionKey, {
      triggerRef: toRef(props, 'trigger'),
      tabStyleRef: toRef(props, 'tabStyle'),
      tabClassRef: toRef(props, 'tabClass'),
      addTabStyleRef: toRef(props, 'addTabStyle'),
      addTabClassRef: toRef(props, 'addTabClass'),
      paneClassRef: toRef(props, 'paneClass'),
      paneStyleRef: toRef(props, 'paneStyle'),
      mergedClsPrefixRef,
      typeRef: toRef(props, 'type'),
      closableRef: toRef(props, 'closable'),
      valueRef: mergedValueRef,
      tabChangeIdRef,
      onBeforeLeaveRef: toRef(props, 'onBeforeLeave'),
      activateTab,
      handleClose,
      handleAdd
    })
    onFontsReady(() => {
      updateCurrentBarStyle()
      updateCurrentScrollPosition()
    })

    // avoid useless rerender
    watchEffect(() => {
      const { value: el } = scrollWrapperElRef
      if (!el)
        return
      const { value: clsPrefix } = mergedClsPrefixRef
      const shadowStartClass = `${clsPrefix}-tabs-nav-scroll-wrapper--shadow-start`
      const shadowEndClass = `${clsPrefix}-tabs-nav-scroll-wrapper--shadow-end`
      if (startReachedRef.value) {
        el.classList.remove(shadowStartClass)
      }
      else {
        el.classList.add(shadowStartClass)
      }
      if (endReachedRef.value) {
        el.classList.remove(shadowEndClass)
      }
      else {
        el.classList.add(shadowEndClass)
      }
    })

    const exposedMethods: TabsInst = {
      syncBarPosition: () => {
        updateCurrentBarStyle()
      }
    }

    const handleSegmentResize = (): void => {
      updateSegmentPosition({
        transitionDisabled: true
      })
    }

    const cssVarsRef = computed(() => {
      const { value: size } = compitableSizeRef
      const { type } = props
      const typeSuffix = (
        {
          card: 'Card',
          bar: 'Bar',
          line: 'Line',
          segment: 'Segment'
        } as const
      )[type]
      const sizeType = `${size}${typeSuffix}` as const
      const {
        self: {
          barColor,
          closeIconColor,
          closeIconColorHover,
          closeIconColorPressed,
          tabColor,
          tabBorderColor,
          paneTextColor,
          tabFontWeight,
          tabBorderRadius,
          tabFontWeightActive,
          colorSegment,
          fontWeightStrong,
          tabColorSegment,
          closeSize,
          closeIconSize,
          closeColorHover,
          closeColorPressed,
          closeBorderRadius,
          [createKey('panePadding', size)]: panePadding,
          [createKey('tabPadding', sizeType)]: tabPadding,
          [createKey('tabPaddingVertical', sizeType)]: tabPaddingVertical,
          [createKey('tabGap', sizeType)]: tabGap,
          [createKey('tabGap', `${sizeType}Vertical`)]: tabGapVertical,
          [createKey('tabTextColor', type)]: tabTextColor,
          [createKey('tabTextColorActive', type)]: tabTextColorActive,
          [createKey('tabTextColorHover', type)]: tabTextColorHover,
          [createKey('tabTextColorDisabled', type)]: tabTextColorDisabled,
          [createKey('tabFontSize', size)]: tabFontSize
        },
        common: { cubicBezierEaseInOut }
      } = themeRef.value
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-color-segment': colorSegment,
        '--n-bar-color': barColor,
        '--n-tab-font-size': tabFontSize,
        '--n-tab-text-color': tabTextColor,
        '--n-tab-text-color-active': tabTextColorActive,
        '--n-tab-text-color-disabled': tabTextColorDisabled,
        '--n-tab-text-color-hover': tabTextColorHover,
        '--n-pane-text-color': paneTextColor,
        '--n-tab-border-color': tabBorderColor,
        '--n-tab-border-radius': tabBorderRadius,
        '--n-close-size': closeSize,
        '--n-close-icon-size': closeIconSize,
        '--n-close-color-hover': closeColorHover,
        '--n-close-color-pressed': closeColorPressed,
        '--n-close-border-radius': closeBorderRadius,
        '--n-close-icon-color': closeIconColor,
        '--n-close-icon-color-hover': closeIconColorHover,
        '--n-close-icon-color-pressed': closeIconColorPressed,
        '--n-tab-color': tabColor,
        '--n-tab-font-weight': tabFontWeight,
        '--n-tab-font-weight-active': tabFontWeightActive,
        '--n-tab-padding': tabPadding,
        '--n-tab-padding-vertical': tabPaddingVertical,
        '--n-tab-gap': tabGap,
        '--n-tab-gap-vertical': tabGapVertical,
        '--n-pane-padding-left': getPadding(panePadding, 'left'),
        '--n-pane-padding-right': getPadding(panePadding, 'right'),
        '--n-pane-padding-top': getPadding(panePadding, 'top'),
        '--n-pane-padding-bottom': getPadding(panePadding, 'bottom'),
        '--n-font-weight-strong': fontWeightStrong,
        '--n-tab-color-segment': tabColorSegment
      }
    })

    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'tabs',
        computed(() => {
          return `${compitableSizeRef.value[0]}${props.type[0]}`
        }),
        cssVarsRef,
        props
      )
      : undefined

    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedValue: mergedValueRef,
      renderedNames: new Set<NonNullable<TabPaneProps['name']>>(),
      segmentCapsuleElRef,
      tabsPaneWrapperRef,
      tabsElRef,
      barElRef,
      addTabInstRef,
      xScrollInstRef,
      scrollWrapperElRef,
      addTabFixed: addTabFixedRef,
      tabWrapperStyle: tabWrapperStyleRef,
      handleNavResize,
      mergedSize: compitableSizeRef,
      handleScroll,
      handleTabsResize,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      animationDirection: animationDirectionRef,
      renderNameListRef,
      yScrollElRef,
      handleSegmentResize,
      onAnimationBeforeLeave,
      onAnimationEnter,
      onAnimationAfterEnter,
      onRender: themeClassHandle?.onRender,
      ...exposedMethods
    }
  },
  render() {
    const {
      mergedClsPrefix,
      type,
      placement,
      addTabFixed,
      addable,
      mergedSize,
      renderNameListRef,
      onRender,
      paneWrapperClass,
      paneWrapperStyle,
      $slots: { default: defaultSlot, prefix: prefixSlot, suffix: suffixSlot }
    } = this

    onRender?.()

    const tabPaneChildren = defaultSlot
      ? flatten(defaultSlot()).filter((v) => {
        return (v.type as any).__TAB_PANE__ === true
      })
      : []
    const tabChildren = defaultSlot
      ? flatten(defaultSlot()).filter((v) => {
        return (v.type as any).__TAB__ === true
      })
      : []
    const showPane = !tabChildren.length
    const isCard = type === 'card'
    const isSegment = type === 'segment'
    const mergedJustifyContent = !isCard && !isSegment && this.justifyContent
    renderNameListRef.value = []
    const scrollContent = (): JSX.Element => {
      const tabs = (
        <div
          style={this.tabWrapperStyle}
          class={`${mergedClsPrefix}-tabs-wrapper`}
        >
          {mergedJustifyContent ? null : (
            <div
              class={`${mergedClsPrefix}-tabs-scroll-padding`}
              style={
                placement === 'top' || placement === 'bottom'
                  ? { width: `${this.tabsPadding}px` }
                  : { height: `${this.tabsPadding}px` }
              }
            />
          )}
          {showPane
            ? tabPaneChildren.map((tabPaneVNode: any, index: number) => {
              renderNameListRef.value.push(
                tabPaneVNode.props.name as string | number
              )
              return justifyTabDynamicProps(
                <Tab
                  {...tabPaneVNode.props}
                  internalCreatedByPane={true}
                  internalLeftPadded={
                    index !== 0
                    && (!mergedJustifyContent
                      || mergedJustifyContent === 'center'
                      || mergedJustifyContent === 'start'
                      || mergedJustifyContent === 'end')
                  }
                >
                  {tabPaneVNode.children
                    ? {
                        default: tabPaneVNode.children.tab
                      }
                    : undefined}
                </Tab>
              )
            })
            : tabChildren.map((tabVNode: any, index: number) => {
              renderNameListRef.value.push(
                tabVNode.props.name as string | number
              )
              if (index !== 0 && !mergedJustifyContent) {
                return justifyTabDynamicProps(
                  createLeftPaddedTabVNode(tabVNode as VNode)
                )
              }
              else {
                return justifyTabDynamicProps(tabVNode as VNode)
              }
            })}
          {!addTabFixed && addable && isCard
            ? createAddTag(
              addable,
              (showPane ? tabPaneChildren.length : tabChildren.length) !== 0
            )
            : null}
          {mergedJustifyContent ? null : (
            <div
              class={`${mergedClsPrefix}-tabs-scroll-padding`}
              style={{ width: `${this.tabsPadding}px` }}
            />
          )}
        </div>
      )
      return (
        <div
          ref="tabsElRef"
          class={`${mergedClsPrefix}-tabs-nav-scroll-content`}
        >
          {isCard && addable ? (
            <VResizeObserver onResize={this.handleTabsResize}>
              {{
                default: () => tabs
              }}
            </VResizeObserver>
          ) : (
            tabs
          )}
          {isCard ? <div class={`${mergedClsPrefix}-tabs-pad`} /> : null}
          {isCard ? null : (
            <div ref="barElRef" class={`${mergedClsPrefix}-tabs-bar`} />
          )}
        </div>
      )
    }
    const resolvedPlacement = isSegment ? 'top' : placement
    return (
      <div
        class={[
          `${mergedClsPrefix}-tabs`,
          this.themeClass,
          `${mergedClsPrefix}-tabs--${type}-type`,
          `${mergedClsPrefix}-tabs--${mergedSize}-size`,
          mergedJustifyContent && `${mergedClsPrefix}-tabs--flex`,
          `${mergedClsPrefix}-tabs--${resolvedPlacement}`
        ]}
        style={this.cssVars as CSSProperties}
      >
        <div
          class={[
            // the class should be applied here since it's possible
            // to make tabs nested in tabs, style may influence each
            // other. adding a class will make it easy to write the
            // style.
            `${mergedClsPrefix}-tabs-nav--${type}-type`,
            `${mergedClsPrefix}-tabs-nav--${resolvedPlacement}`,
            `${mergedClsPrefix}-tabs-nav`
          ]}
        >
          {resolveWrappedSlot(
            prefixSlot,
            children =>
              children && (
                <div class={`${mergedClsPrefix}-tabs-nav__prefix`}>
                  {children}
                </div>
              )
          )}
          {isSegment ? (
            <VResizeObserver onResize={this.handleSegmentResize}>
              {{
                default: () => (
                  <div class={`${mergedClsPrefix}-tabs-rail`} ref="tabsElRef">
                    <div
                      class={`${mergedClsPrefix}-tabs-capsule`}
                      ref="segmentCapsuleElRef"
                    >
                      <div class={`${mergedClsPrefix}-tabs-wrapper`}>
                        <div class={`${mergedClsPrefix}-tabs-tab`} />
                      </div>
                    </div>
                    {showPane
                      ? tabPaneChildren.map(
                        (tabPaneVNode: any, index: number) => {
                          renderNameListRef.value.push(
                            tabPaneVNode.props.name as string | number
                          )
                          return (
                            <Tab
                              {...tabPaneVNode.props}
                              internalCreatedByPane={true}
                              internalLeftPadded={index !== 0}
                            >
                              {tabPaneVNode.children
                                ? {
                                    default: tabPaneVNode.children.tab
                                  }
                                : undefined}
                            </Tab>
                          )
                        }
                      )
                      : tabChildren.map((tabVNode: any, index: number) => {
                        renderNameListRef.value.push(
                          tabVNode.props.name as string | number
                        )
                        if (index === 0) {
                          return tabVNode
                        }
                        else {
                          return createLeftPaddedTabVNode(tabVNode as VNode)
                        }
                      })}
                  </div>
                )
              }}
            </VResizeObserver>
          ) : (
            <VResizeObserver onResize={this.handleNavResize}>
              {{
                default: () => (
                  <div
                    class={`${mergedClsPrefix}-tabs-nav-scroll-wrapper`}
                    ref="scrollWrapperElRef"
                  >
                    {['top', 'bottom'].includes(resolvedPlacement) ? (
                      <VXScroll
                        ref="xScrollInstRef"
                        onScroll={this.handleScroll}
                      >
                        {{
                          default: scrollContent
                        }}
                      </VXScroll>
                    ) : (
                      <div
                        class={`${mergedClsPrefix}-tabs-nav-y-scroll`}
                        onScroll={this.handleScroll}
                        ref="yScrollElRef"
                      >
                        {scrollContent()}
                      </div>
                    )}
                  </div>
                )
              }}
            </VResizeObserver>
          )}
          {addTabFixed && addable && isCard
            ? createAddTag(addable, true)
            : null}
          {resolveWrappedSlot(
            suffixSlot,
            children =>
              children && (
                <div class={`${mergedClsPrefix}-tabs-nav__suffix`}>
                  {children}
                </div>
              )
          )}
        </div>
        {showPane
        && (this.animated
          && (resolvedPlacement === 'top' || resolvedPlacement === 'bottom') ? (
              <div
                ref="tabsPaneWrapperRef"
                style={paneWrapperStyle}
                class={[`${mergedClsPrefix}-tabs-pane-wrapper`, paneWrapperClass]}
              >
                {filterMapTabPanes(
                  tabPaneChildren,
                  this.mergedValue,
                  this.renderedNames,
                  this.onAnimationBeforeLeave,
                  this.onAnimationEnter,
                  this.onAnimationAfterEnter,
                  this.animationDirection
                )}
              </div>
            ) : (
              filterMapTabPanes(
                tabPaneChildren,
                this.mergedValue,
                this.renderedNames
              )
            ))}
      </div>
    )
  }
})

function filterMapTabPanes(
  tabPaneVNodes: VNode[],
  value: string | number | null,
  renderedNames: Set<string | number>,
  onBeforeLeave?: (el: HTMLElement) => void,
  onEnter?: (el: HTMLElement) => void,
  onAfterEnter?: () => void,
  animationDirection?: 'next' | 'prev'
): VNode | VNode[] {
  const children: VNode[] = []
  tabPaneVNodes.forEach((vNode) => {
    const {
      name,
      displayDirective,
      'display-directive': _displayDirective
    } = vNode.props as TabPaneProps
    const matchDisplayDirective = (
      directive: TabPaneProps['displayDirective']
    ): boolean =>
      displayDirective === directive || _displayDirective === directive
    const show = value === name
    if (vNode.key !== undefined) {
      vNode.key = name
    }
    if (
      show
      || matchDisplayDirective('show')
      || (matchDisplayDirective('show:lazy') && renderedNames.has(name))
    ) {
      if (!renderedNames.has(name)) {
        renderedNames.add(name)
      }
      const useVShow = !matchDisplayDirective('if')
      children.push(useVShow ? withDirectives(vNode, [[vShow, show]]) : vNode)
    }
  })
  if (!animationDirection) {
    return children
  }
  return (
    <TransitionGroup
      name={`${animationDirection}-transition`}
      onBeforeLeave={onBeforeLeave as (el: Element) => void}
      onEnter={onEnter as (el: Element) => void}
      onAfterEnter={onAfterEnter}
    >
      {{ default: () => children }}
    </TransitionGroup>
  )
}

function createAddTag(addable: Addable, internalLeftPadded: boolean): VNode {
  return (
    <Tab
      ref="addTabInstRef"
      key="__addable"
      name="__addable"
      internalCreatedByPane
      internalAddable
      internalLeftPadded={internalLeftPadded}
      disabled={typeof addable === 'object' && addable.disabled}
    />
  )
}

function createLeftPaddedTabVNode(tabVNode: VNode): VNode {
  const modifiedVNode = cloneVNode(tabVNode)
  if (modifiedVNode.props) {
    modifiedVNode.props.internalLeftPadded = true
  }
  else {
    modifiedVNode.props = {
      internalLeftPadded: true
    }
  }
  return modifiedVNode
}

function justifyTabDynamicProps(
  tabVNode: {
    dynamicProps?: string[]
  } & VNode
): VNode {
  if (Array.isArray(tabVNode.dynamicProps)) {
    if (!tabVNode.dynamicProps.includes('internalLeftPadded')) {
      tabVNode.dynamicProps.push('internalLeftPadded')
    }
  }
  else {
    tabVNode.dynamicProps = ['internalLeftPadded']
  }
  return tabVNode
}
