import {
  computed,
  inject,
  ref,
  nextTick,
  type PropType,
  type ExtractPropTypes
} from 'vue'
import { useKeyboard } from 'vooks'
import {
  type Value,
  datePickerInjectionKey,
  type OnPanelUpdateValue,
  type OnPanelUpdateValueImpl,
  type OnClose,
  type Shortcuts,
  type DefaultTime
} from '../interface'

const TIME_FORMAT = 'HH:mm:ss'

const usePanelCommonProps = {
  active: Boolean,
  dateFormat: String,
  timeFormat: {
    type: String,
    value: TIME_FORMAT
  },
  value: {
    type: [Array, Number] as PropType<Value | null>,
    default: null
  },
  shortcuts: Object as PropType<Shortcuts>,
  defaultTime: [Number, String, Array] as PropType<DefaultTime>,
  onClear: Function,
  onConfirm: Function as PropType<(value: Value | null) => void>,
  onClose: Function as PropType<OnClose>,
  onTabOut: Function,
  onUpdateValue: {
    type: Function as PropType<OnPanelUpdateValue>,
    required: true
  },
  themeClass: String,
  onRender: Function as PropType<(() => void) | undefined>,
  panel: Boolean,
  onNextMonth: Function as PropType<() => void>,
  onPrevMonth: Function as PropType<() => void>,
  onNextYear: Function as PropType<() => void>,
  onPrevYear: Function as PropType<() => void>
} as const

type UsePanelCommonProps = ExtractPropTypes<typeof usePanelCommonProps>

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function usePanelCommon (props: UsePanelCommonProps) {
  const {
    dateLocaleRef,
    timePickerSizeRef,
    timePickerPropsRef,
    localeRef,
    mergedClsPrefixRef,
    mergedThemeRef
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  } = inject(datePickerInjectionKey)!
  const dateFnsOptionsRef = computed(() => {
    return {
      locale: dateLocaleRef.value.locale
    }
  })
  const selfRef = ref<HTMLElement | null>(null)
  const keyboardState = useKeyboard()
  function doClear (): void {
    const { onClear } = props
    if (onClear) onClear()
  }
  function doConfirm (): void {
    const { onConfirm, value } = props
    if (onConfirm) onConfirm(value)
  }
  function doUpdateValue (value: Value | null, doUpdate: boolean): void {
    const { onUpdateValue } = props
    ;(onUpdateValue as OnPanelUpdateValueImpl)(value, doUpdate)
  }
  function doClose (disableUpdateOnClose: boolean = false): void {
    const { onClose } = props
    if (onClose) onClose(disableUpdateOnClose)
  }
  function doTabOut (): void {
    const { onTabOut } = props
    if (onTabOut) onTabOut()
  }
  function handleClearClick (): void {
    doUpdateValue(null, true)
    doClose(true)
    doClear()
  }
  function handleFocusDetectorFocus (): void {
    doTabOut()
  }
  function disableTransitionOneTick (): void {
    if (props.active || props.panel) {
      void nextTick(() => {
        const { value: selfEl } = selfRef
        if (!selfEl) return
        const dateEls = selfEl.querySelectorAll('[data-n-date]')
        dateEls.forEach((el) => {
          el.classList.add('transition-disabled')
        })
        void selfEl.offsetWidth
        dateEls.forEach((el) => {
          el.classList.remove('transition-disabled')
        })
      })
    }
  }
  function handlePanelKeyDown (e: KeyboardEvent): void {
    if (e.key === 'Tab' && e.target === selfRef.value && keyboardState.shift) {
      e.preventDefault()
      doTabOut()
    }
  }
  function handlePanelFocus (e: FocusEvent): void {
    const { value: el } = selfRef
    if (
      keyboardState.tab &&
      e.target === el &&
      el?.contains(e.relatedTarget as Node)
    ) {
      doTabOut()
    }
  }
  let cachedValue: Value | null = null
  let cached = false
  function cachePendingValue (): void {
    cachedValue = props.value
    cached = true
  }
  function clearPendingValue (): void {
    cached = false
  }
  function restorePendingValue (): void {
    if (cached) {
      doUpdateValue(cachedValue, false)
      cached = false
    }
  }
  function getShortcutValue (
    shortcut: Shortcuts[string]
  ): number | [number, number] | readonly [number, number] {
    if (typeof shortcut === 'function') {
      return shortcut()
    }
    return shortcut
  }

  const showMonthYearPanel = ref(false)
  function handleOpenQuickSelectMonthPanel (): void {
    showMonthYearPanel.value = !showMonthYearPanel.value
  }
  return {
    mergedTheme: mergedThemeRef,
    mergedClsPrefix: mergedClsPrefixRef,
    dateFnsOptions: dateFnsOptionsRef,
    timePickerSize: timePickerSizeRef,
    timePickerProps: timePickerPropsRef,
    selfRef,
    locale: localeRef,
    doConfirm,
    doClose,
    doUpdateValue,
    doTabOut,
    handleClearClick,
    handleFocusDetectorFocus,
    disableTransitionOneTick,
    handlePanelKeyDown,
    handlePanelFocus,
    cachePendingValue,
    clearPendingValue,
    restorePendingValue,
    getShortcutValue,
    handleShortcutMouseleave: restorePendingValue,
    showMonthYearPanel,
    handleOpenQuickSelectMonthPanel
  }
}

export { usePanelCommon, usePanelCommonProps }
