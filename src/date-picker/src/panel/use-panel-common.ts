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
  OnPanelUpdateValueImpl
} from '../interface'

const DATE_FORMAT = 'yyyy-MM-dd'
const TIME_FORMAT = 'HH:mm:ss'

const usePanelCommonProps = {
  active: Boolean,
  dateFormat: {
    type: String,
    default: DATE_FORMAT
  },
  timeFormat: {
    type: String,
    default: TIME_FORMAT
  },
  value: {
    type: [Array, Number] as PropType<Value | null>,
    default: null
  },
  onConfirm: Function,
  onClose: Function,
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
  function doClose (): void {
    const { onClose } = props
    if (onClose) onClose()
  }
  function doTabOut (): void {
    const { onTabOut } = props
    if (onTabOut) onTabOut()
  }
  function handleClearClick (): void {
    doUpdateValue(null, true)
    doClose()
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
    handlePanelFocus
  }
}

usePanelCommon.props = usePanelCommonProps

export { usePanelCommon }
