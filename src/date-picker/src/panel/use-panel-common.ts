import {
  computed,
  inject,
  ref,
  nextTick,
  PropType,
  ExtractPropTypes
} from 'vue'
import { useKeyboard } from 'vooks'
import {
  Value,
  datePickerInjectionKey,
  OnPanelUpdateValue,
  OnPanelUpdateValueImpl,
  OnClose,
  Shortcuts,
  DefaultTime
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
  onConfirm: Function,
  onClose: Function as PropType<OnClose>,
  onTabOut: Function,
  onUpdateValue: {
    type: Function as PropType<OnPanelUpdateValue>,
    required: true
  }
} as const

type UsePanelCommonProps = ExtractPropTypes<typeof usePanelCommonProps>

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function usePanelCommon (props: UsePanelCommonProps) {
  const {
    dateLocaleRef,
    timePickerSizeRef,
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
  function doConfirm (): void {
    const { onConfirm } = props
    if (onConfirm) onConfirm()
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
  }
  function handleFocusDetectorFocus (): void {
    doTabOut()
  }
  function disableTransitionOneTick (): void {
    if (props.active) {
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
    if (e.code === 'Tab' && e.target === selfRef.value && keyboardState.shift) {
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
  ): number | [number, number] {
    if (typeof shortcut === 'function') {
      return shortcut()
    }
    return shortcut
  }

  return {
    mergedTheme: mergedThemeRef,
    mergedClsPrefix: mergedClsPrefixRef,
    dateFnsOptions: dateFnsOptionsRef,
    timePickerSize: timePickerSizeRef,
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
    handleShortcutMouseleave: restorePendingValue
  }
}

export { usePanelCommon, usePanelCommonProps }
