import { computed, inject, ref, nextTick } from 'vue'
import { useKeyboard } from 'vooks'
import {
  FastForwardIcon,
  FastBackwardIcon,
  BackwardIcon,
  ForwardIcon
} from '../../../_base/icons'
import { NBaseFocusDetector } from '../../../_base'

const daysKey = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const DATETIME_FORMAT = 'yyyy-MM-dd HH:mm:ss'

// const DATE_FORMAT = 'yyyy-MM-dd'
// const DATE_VALIDATE_FORMAT = [
//   'YYYY-MM-DD',
//   'YYYY-MM-D',
//   'YYYY-M-D',
//   'YYYY-M-DD'
// ]

function usePanelCommon (props) {
  const NDatePicker = inject('NDatePicker')
  const transitionDisabledRef = ref(false)
  const memorizedValueRef = ref(props.value)
  const selfRef = ref(null)
  const keyboardStateRef = useKeyboard()
  function doConfirm (...args) {
    const { onConfirm } = props
    if (onConfirm) onConfirm(...args)
  }
  function doUpdateValue (...args) {
    const { 'onUpdate:value': onUpdateValue } = props
    if (onUpdateValue) onUpdateValue(...args)
  }
  function doClose (...args) {
    const { onClose } = props
    if (onClose) onClose(...args)
  }
  function doTabOut (...args) {
    const { onTabOut } = props
    if (onTabOut) onTabOut(...args)
  }
  function clearValue () {
    doUpdateValue(null)
  }
  function handleFocusDetectorFocus (e) {
    doTabOut(e)
  }
  function disableTransitionOneTick () {
    if (props.active) {
      transitionDisabledRef.value = true
      nextTick(() => {
        const { value: el } = selfRef
        el && void el.offsetWidth
        transitionDisabledRef.value = false
      })
    } else {
      transitionDisabledRef.value = false
    }
  }
  function handlePanelKeyDown (e) {
    if (
      e.key === 'Tab' &&
      e.target === selfRef.value &&
      keyboardStateRef.value.shift
    ) {
      e.preventDefault()
      doTabOut()
    }
  }
  function handlePanelFocus (e) {
    const { value: el } = selfRef
    if (
      keyboardStateRef.value.tab &&
      e.target === el &&
      el.contains(e.relatedTarget)
    ) {
      doTabOut()
    }
  }
  return {
    timePickerSize: computed(() => NDatePicker.timePickerSize),
    weekdays: computed(() =>
      daysKey.map((weekday) => NDatePicker.locale[weekday])
    ),
    transitionDisabled: transitionDisabledRef,
    memorizedValue: memorizedValueRef,
    doConfirm,
    doClose,
    doUpdateValue,
    doTabOut,
    clearValue,
    handleFocusDetectorFocus,
    disableTransitionOneTick,
    handlePanelKeyDown,
    handlePanelFocus
  }
}

usePanelCommon.props = {
  active: {
    type: Boolean,
    default: undefined
  },
  onConfirm: {
    type: Function,
    default: undefined
  },
  'onUpdate:value': {
    type: Function,
    default: undefined
  },
  onClose: {
    type: Function,
    default: undefined
  },
  onTabOut: {
    type: Function,
    default: undefined
  },
  format: {
    type: String,
    default: DATETIME_FORMAT
  }
}

usePanelCommon.components = {
  NBaseFocusDetector,
  FastForwardIcon,
  FastBackwardIcon,
  BackwardIcon,
  ForwardIcon
}

export { usePanelCommon }
