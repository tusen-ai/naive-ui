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
  OnUpdateValue,
  DatePickerInjection,
  Value,
  OnUpdateValueImpl
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
    type: Function as PropType<OnUpdateValue>,
    required: true
  }
} as const

type UsePanelCommonProps = ExtractPropTypes<typeof usePanelCommonProps>

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function usePanelCommon (props: UsePanelCommonProps) {
  const NDatePicker = inject<DatePickerInjection>(
    'NDatePicker'
  ) as DatePickerInjection
  const dateFnsOptionsRef = computed(() => {
    return {
      locale: NDatePicker.dateLocale.locale
    }
  })
  const transitionDisabledRef = ref(false)
  const memorizedValueRef = ref(props.value)
  const selfRef = ref<HTMLElement | null>(null)
  const keyboardState = useKeyboard()
  function doConfirm (): void {
    const { onConfirm } = props
    if (onConfirm) onConfirm()
  }
  function doUpdateValue (value: Value | null): void {
    const { onUpdateValue } = props
    if (onUpdateValue) (onUpdateValue as OnUpdateValueImpl)(value)
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
    doUpdateValue(null)
  }
  function handleFocusDetectorFocus (): void {
    doTabOut()
  }
  function disableTransitionOneTick (): void {
    if (props.active) {
      transitionDisabledRef.value = true
      void nextTick(() => {
        const { value: el } = selfRef
        void el?.offsetWidth
        transitionDisabledRef.value = false
      })
    } else {
      transitionDisabledRef.value = false
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
    dateFnsOptions: dateFnsOptionsRef,
    timePickerSize: computed(() => NDatePicker.timePickerSize),
    transitionDisabled: transitionDisabledRef,
    memorizedValue: memorizedValueRef,
    selfRef,
    locale: NDatePicker.locale,
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
