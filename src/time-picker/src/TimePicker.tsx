import type { Locale } from 'date-fns'
import type { CSSProperties, PropType, VNode } from 'vue'
import type { FollowerPlacement } from 'vueuc'
import type { ThemeProps } from '../../_mixins'
import type { ExtractPublicPropTypes, MaybeArray } from '../../_utils'
import type { FormValidationStatus } from '../../form/src/public-types'
import type { InputInst } from '../../input'
import type { TimePickerTheme } from '../styles'
import type {
  IsHourDisabled,
  IsMinuteDisabled,
  IsSecondDisabled,
  ItemValue,
  OnUpdateFormattedValue,
  OnUpdateFormattedValueImpl,
  OnUpdateRangeFormattedValue,
  OnUpdateRangeFormattedValueImpl,
  OnUpdateRangeValue,
  OnUpdateRangeValueImpl,
  OnUpdateValue,
  OnUpdateValueImpl,
  PanelRef,
  Size,
  TimePickerInst
} from './interface'
import {
  format,
  getHours,
  getMilliseconds,
  getMinutes,
  getSeconds,
  getTime,
  isValid,
  set,
  setHours,
  setMinutes,
  setSeconds,
  startOfHour,
  startOfMinute,
  startOfSecond
} from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'
import { getPreciseEventTarget, happensIn } from 'seemly'
import { clickoutside } from 'vdirs'
import { useIsMounted, useKeyboard, useMergedState } from 'vooks'
import {
  computed,
  defineComponent,
  h,
  nextTick,
  provide,
  ref,
  toRef,
  Transition,
  watch,
  watchEffect,
  withDirectives
} from 'vue'
import { VBinder, VFollower, VTarget } from 'vueuc'
import { NBaseIcon } from '../../_internal'
import { TimeIcon, ToIcon } from '../../_internal/icons'
import {
  useConfig,
  useFormItem,
  useLocale,
  useTheme,
  useThemeClass
} from '../../_mixins'
import {
  call,
  markEventEffectPerformed,
  useAdjustedTo,
  warnOnce
} from '../../_utils'
import { strictParse } from '../../date-picker/src/utils'
import { NInput } from '../../input'
import { timePickerLight } from '../styles'
import { timePickerInjectionKey } from './interface'
import Panel from './Panel'
import RangePanel from './RangePanel'
import style from './styles/index.cssr'
import { findSimilarTime, isTimeInStep } from './utils'

function validateUnits(value: MaybeArray<number>, max: number): boolean {
  if (value === undefined) {
    return true
  }
  if (Array.isArray(value)) {
    return value.every(v => v >= 0 && v <= max)
  }
  else {
    return value >= 0 && value <= max
  }
}

export const timePickerProps = {
  ...(useTheme.props as ThemeProps<TimePickerTheme>),
  to: useAdjustedTo.propTo,
  type: {
    type: String as PropType<'time' | 'timerange'>,
    default: 'time'
  },
  bordered: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  actions: Array as PropType<Array<'clear' | 'now' | 'confirm'> | null>,
  defaultValue: {
    type: [Number, Array] as PropType<number | [number, number] | null>,
    default: null
  },
  defaultFormattedValue: [String, Array] as PropType<string | [string, string]>,
  placeholder: String,
  startPlaceholder: String,
  endPlaceholder: String,
  separator: String,
  placement: {
    type: String as PropType<FollowerPlacement>,
    default: 'bottom-start'
  },
  value: [Number, Array] as PropType<number | [number, number] | null>,
  format: {
    type: String,
    default: 'HH:mm:ss'
  },
  valueFormat: String,
  formattedValue: [String, Array] as PropType<string | [string, string] | null>,
  isHourDisabled: Function as PropType<IsHourDisabled>,
  size: String as PropType<Size>,
  isMinuteDisabled: Function as PropType<IsMinuteDisabled>,
  isSecondDisabled: Function as PropType<IsSecondDisabled>,
  inputReadonly: Boolean,
  clearable: Boolean,
  status: String as PropType<FormValidationStatus>,
  'onUpdate:value': [Function, Array] as PropType<
    MaybeArray<OnUpdateValue> | MaybeArray<OnUpdateRangeValue>
  >,
  onUpdateValue: [Function, Array] as PropType<
    MaybeArray<OnUpdateValue> | MaybeArray<OnUpdateRangeValue>
  >,
  'onUpdate:show': [Function, Array] as PropType<
    MaybeArray<(show: boolean) => void>
  >,
  onUpdateShow: [Function, Array] as PropType<
    MaybeArray<(show: boolean) => void>
  >,
  onUpdateFormattedValue: [Function, Array] as PropType<
    MaybeArray<OnUpdateFormattedValue> | MaybeArray<OnUpdateRangeFormattedValue>
  >,
  'onUpdate:formattedValue': [Function, Array] as PropType<
    MaybeArray<OnUpdateFormattedValue> | MaybeArray<OnUpdateRangeFormattedValue>
  >,
  onBlur: [Function, Array] as PropType<MaybeArray<(e: FocusEvent) => void>>,
  onConfirm: [Function, Array] as PropType<
    | MaybeArray<(value: number & null, formattedValue: string & null) => void>
    | MaybeArray<
      (
        value: [number, number] & null,
        formattedValue: [string, string] & null
      ) => void
    >
  >,
  onClear: Function as PropType<() => void>,
  onFocus: [Function, Array] as PropType<MaybeArray<(e: FocusEvent) => void>>,
  // https://www.iana.org/time-zones
  timeZone: String,
  showIcon: {
    type: Boolean,
    default: true
  },
  disabled: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  show: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  hours: {
    type: [Number, Array] as PropType<MaybeArray<number>>,
    validator: (value: MaybeArray<number>) => validateUnits(value, 23)
  },
  minutes: {
    type: [Number, Array] as PropType<MaybeArray<number>>,
    validator: (value: MaybeArray<number>) => validateUnits(value, 59)
  },
  seconds: {
    type: [Number, Array] as PropType<MaybeArray<number>>,
    validator: (value: MaybeArray<number>) => validateUnits(value, 59)
  },
  use12Hours: Boolean,
  // private
  stateful: {
    type: Boolean,
    default: true
  },
  // deprecated
  onChange: [Function, Array] as PropType<MaybeArray<OnUpdateValue> | undefined>
}

export type TimePickerProps = ExtractPublicPropTypes<typeof timePickerProps>

export interface TimePickerSlots {
  default?: () => VNode[]
  icon?: () => VNode[]
}

export default defineComponent({
  name: 'TimePicker',
  props: timePickerProps,
  setup(props) {
    if (__DEV__) {
      watchEffect(() => {
        if (props.onChange !== undefined) {
          warnOnce(
            'time-picker',
            '`on-change` is deprecated, please use `on-update:value` instead.'
          )
        }
      })
    }

    const {
      mergedBorderedRef,
      mergedClsPrefixRef,
      namespaceRef,
      inlineThemeDisabled
    } = useConfig(props)
    const { localeRef, dateLocaleRef } = useLocale('TimePicker')
    const formItem = useFormItem(props)
    const { mergedSizeRef, mergedDisabledRef, mergedStatusRef } = formItem
    const themeRef = useTheme(
      'TimePicker',
      '-time-picker',
      style,
      timePickerLight,
      props,
      mergedClsPrefixRef
    )

    const keyboardState = useKeyboard()

    const isRangeRef = computed(() => props.type === 'timerange')

    const inputInstRef = ref<InputInst | null>(null)
    const panelInstRef = ref<PanelRef | null>(null)

    const dateFnsOptionsRef = computed(() => {
      return {
        locale: dateLocaleRef.value.locale
      }
    })

    function getTimestampFromFormattedValue(
      value: string | null
    ): number | null {
      if (value === null)
        return null
      return strictParse(
        value,
        props.valueFormat || props.format,
        new Date(),
        dateFnsOptionsRef.value
      ).getTime()
    }

    function getRangeTimestampFromFormattedValue(
      value: [string, string] | null
    ): [number, number] | null {
      if (value === null)
        return null
      const start = strictParse(
        value[0],
        props.valueFormat || props.format,
        new Date(),
        dateFnsOptionsRef.value
      ).getTime()
      const end = strictParse(
        value[1],
        props.valueFormat || props.format,
        new Date(),
        dateFnsOptionsRef.value
      ).getTime()
      return [start, end]
    }

    const { defaultValue, defaultFormattedValue } = props

    const uncontrolledValueRef = ref(
      defaultFormattedValue !== undefined
        ? Array.isArray(defaultFormattedValue)
          ? getRangeTimestampFromFormattedValue(defaultFormattedValue)
          : getTimestampFromFormattedValue(defaultFormattedValue)
        : defaultValue
    )
    const mergedValueRef = computed<number | [number, number] | null>(() => {
      const { formattedValue } = props
      if (formattedValue !== undefined) {
        if (Array.isArray(formattedValue)) {
          return getRangeTimestampFromFormattedValue(formattedValue)
        }
        return getTimestampFromFormattedValue(formattedValue)
      }
      const { value } = props
      if (value !== undefined) {
        return value
      }
      return uncontrolledValueRef.value as number | [number, number] | null
    })

    const singleValueRef = computed<number | null>(() => {
      const { value } = mergedValueRef
      if (isRangeRef.value)
        return null
      if (Array.isArray(value))
        return null
      return value
    })

    const startValueRef = computed<number | null>(() => {
      const { value } = mergedValueRef
      if (!isRangeRef.value)
        return null
      if (Array.isArray(value))
        return value[0]
      return null
    })
    const endValueRef = computed<number | null>(() => {
      const { value } = mergedValueRef
      if (!isRangeRef.value)
        return null
      if (Array.isArray(value))
        return value[1]
      return null
    })

    const mergedFormatRef = computed(() => {
      const { timeZone } = props
      if (timeZone) {
        return (
          date: Date | number,
          format: string,
          options?: {
            locale?: Locale
          }
        ) => {
          return formatInTimeZone(date, timeZone, format, options)
        }
      }
      else {
        return (
          date: Date | number,
          _format: string,
          options?: {
            locale?: Locale
          }
        ) => {
          return format(date, _format, options)
        }
      }
    })

    const displayTimeStringRef = ref('')
    const displayStartTimeStringRef = ref('')
    const displayEndTimeStringRef = ref('')

    watch(
      () => props.timeZone,
      () => {
        const mergedValue = mergedValueRef.value
        if (isRangeRef.value) {
          if (Array.isArray(mergedValue)) {
            displayStartTimeStringRef.value = mergedFormatRef.value(
              mergedValue[0],
              props.format,
              dateFnsOptionsRef.value
            )
            displayEndTimeStringRef.value = mergedFormatRef.value(
              mergedValue[1],
              props.format,
              dateFnsOptionsRef.value
            )
          }
          else {
            displayStartTimeStringRef.value = ''
            displayEndTimeStringRef.value = ''
          }
        }
        else {
          displayTimeStringRef.value
            = mergedValue === null || Array.isArray(mergedValue)
              ? ''
              : mergedFormatRef.value(
                  mergedValue,
                  props.format,
                  dateFnsOptionsRef.value
                )
        }
      },
      {
        immediate: true
      }
    )
    const uncontrolledShowRef = ref(false)
    const controlledShowRef = toRef(props, 'show')
    const mergedShowRef = useMergedState(controlledShowRef, uncontrolledShowRef)
    const memorizedValueRef = ref(mergedValueRef.value)
    const transitionDisabledRef = ref(false)

    const localizedClearRef = computed(() => {
      return localeRef.value.clear
    })
    const localizedNowRef = computed(() => {
      return localeRef.value.now
    })
    const localizedPlaceholderRef = computed(() => {
      if (props.placeholder !== undefined)
        return props.placeholder
      return localeRef.value.placeholder
    })
    const localizedStartPlaceholderRef = computed(() => {
      if (props.startPlaceholder !== undefined)
        return props.startPlaceholder
      return (
        (localeRef.value as any).startPlaceholder || localeRef.value.placeholder
      )
    })
    const localizedEndPlaceholderRef = computed(() => {
      if (props.endPlaceholder !== undefined)
        return props.endPlaceholder
      return (
        (localeRef.value as any).endPlaceholder || localeRef.value.placeholder
      )
    })
    const localizedNegativeTextRef = computed(() => {
      return localeRef.value.negativeText
    })
    const localizedPositiveTextRef = computed(() => {
      return localeRef.value.positiveText
    })
    const hourInFormatRef = computed(() => {
      return /H|h|K|k/.test(props.format)
    })
    const minuteInFormatRef = computed(() => {
      return props.format.includes('m')
    })
    const secondInFormatRef = computed(() => {
      return props.format.includes('s')
    })

    const hourValueRef = computed(() => {
      const { value } = singleValueRef
      if (value === null)
        return null
      return Number(mergedFormatRef.value(value, 'HH', dateFnsOptionsRef.value))
    })
    const minuteValueRef = computed(() => {
      const { value } = singleValueRef
      if (value === null)
        return null
      return Number(mergedFormatRef.value(value, 'mm', dateFnsOptionsRef.value))
    })
    const secondValueRef = computed(() => {
      const { value } = singleValueRef
      if (value === null)
        return null
      return Number(mergedFormatRef.value(value, 'ss', dateFnsOptionsRef.value))
    })
    const amPmValueRef = computed(() => {
      const { value } = singleValueRef
      if (value === null)
        return null
      return getHours(value) < 12 ? 'am' : 'pm'
    })

    const startHourValueRef = computed(() => {
      const { value } = startValueRef
      if (value === null)
        return null
      return Number(mergedFormatRef.value(value, 'HH', dateFnsOptionsRef.value))
    })
    const startMinuteValueRef = computed(() => {
      const { value } = startValueRef
      if (value === null)
        return null
      return Number(mergedFormatRef.value(value, 'mm', dateFnsOptionsRef.value))
    })
    const startSecondValueRef = computed(() => {
      const { value } = startValueRef
      if (value === null)
        return null
      return Number(mergedFormatRef.value(value, 'ss', dateFnsOptionsRef.value))
    })
    const startAmPmValueRef = computed(() => {
      const { value } = startValueRef
      if (value === null)
        return null
      return getHours(value) < 12 ? 'am' : 'pm'
    })

    const endHourValueRef = computed(() => {
      const { value } = endValueRef
      if (value === null)
        return null
      return Number(mergedFormatRef.value(value, 'HH', dateFnsOptionsRef.value))
    })
    const endMinuteValueRef = computed(() => {
      const { value } = endValueRef
      if (value === null)
        return null
      return Number(mergedFormatRef.value(value, 'mm', dateFnsOptionsRef.value))
    })
    const endSecondValueRef = computed(() => {
      const { value } = endValueRef
      if (value === null)
        return null
      return Number(mergedFormatRef.value(value, 'ss', dateFnsOptionsRef.value))
    })
    const endAmPmValueRef = computed(() => {
      const { value } = endValueRef
      if (value === null)
        return null
      return getHours(value) < 12 ? 'am' : 'pm'
    })

    const isHourInvalidRef = computed(() => {
      const { isHourDisabled } = props
      if (hourValueRef.value === null)
        return false
      if (!isTimeInStep(hourValueRef.value, 'hours', props.hours))
        return true
      if (!isHourDisabled)
        return false
      return isHourDisabled(hourValueRef.value)
    })
    const isMinuteInvalidRef = computed(() => {
      const { value: minuteValue } = minuteValueRef
      const { value: hourValue } = hourValueRef
      if (minuteValue === null || hourValue === null)
        return false
      if (!isTimeInStep(minuteValue, 'minutes', props.minutes))
        return true
      const { isMinuteDisabled } = props
      if (!isMinuteDisabled)
        return false
      return isMinuteDisabled(minuteValue, hourValue)
    })
    const isSecondInvalidRef = computed(() => {
      const { value: minuteValue } = minuteValueRef
      const { value: hourValue } = hourValueRef
      const { value: secondValue } = secondValueRef
      if (secondValue === null || minuteValue === null || hourValue === null) {
        return false
      }
      if (!isTimeInStep(secondValue, 'seconds', props.seconds))
        return true
      const { isSecondDisabled } = props
      if (!isSecondDisabled)
        return false
      return isSecondDisabled(secondValue, minuteValue, hourValue)
    })
    const isValueInvalidRef = computed(() => {
      return (
        isHourInvalidRef.value
        || isMinuteInvalidRef.value
        || isSecondInvalidRef.value
      )
    })

    const isStartHourInvalidRef = computed(() => {
      const { isHourDisabled } = props
      if (startHourValueRef.value === null)
        return false
      if (!isTimeInStep(startHourValueRef.value, 'hours', props.hours))
        return true
      if (!isHourDisabled)
        return false
      return isHourDisabled(startHourValueRef.value)
    })
    const isStartMinuteInvalidRef = computed(() => {
      const { value: minuteValue } = startMinuteValueRef
      const { value: hourValue } = startHourValueRef
      if (minuteValue === null || hourValue === null)
        return false
      if (!isTimeInStep(minuteValue, 'minutes', props.minutes))
        return true
      const { isMinuteDisabled } = props
      if (!isMinuteDisabled)
        return false
      return isMinuteDisabled(minuteValue, hourValue)
    })
    const isStartSecondInvalidRef = computed(() => {
      const { value: minuteValue } = startMinuteValueRef
      const { value: hourValue } = startHourValueRef
      const { value: secondValue } = startSecondValueRef
      if (secondValue === null || minuteValue === null || hourValue === null) {
        return false
      }
      if (!isTimeInStep(secondValue, 'seconds', props.seconds))
        return true
      const { isSecondDisabled } = props
      if (!isSecondDisabled)
        return false
      return isSecondDisabled(secondValue, minuteValue, hourValue)
    })
    const isStartValueInvalidRef = computed(() => {
      return (
        isStartHourInvalidRef.value
        || isStartMinuteInvalidRef.value
        || isStartSecondInvalidRef.value
      )
    })

    const isEndHourInvalidRef = computed(() => {
      const { isHourDisabled } = props
      if (endHourValueRef.value === null)
        return false
      if (!isTimeInStep(endHourValueRef.value, 'hours', props.hours))
        return true
      if (!isHourDisabled)
        return false
      return isHourDisabled(endHourValueRef.value)
    })
    const isEndMinuteInvalidRef = computed(() => {
      const { value: minuteValue } = endMinuteValueRef
      const { value: hourValue } = endHourValueRef
      if (minuteValue === null || hourValue === null)
        return false
      if (!isTimeInStep(minuteValue, 'minutes', props.minutes))
        return true
      const { isMinuteDisabled } = props
      if (!isMinuteDisabled)
        return false
      return isMinuteDisabled(minuteValue, hourValue)
    })
    const isEndSecondInvalidRef = computed(() => {
      const { value: minuteValue } = endMinuteValueRef
      const { value: hourValue } = endHourValueRef
      const { value: secondValue } = endSecondValueRef
      if (secondValue === null || minuteValue === null || hourValue === null) {
        return false
      }
      if (!isTimeInStep(secondValue, 'seconds', props.seconds))
        return true
      const { isSecondDisabled } = props
      if (!isSecondDisabled)
        return false
      return isSecondDisabled(secondValue, minuteValue, hourValue)
    })
    const isEndValueInvalidRef = computed(() => {
      return (
        isEndHourInvalidRef.value
        || isEndMinuteInvalidRef.value
        || isEndSecondInvalidRef.value
      )
    })

    const isRangeInvalidRef = computed(() => {
      return isStartValueInvalidRef.value || isEndValueInvalidRef.value
    })

    const mergedAttrSizeRef = computed(() => {
      return props.format.length + 4
    })

    function formatSingleValue(value: number | null): string | null {
      return value === null
        ? null
        : mergedFormatRef.value(value, props.valueFormat || props.format)
    }

    function formatRangeValue(
      value: [number, number] | null
    ): [string, string] | null {
      if (value === null)
        return null
      return [
        mergedFormatRef.value(value[0], props.valueFormat || props.format),
        mergedFormatRef.value(value[1], props.valueFormat || props.format)
      ]
    }

    function doUpdateFormattedValue(
      value: string | [string, string] | null,
      timestampValue: number | [number, number] | null
    ): void {
      const {
        onUpdateFormattedValue,
        'onUpdate:formattedValue': _onUpdateFormattedValue
      } = props
      if (onUpdateFormattedValue) {
        if (isRangeRef.value) {
          call(
            onUpdateFormattedValue as OnUpdateRangeFormattedValueImpl,
            value as [string, string] | null,
            timestampValue as [number, number] | null
          )
        }
        else {
          call(
            onUpdateFormattedValue as OnUpdateFormattedValueImpl,
            value as string | null,
            timestampValue as number | null
          )
        }
      }
      if (_onUpdateFormattedValue) {
        if (isRangeRef.value) {
          call(
            _onUpdateFormattedValue as OnUpdateRangeFormattedValueImpl,
            value as [string, string] | null,
            timestampValue as [number, number] | null
          )
        }
        else {
          call(
            _onUpdateFormattedValue as OnUpdateFormattedValueImpl,
            value as string | null,
            timestampValue as number | null
          )
        }
      }
    }

    function doUpdateValue(value: number | [number, number] | null): void {
      const {
        onUpdateValue,
        'onUpdate:value': _onUpdateValue,
        onChange
      } = props
      const { nTriggerFormChange, nTriggerFormInput } = formItem
      if (isRangeRef.value) {
        const rangeValue = value as [number, number] | null
        const formattedValue = formatRangeValue(rangeValue)
        if (onUpdateValue) {
          call(
            onUpdateValue as OnUpdateRangeValueImpl,
            rangeValue,
            formattedValue
          )
        }
        if (_onUpdateValue) {
          call(
            _onUpdateValue as OnUpdateRangeValueImpl,
            rangeValue,
            formattedValue
          )
        }
        doUpdateFormattedValue(formattedValue, rangeValue)
      }
      else {
        const singleValue = value as number | null
        const formattedValue = formatSingleValue(singleValue)
        if (onUpdateValue) {
          call(onUpdateValue as OnUpdateValueImpl, singleValue, formattedValue)
        }
        if (_onUpdateValue) {
          call(_onUpdateValue as OnUpdateValueImpl, singleValue, formattedValue)
        }
        if (onChange)
          call(onChange as OnUpdateValueImpl, singleValue, formattedValue)
        doUpdateFormattedValue(formattedValue, singleValue)
      }
      uncontrolledValueRef.value = value
      nTriggerFormChange()
      nTriggerFormInput()
    }
    function doFocus(e: FocusEvent): void {
      const { onFocus } = props
      const { nTriggerFormFocus } = formItem
      if (onFocus)
        call(onFocus, e)
      nTriggerFormFocus()
    }
    function doBlur(e: FocusEvent): void {
      const { onBlur } = props
      const { nTriggerFormBlur } = formItem
      if (onBlur)
        call(onBlur, e)
      nTriggerFormBlur()
    }
    function doConfirm(): void {
      const { onConfirm } = props
      if (onConfirm) {
        if (isRangeRef.value) {
          const value = mergedValueRef.value as [number, number] | null
          call(onConfirm as any, value, formatRangeValue(value))
        }
        else {
          call(
            onConfirm,
            mergedValueRef.value as number & null,
            formatSingleValue(mergedValueRef.value as number | null) as string
            & null
          )
        }
      }
    }
    function handleTimeInputClear(e: MouseEvent): void {
      e.stopPropagation()
      doUpdateValue(null)
      if (isRangeRef.value) {
        displayStartTimeStringRef.value = ''
        displayEndTimeStringRef.value = ''
      }
      else {
        deriveInputValue(null)
      }
      props.onClear?.()
    }
    function handleFocusDetectorFocus(): void {
      closePanel({
        returnFocus: true
      })
    }
    function clearSelectedValue(): void {
      doUpdateValue(null)
      if (isRangeRef.value) {
        displayStartTimeStringRef.value = ''
        displayEndTimeStringRef.value = ''
      }
      else {
        deriveInputValue(null)
      }
      closePanel({
        returnFocus: true
      })
    }
    function handleInputKeydown(e: KeyboardEvent): void {
      if (e.key === 'Escape' && mergedShowRef.value) {
        markEventEffectPerformed(e)
      }
    }
    function handleMenuKeydown(e: KeyboardEvent): void {
      switch (e.key) {
        case 'Escape':
          if (mergedShowRef.value) {
            markEventEffectPerformed(e)
            closePanel({
              returnFocus: true
            })
          }
          break
        case 'Tab':
          if (keyboardState.shift && e.target === panelInstRef.value?.$el) {
            e.preventDefault()
            closePanel({
              returnFocus: true
            })
          }
          break
      }
    }
    function disableTransitionOneTick(): void {
      transitionDisabledRef.value = true
      void nextTick(() => {
        transitionDisabledRef.value = false
      })
    }
    function handleTriggerClick(e: MouseEvent): void {
      if (mergedDisabledRef.value || happensIn(e, 'clear'))
        return
      if (!mergedShowRef.value) {
        openPanel()
      }
    }

    // Single mode handlers
    function handleHourClick(hour: ItemValue): void {
      if (typeof hour === 'string')
        return
      if (singleValueRef.value === null) {
        doUpdateValue(getTime(setHours(startOfHour(new Date()), hour)))
      }
      else {
        doUpdateValue(getTime(setHours(singleValueRef.value, hour)))
      }
    }
    function handleMinuteClick(minute: ItemValue): void {
      if (typeof minute === 'string')
        return
      if (singleValueRef.value === null) {
        doUpdateValue(getTime(setMinutes(startOfMinute(new Date()), minute)))
      }
      else {
        doUpdateValue(getTime(setMinutes(singleValueRef.value, minute)))
      }
    }
    function handleSecondClick(second: ItemValue): void {
      if (typeof second === 'string')
        return
      if (singleValueRef.value === null) {
        doUpdateValue(getTime(setSeconds(startOfSecond(new Date()), second)))
      }
      else {
        doUpdateValue(getTime(setSeconds(singleValueRef.value, second)))
      }
    }
    function handleAmPmClick(amPm: ItemValue): void {
      const { value: mergedValue } = singleValueRef
      if (mergedValue === null) {
        const now = new Date()
        const hours = getHours(now)
        if (amPm === 'pm' && hours < 12) {
          doUpdateValue(getTime(setHours(now, hours + 12)))
        }
        else if (amPm === 'am' && hours >= 12) {
          doUpdateValue(getTime(setHours(now, hours - 12)))
        }
        doUpdateValue(getTime(now))
      }
      else {
        const hours = getHours(mergedValue)
        if (amPm === 'pm' && hours < 12) {
          doUpdateValue(getTime(setHours(mergedValue, hours + 12)))
        }
        else if (amPm === 'am' && hours >= 12) {
          doUpdateValue(getTime(setHours(mergedValue, hours - 12)))
        }
      }
    }

    // Range mode handlers
    function getRangeValue(): [number, number] {
      const mergedValue = mergedValueRef.value
      if (Array.isArray(mergedValue)) {
        return mergedValue
      }
      const now = getTime(new Date())
      return [now, now]
    }
    function handleStartHourClick(hour: ItemValue): void {
      if (typeof hour === 'string')
        return
      const [startVal, endVal] = getRangeValue()
      const newStart
        = startValueRef.value === null
          ? getTime(setHours(startOfHour(new Date()), hour))
          : getTime(setHours(startVal, hour))
      doUpdateValue([newStart, endVal])
    }
    function handleStartMinuteClick(minute: ItemValue): void {
      if (typeof minute === 'string')
        return
      const [startVal, endVal] = getRangeValue()
      const newStart
        = startValueRef.value === null
          ? getTime(setMinutes(startOfMinute(new Date()), minute))
          : getTime(setMinutes(startVal, minute))
      doUpdateValue([newStart, endVal])
    }
    function handleStartSecondClick(second: ItemValue): void {
      if (typeof second === 'string')
        return
      const [startVal, endVal] = getRangeValue()
      const newStart
        = startValueRef.value === null
          ? getTime(setSeconds(startOfSecond(new Date()), second))
          : getTime(setSeconds(startVal, second))
      doUpdateValue([newStart, endVal])
    }
    function handleStartAmPmClick(amPm: ItemValue): void {
      const [startVal, endVal] = getRangeValue()
      if (startValueRef.value === null) {
        const now = new Date()
        const hours = getHours(now)
        if (amPm === 'pm' && hours < 12) {
          doUpdateValue([getTime(setHours(now, hours + 12)), endVal])
        }
        else if (amPm === 'am' && hours >= 12) {
          doUpdateValue([getTime(setHours(now, hours - 12)), endVal])
        }
        else {
          doUpdateValue([getTime(now), endVal])
        }
      }
      else {
        const hours = getHours(startVal)
        if (amPm === 'pm' && hours < 12) {
          doUpdateValue([getTime(setHours(startVal, hours + 12)), endVal])
        }
        else if (amPm === 'am' && hours >= 12) {
          doUpdateValue([getTime(setHours(startVal, hours - 12)), endVal])
        }
      }
    }
    function handleEndHourClick(hour: ItemValue): void {
      if (typeof hour === 'string')
        return
      const [startVal, endVal] = getRangeValue()
      const newEnd
        = endValueRef.value === null
          ? getTime(setHours(startOfHour(new Date()), hour))
          : getTime(setHours(endVal, hour))
      doUpdateValue([startVal, newEnd])
    }
    function handleEndMinuteClick(minute: ItemValue): void {
      if (typeof minute === 'string')
        return
      const [startVal, endVal] = getRangeValue()
      const newEnd
        = endValueRef.value === null
          ? getTime(setMinutes(startOfMinute(new Date()), minute))
          : getTime(setMinutes(endVal, minute))
      doUpdateValue([startVal, newEnd])
    }
    function handleEndSecondClick(second: ItemValue): void {
      if (typeof second === 'string')
        return
      const [startVal, endVal] = getRangeValue()
      const newEnd
        = endValueRef.value === null
          ? getTime(setSeconds(startOfSecond(new Date()), second))
          : getTime(setSeconds(endVal, second))
      doUpdateValue([startVal, newEnd])
    }
    function handleEndAmPmClick(amPm: ItemValue): void {
      const [startVal, endVal] = getRangeValue()
      if (endValueRef.value === null) {
        const now = new Date()
        const hours = getHours(now)
        if (amPm === 'pm' && hours < 12) {
          doUpdateValue([startVal, getTime(setHours(now, hours + 12))])
        }
        else if (amPm === 'am' && hours >= 12) {
          doUpdateValue([startVal, getTime(setHours(now, hours - 12))])
        }
        else {
          doUpdateValue([startVal, getTime(now)])
        }
      }
      else {
        const hours = getHours(endVal)
        if (amPm === 'pm' && hours < 12) {
          doUpdateValue([startVal, getTime(setHours(endVal, hours + 12))])
        }
        else if (amPm === 'am' && hours >= 12) {
          doUpdateValue([startVal, getTime(setHours(endVal, hours - 12))])
        }
      }
    }

    function deriveInputValue(time?: null | number | [number, number]): void {
      if (time === undefined)
        time = mergedValueRef.value
      if (isRangeRef.value) {
        if (time === null || !Array.isArray(time)) {
          displayStartTimeStringRef.value = ''
          displayEndTimeStringRef.value = ''
        }
        else {
          displayStartTimeStringRef.value = mergedFormatRef.value(
            time[0],
            props.format,
            dateFnsOptionsRef.value
          )
          displayEndTimeStringRef.value = mergedFormatRef.value(
            time[1],
            props.format,
            dateFnsOptionsRef.value
          )
        }
      }
      else {
        if (time === null || Array.isArray(time)) {
          displayTimeStringRef.value = ''
        }
        else {
          displayTimeStringRef.value = mergedFormatRef.value(
            time,
            props.format,
            dateFnsOptionsRef.value
          )
        }
      }
    }
    function handleTimeInputFocus(e: FocusEvent): void {
      if (isInternalFocusSwitch(e))
        return
      doFocus(e)
    }
    function handleTimeInputBlur(e: FocusEvent): void {
      if (isInternalFocusSwitch(e))
        return
      if (mergedShowRef.value) {
        const panelEl = panelInstRef.value?.$el
        if (!panelEl?.contains(e.relatedTarget as Node)) {
          deriveInputValue()
          doBlur(e)
          closePanel({
            returnFocus: false
          })
        }
      }
      else {
        deriveInputValue()
        doBlur(e)
      }
    }

    function handleTimeInputActivate(): void {
      if (mergedDisabledRef.value)
        return
      if (!mergedShowRef.value) {
        openPanel()
      }
    }
    function handleTimeInputDeactivate(): void {
      if (mergedDisabledRef.value)
        return
      deriveInputValue()
      closePanel({
        returnFocus: false
      })
    }
    function scrollTimer(): void {
      if (!panelInstRef.value)
        return
      if (isRangeRef.value) {
        const {
          startHourScrollRef,
          startMinuteScrollRef,
          startSecondScrollRef,
          startAmPmScrollRef,
          endHourScrollRef,
          endMinuteScrollRef,
          endSecondScrollRef,
          endAmPmScrollRef
        } = panelInstRef.value
        ;[
          startHourScrollRef,
          startMinuteScrollRef,
          startSecondScrollRef,
          startAmPmScrollRef,
          endHourScrollRef,
          endMinuteScrollRef,
          endSecondScrollRef,
          endAmPmScrollRef
        ].forEach((itemScrollRef) => {
          if (!itemScrollRef)
            return
          const activeItemEl
            = itemScrollRef.contentRef?.querySelector('[data-active]')
          if (activeItemEl) {
            itemScrollRef.scrollTo({
              top: (activeItemEl as HTMLElement).offsetTop
            })
          }
        })
      }
      else {
        const {
          hourScrollRef,
          minuteScrollRef,
          secondScrollRef,
          amPmScrollRef
        } = panelInstRef.value
        ;[
          hourScrollRef,
          minuteScrollRef,
          secondScrollRef,
          amPmScrollRef
        ].forEach((itemScrollRef) => {
          if (!itemScrollRef)
            return
          const activeItemEl
            = itemScrollRef.contentRef?.querySelector('[data-active]')
          if (activeItemEl) {
            itemScrollRef.scrollTo({
              top: (activeItemEl as HTMLElement).offsetTop
            })
          }
        })
      }
    }
    function doUpdateShow(value: boolean): void {
      uncontrolledShowRef.value = value
      const { onUpdateShow, 'onUpdate:show': _onUpdateShow } = props
      if (onUpdateShow)
        call(onUpdateShow, value)
      if (_onUpdateShow)
        call(_onUpdateShow, value)
    }
    function isInternalFocusSwitch(e: FocusEvent): boolean {
      const panelEl = panelInstRef.value?.$el
      return !!(
        inputInstRef.value?.wrapperElRef?.contains(e.relatedTarget as Node)
        || panelEl?.contains(e.relatedTarget as Node)
      )
    }
    function openPanel(): void {
      memorizedValueRef.value = mergedValueRef.value
      doUpdateShow(true)
      void nextTick(scrollTimer)
    }
    function handleClickOutside(e: MouseEvent): void {
      if (
        mergedShowRef.value
        && !inputInstRef.value?.wrapperElRef?.contains(
          getPreciseEventTarget(e) as Node | null
        )
      ) {
        closePanel({
          returnFocus: false
        })
      }
    }
    function closePanel({ returnFocus }: { returnFocus: boolean }): void {
      if (mergedShowRef.value) {
        doUpdateShow(false)
        if (returnFocus) {
          inputInstRef.value?.focus()
        }
      }
    }
    function handleTimeInputUpdateValue(v: string): void {
      if (v === '') {
        doUpdateValue(null)
        return
      }
      const time = strictParse(
        v,
        props.format,
        new Date(),
        dateFnsOptionsRef.value
      )
      displayTimeStringRef.value = v
      if (isValid(time)) {
        const { value: mergedValue } = singleValueRef
        if (mergedValue !== null) {
          const newTime = set(mergedValue, {
            hours: getHours(time),
            minutes: getMinutes(time),
            seconds: getSeconds(time),
            milliseconds: getMilliseconds(time)
          })
          doUpdateValue(getTime(newTime))
        }
        else {
          doUpdateValue(getTime(time))
        }
      }
    }
    function handleRangeTimeInputUpdateValue(v: [string, string]): void {
      if (v[0] === '' && v[1] === '') {
        doUpdateValue(null)
        displayStartTimeStringRef.value = ''
        displayEndTimeStringRef.value = ''
        return
      }
      displayStartTimeStringRef.value = v[0]
      displayEndTimeStringRef.value = v[1]
      const startTime = strictParse(
        v[0],
        props.format,
        new Date(),
        dateFnsOptionsRef.value
      )
      const endTime = strictParse(
        v[1],
        props.format,
        new Date(),
        dateFnsOptionsRef.value
      )
      if (isValid(startTime) && isValid(endTime)) {
        const startTs = getTime(startTime)
        const endTs = getTime(endTime)
        doUpdateValue([startTs, endTs])
      }
    }
    function handleCancelClick(): void {
      doUpdateValue(memorizedValueRef.value as number | [number, number] | null)
      doUpdateShow(false)
    }
    function handleNowClick(): void {
      const now = new Date()
      const getNowTime = {
        hours: getHours,
        minutes: getMinutes,
        seconds: getSeconds
      }
      const [mergeHours, mergeMinutes, mergeSeconds] = (
        ['hours', 'minutes', 'seconds'] as const
      ).map(i =>
        !props[i] || isTimeInStep(getNowTime[i](now), i, props[i])
          ? getNowTime[i](now)
          : findSimilarTime(getNowTime[i](now), i, props[i])
      )
      if (isRangeRef.value) {
        const nowTs = getTime(
          setSeconds(
            setMinutes(setHours(getTime(now), mergeHours), mergeMinutes),
            mergeSeconds
          )
        )
        doUpdateValue([nowTs, nowTs])
      }
      else {
        const newValue = setSeconds(
          setMinutes(
            setHours(
              singleValueRef.value ? singleValueRef.value : getTime(now),
              mergeHours
            ),
            mergeMinutes
          ),
          mergeSeconds
        )
        doUpdateValue(getTime(newValue))
      }
    }
    function handleConfirmClick(): void {
      if (isRangeRef.value) {
        const value = mergedValueRef.value
        if (Array.isArray(value)) {
          let [start, end] = value
          // swap if end < start
          if (end < start) {
            ;[start, end] = [end, start]
          }
          doUpdateValue([start, end])
        }
      }
      deriveInputValue()
      doConfirm()
      closePanel({
        returnFocus: true
      })
    }
    function handleMenuFocusOut(e: FocusEvent): void {
      if (isInternalFocusSwitch(e))
        return
      deriveInputValue()
      doBlur(e)
      closePanel({
        returnFocus: false
      })
    }
    watch(mergedValueRef, (value) => {
      deriveInputValue(value)
      disableTransitionOneTick()
      void nextTick(scrollTimer)
    })
    watch(mergedShowRef, () => {
      if (isRangeRef.value) {
        if (isRangeInvalidRef.value) {
          doUpdateValue(memorizedValueRef.value as [number, number] | null)
        }
      }
      else {
        if (isValueInvalidRef.value) {
          doUpdateValue(memorizedValueRef.value as number | null)
        }
      }
    })
    provide(timePickerInjectionKey, {
      mergedThemeRef: themeRef,
      mergedClsPrefixRef
    })
    const exposedMethods: TimePickerInst = {
      focus: () => {
        inputInstRef.value?.focus()
      },
      blur: () => {
        inputInstRef.value?.blur()
      }
    }
    const triggerCssVarsRef = computed(() => {
      const {
        common: { cubicBezierEaseInOut },
        self: { iconColor, iconColorDisabled }
      } = themeRef.value
      return {
        '--n-icon-color-override': iconColor,
        '--n-icon-color-disabled-override': iconColorDisabled,
        '--n-bezier': cubicBezierEaseInOut
      }
    })
    const triggerThemeClassHandle = inlineThemeDisabled
      ? useThemeClass(
          'time-picker-trigger',
          undefined,
          triggerCssVarsRef,
          props
        )
      : undefined
    const cssVarsRef = computed(() => {
      const {
        self: {
          panelColor,
          itemTextColor,
          itemTextColorActive,
          itemColorHover,
          panelDividerColor,
          panelBoxShadow,
          itemOpacityDisabled,
          borderRadius,
          itemFontSize,
          itemWidth,
          itemHeight,
          panelActionPadding,
          itemBorderRadius
        },
        common: { cubicBezierEaseInOut }
      } = themeRef.value
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-border-radius': borderRadius,
        '--n-item-color-hover': itemColorHover,
        '--n-item-font-size': itemFontSize,
        '--n-item-height': itemHeight,
        '--n-item-opacity-disabled': itemOpacityDisabled,
        '--n-item-text-color': itemTextColor,
        '--n-item-text-color-active': itemTextColorActive,
        '--n-item-width': itemWidth,
        '--n-panel-action-padding': panelActionPadding,
        '--n-panel-box-shadow': panelBoxShadow,
        '--n-panel-color': panelColor,
        '--n-panel-divider-color': panelDividerColor,
        '--n-item-border-radius': itemBorderRadius
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('time-picker', undefined, cssVarsRef, props)
      : undefined
    return {
      focus: exposedMethods.focus,
      blur: exposedMethods.blur,
      isRange: isRangeRef,
      mergedStatus: mergedStatusRef,
      mergedBordered: mergedBorderedRef,
      mergedClsPrefix: mergedClsPrefixRef,
      namespace: namespaceRef,
      uncontrolledValue: uncontrolledValueRef,
      mergedValue: mergedValueRef,
      isMounted: useIsMounted(),
      inputInstRef,
      panelInstRef,
      adjustedTo: useAdjustedTo(props),
      mergedShow: mergedShowRef,
      localizedClear: localizedClearRef,
      localizedNow: localizedNowRef,
      localizedPlaceholder: localizedPlaceholderRef,
      localizedStartPlaceholder: localizedStartPlaceholderRef,
      localizedEndPlaceholder: localizedEndPlaceholderRef,
      localizedNegativeText: localizedNegativeTextRef,
      localizedPositiveText: localizedPositiveTextRef,
      hourInFormat: hourInFormatRef,
      minuteInFormat: minuteInFormatRef,
      secondInFormat: secondInFormatRef,
      mergedAttrSize: mergedAttrSizeRef,
      displayTimeString: displayTimeStringRef,
      displayStartTimeString: displayStartTimeStringRef,
      displayEndTimeString: displayEndTimeStringRef,
      mergedSize: mergedSizeRef,
      mergedDisabled: mergedDisabledRef,
      isValueInvalid: isValueInvalidRef,
      isHourInvalid: isHourInvalidRef,
      isMinuteInvalid: isMinuteInvalidRef,
      isSecondInvalid: isSecondInvalidRef,
      hourValue: hourValueRef,
      minuteValue: minuteValueRef,
      secondValue: secondValueRef,
      amPmValue: amPmValueRef,
      isRangeInvalid: isRangeInvalidRef,
      isStartHourInvalid: isStartHourInvalidRef,
      isStartMinuteInvalid: isStartMinuteInvalidRef,
      isStartSecondInvalid: isStartSecondInvalidRef,
      isStartValueInvalid: isStartValueInvalidRef,
      isEndHourInvalid: isEndHourInvalidRef,
      isEndMinuteInvalid: isEndMinuteInvalidRef,
      isEndSecondInvalid: isEndSecondInvalidRef,
      isEndValueInvalid: isEndValueInvalidRef,
      startHourValue: startHourValueRef,
      startMinuteValue: startMinuteValueRef,
      startSecondValue: startSecondValueRef,
      startAmPmValue: startAmPmValueRef,
      endHourValue: endHourValueRef,
      endMinuteValue: endMinuteValueRef,
      endSecondValue: endSecondValueRef,
      endAmPmValue: endAmPmValueRef,
      transitionDisabled: transitionDisabledRef,
      handleInputKeydown,
      handleTimeInputFocus,
      handleTimeInputBlur,
      handleNowClick,
      handleConfirmClick,
      handleTimeInputUpdateValue,
      handleRangeTimeInputUpdateValue,
      handleMenuFocusOut,
      handleCancelClick,
      handleClickOutside,
      handleTimeInputActivate,
      handleTimeInputDeactivate,
      handleHourClick,
      handleMinuteClick,
      handleSecondClick,
      handleAmPmClick,
      handleStartHourClick,
      handleStartMinuteClick,
      handleStartSecondClick,
      handleStartAmPmClick,
      handleEndHourClick,
      handleEndMinuteClick,
      handleEndSecondClick,
      handleEndAmPmClick,
      handleTimeInputClear,
      handleFocusDetectorFocus,
      handleMenuKeydown,
      handleTriggerClick,
      mergedTheme: themeRef,
      triggerCssVars: inlineThemeDisabled ? undefined : triggerCssVarsRef,
      triggerThemeClass: triggerThemeClassHandle?.themeClass,
      triggerOnRender: triggerThemeClassHandle?.onRender,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender,
      clearSelectedValue
    }
  },
  render() {
    const { mergedClsPrefix, $slots, triggerOnRender, isRange } = this
    triggerOnRender?.()
    return (
      <div
        class={[`${mergedClsPrefix}-time-picker`, this.triggerThemeClass]}
        style={this.triggerCssVars as CSSProperties}
      >
        <VBinder>
          {{
            default: () => [
              <VTarget>
                {{
                  default: () =>
                    isRange ? (
                      <NInput
                        ref="inputInstRef"
                        status={this.mergedStatus}
                        value={[
                          this.displayStartTimeString,
                          this.displayEndTimeString
                        ]}
                        bordered={this.mergedBordered}
                        passivelyActivated
                        pair
                        theme={this.mergedTheme.peers.Input}
                        themeOverrides={this.mergedTheme.peerOverrides.Input}
                        stateful={this.stateful}
                        size={this.mergedSize}
                        placeholder={[
                          this.localizedStartPlaceholder,
                          this.localizedEndPlaceholder
                        ]}
                        clearable={this.clearable}
                        disabled={this.mergedDisabled}
                        textDecoration={[
                          this.isStartValueInvalid ? 'line-through' : '',
                          this.isEndValueInvalid ? 'line-through' : ''
                        ]}
                        onFocus={this.handleTimeInputFocus}
                        onBlur={this.handleTimeInputBlur}
                        onActivate={this.handleTimeInputActivate}
                        onDeactivate={this.handleTimeInputDeactivate}
                        onUpdateValue={this.handleRangeTimeInputUpdateValue}
                        onClear={this.handleTimeInputClear}
                        internalDeactivateOnEnter
                        internalForceFocus={this.mergedShow}
                        readonly={this.inputReadonly || this.mergedDisabled}
                        onClick={this.handleTriggerClick}
                        onKeydown={this.handleInputKeydown}
                      >
                        {{
                          separator: () =>
                            this.separator === undefined ? (
                              <NBaseIcon
                                clsPrefix={mergedClsPrefix}
                                class={`${mergedClsPrefix}-time-picker-icon`}
                              >
                                {{
                                  default: () => <ToIcon />
                                }}
                              </NBaseIcon>
                            ) : (
                              this.separator
                            ),
                          ...(this.showIcon
                            ? {
                                [this.clearable
                                  ? 'clear-icon-placeholder'
                                  : 'suffix']: () => (
                                  <NBaseIcon
                                    clsPrefix={mergedClsPrefix}
                                    class={`${mergedClsPrefix}-time-picker-icon`}
                                  >
                                    {{
                                      default: () =>
                                        $slots.icon ? (
                                          $slots.icon()
                                        ) : (
                                          <TimeIcon />
                                        )
                                    }}
                                  </NBaseIcon>
                                )
                              }
                            : null)
                        }}
                      </NInput>
                    ) : (
                      <NInput
                        ref="inputInstRef"
                        status={this.mergedStatus}
                        value={this.displayTimeString}
                        bordered={this.mergedBordered}
                        passivelyActivated
                        attrSize={this.mergedAttrSize}
                        theme={this.mergedTheme.peers.Input}
                        themeOverrides={this.mergedTheme.peerOverrides.Input}
                        stateful={this.stateful}
                        size={this.mergedSize}
                        placeholder={this.localizedPlaceholder}
                        clearable={this.clearable}
                        disabled={this.mergedDisabled}
                        textDecoration={
                          this.isValueInvalid ? 'line-through' : undefined
                        }
                        onFocus={this.handleTimeInputFocus}
                        onBlur={this.handleTimeInputBlur}
                        onActivate={this.handleTimeInputActivate}
                        onDeactivate={this.handleTimeInputDeactivate}
                        onUpdateValue={this.handleTimeInputUpdateValue}
                        onClear={this.handleTimeInputClear}
                        internalDeactivateOnEnter
                        internalForceFocus={this.mergedShow}
                        readonly={this.inputReadonly || this.mergedDisabled}
                        onClick={this.handleTriggerClick}
                        onKeydown={this.handleInputKeydown}
                      >
                        {this.showIcon
                          ? {
                              [this.clearable
                                ? 'clear-icon-placeholder'
                                : 'suffix']: () => (
                                <NBaseIcon
                                  clsPrefix={mergedClsPrefix}
                                  class={`${mergedClsPrefix}-time-picker-icon`}
                                >
                                  {{
                                    default: () =>
                                      $slots.icon ? $slots.icon() : <TimeIcon />
                                  }}
                                </NBaseIcon>
                              )
                            }
                          : null}
                      </NInput>
                    )
                }}
              </VTarget>,
              <VFollower
                teleportDisabled={this.adjustedTo === useAdjustedTo.tdkey}
                show={this.mergedShow}
                to={this.adjustedTo}
                containerClass={this.namespace}
                placement={this.placement}
              >
                {{
                  default: () => (
                    <Transition
                      name="fade-in-scale-up-transition"
                      appear={this.isMounted}
                    >
                      {{
                        default: () => {
                          if (this.mergedShow) {
                            this.onRender?.()
                            if (isRange) {
                              return withDirectives(
                                <RangePanel
                                  ref="panelInstRef"
                                  actions={this.actions}
                                  class={this.themeClass}
                                  style={this.cssVars as CSSProperties}
                                  seconds={this.seconds}
                                  minutes={this.minutes}
                                  hours={this.hours}
                                  transitionDisabled={this.transitionDisabled}
                                  showHour={this.hourInFormat}
                                  showMinute={this.minuteInFormat}
                                  showSecond={this.secondInFormat}
                                  // start
                                  startHourValue={this.startHourValue}
                                  isStartHourInvalid={this.isStartHourInvalid}
                                  isStartHourDisabled={this.isHourDisabled}
                                  startMinuteValue={this.startMinuteValue}
                                  isStartMinuteInvalid={
                                    this.isStartMinuteInvalid
                                  }
                                  isStartMinuteDisabled={this.isMinuteDisabled}
                                  startSecondValue={this.startSecondValue}
                                  isStartSecondInvalid={
                                    this.isStartSecondInvalid
                                  }
                                  isStartSecondDisabled={this.isSecondDisabled}
                                  startAmPmValue={this.startAmPmValue}
                                  isStartValueInvalid={this.isStartValueInvalid}
                                  // end
                                  endHourValue={this.endHourValue}
                                  isEndHourInvalid={this.isEndHourInvalid}
                                  isEndHourDisabled={this.isHourDisabled}
                                  endMinuteValue={this.endMinuteValue}
                                  isEndMinuteInvalid={this.isEndMinuteInvalid}
                                  isEndMinuteDisabled={this.isMinuteDisabled}
                                  endSecondValue={this.endSecondValue}
                                  isEndSecondInvalid={this.isEndSecondInvalid}
                                  isEndSecondDisabled={this.isSecondDisabled}
                                  endAmPmValue={this.endAmPmValue}
                                  isEndValueInvalid={this.isEndValueInvalid}
                                  isRangeInvalid={this.isRangeInvalid}
                                  // callbacks
                                  clearText={this.localizedClear}
                                  nowText={this.localizedNow}
                                  confirmText={this.localizedPositiveText}
                                  use12Hours={this.use12Hours}
                                  onFocusout={this.handleMenuFocusOut}
                                  onKeydown={this.handleMenuKeydown}
                                  onStartHourClick={this.handleStartHourClick}
                                  onStartMinuteClick={
                                    this.handleStartMinuteClick
                                  }
                                  onStartSecondClick={
                                    this.handleStartSecondClick
                                  }
                                  onStartAmPmClick={this.handleStartAmPmClick}
                                  onEndHourClick={this.handleEndHourClick}
                                  onEndMinuteClick={this.handleEndMinuteClick}
                                  onEndSecondClick={this.handleEndSecondClick}
                                  onEndAmPmClick={this.handleEndAmPmClick}
                                  onNowClick={this.handleNowClick}
                                  onConfirmClick={this.handleConfirmClick}
                                  onClearClick={this.clearSelectedValue}
                                  onFocusDetectorFocus={
                                    this.handleFocusDetectorFocus
                                  }
                                />,
                                [
                                  [
                                    clickoutside,
                                    this.handleClickOutside,
                                    undefined as unknown as string,
                                    { capture: true }
                                  ]
                                ]
                              )
                            }
                            return withDirectives(
                              <Panel
                                ref="panelInstRef"
                                actions={this.actions}
                                class={this.themeClass}
                                style={this.cssVars as CSSProperties}
                                seconds={this.seconds}
                                minutes={this.minutes}
                                hours={this.hours}
                                transitionDisabled={this.transitionDisabled}
                                hourValue={this.hourValue}
                                showHour={this.hourInFormat}
                                isHourInvalid={this.isHourInvalid}
                                isHourDisabled={this.isHourDisabled}
                                minuteValue={this.minuteValue}
                                showMinute={this.minuteInFormat}
                                isMinuteInvalid={this.isMinuteInvalid}
                                isMinuteDisabled={this.isMinuteDisabled}
                                secondValue={this.secondValue}
                                amPmValue={this.amPmValue}
                                showSecond={this.secondInFormat}
                                isSecondInvalid={this.isSecondInvalid}
                                isSecondDisabled={this.isSecondDisabled}
                                isValueInvalid={this.isValueInvalid}
                                clearText={this.localizedClear}
                                nowText={this.localizedNow}
                                confirmText={this.localizedPositiveText}
                                use12Hours={this.use12Hours}
                                onFocusout={this.handleMenuFocusOut}
                                onKeydown={this.handleMenuKeydown}
                                onHourClick={this.handleHourClick}
                                onMinuteClick={this.handleMinuteClick}
                                onSecondClick={this.handleSecondClick}
                                onAmPmClick={this.handleAmPmClick}
                                onNowClick={this.handleNowClick}
                                onConfirmClick={this.handleConfirmClick}
                                onClearClick={this.clearSelectedValue}
                                onFocusDetectorFocus={
                                  this.handleFocusDetectorFocus
                                }
                              />,
                              [
                                [
                                  clickoutside,
                                  this.handleClickOutside,
                                  undefined as unknown as string,
                                  { capture: true }
                                ]
                              ]
                            )
                          }
                          return null
                        }
                      }}
                    </Transition>
                  )
                }}
              </VFollower>
            ]
          }}
        </VBinder>
      </div>
    )
  }
})
