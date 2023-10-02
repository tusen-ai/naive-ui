import {
  h,
  ref,
  toRef,
  defineComponent,
  computed,
  withDirectives,
  type PropType,
  Transition,
  provide,
  nextTick,
  watch,
  type CSSProperties,
  watchEffect
} from 'vue'
import { useIsMounted, useKeyboard, useMergedState } from 'vooks'
import { VBinder, VTarget, VFollower, type FollowerPlacement } from 'vueuc'
import { clickoutside } from 'vdirs'
import { getPreciseEventTarget, happensIn } from 'seemly'
import {
  isValid,
  startOfSecond,
  startOfMinute,
  startOfHour,
  format,
  set,
  setHours,
  setMinutes,
  setSeconds,
  getTime,
  getMinutes,
  getHours,
  getSeconds
} from 'date-fns/esm'
import formatInTimeZone from 'date-fns-tz/formatInTimeZone'
import type { Locale } from 'date-fns'
import type { FormValidationStatus } from '../../form/src/interface'
import { strictParse } from '../../date-picker/src/utils'
import { TimeIcon } from '../../_internal/icons'
import { type InputInst, NInput } from '../../input'
import { NBaseIcon } from '../../_internal'
import {
  useConfig,
  useTheme,
  useLocale,
  useFormItem,
  useThemeClass
} from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import {
  call,
  markEventEffectPerformed,
  useAdjustedTo,
  warnOnce
} from '../../_utils'
import type { MaybeArray, ExtractPublicPropTypes } from '../../_utils'
import { timePickerLight } from '../styles'
import type { TimePickerTheme } from '../styles'
import Panel from './Panel'
import type {
  IsHourDisabled,
  IsMinuteDisabled,
  IsSecondDisabled,
  ItemValue,
  OnUpdateFormattedValue,
  OnUpdateFormattedValueImpl,
  OnUpdateValue,
  OnUpdateValueImpl,
  PanelRef,
  Size,
  TimePickerInst
} from './interface'
import { timePickerInjectionKey } from './interface'
import { findSimilarTime, isTimeInStep } from './utils'
import style from './styles/index.cssr'

// validate hours, minutes, seconds prop
function validateUnits (value: MaybeArray<number>, max: number): boolean {
  if (value === undefined) {
    return true
  }
  if (Array.isArray(value)) {
    return value.every((v) => v >= 0 && v <= max)
  } else {
    return value >= 0 && value <= max
  }
}

export const timePickerProps = {
  ...(useTheme.props as ThemeProps<TimePickerTheme>),
  to: useAdjustedTo.propTo,
  bordered: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  actions: Array as PropType<Array<'now' | 'confirm'> | null>,
  defaultValue: {
    type: Number as PropType<number | null>,
    default: null
  },
  defaultFormattedValue: String,
  placeholder: String,
  placement: {
    type: String as PropType<FollowerPlacement>,
    default: 'bottom-start'
  },
  value: Number as PropType<number | null>,
  format: {
    type: String,
    default: 'HH:mm:ss'
  },
  valueFormat: String,
  formattedValue: String as PropType<string | null>,
  isHourDisabled: Function as PropType<IsHourDisabled>,
  size: String as PropType<Size>,
  isMinuteDisabled: Function as PropType<IsMinuteDisabled>,
  isSecondDisabled: Function as PropType<IsSecondDisabled>,
  inputReadonly: Boolean,
  clearable: Boolean,
  status: String as PropType<FormValidationStatus>,
  'onUpdate:value': [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  onUpdateValue: [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  'onUpdate:show': [Function, Array] as PropType<
  MaybeArray<(show: boolean) => void>
  >,
  onUpdateShow: [Function, Array] as PropType<
  MaybeArray<(show: boolean) => void>
  >,
  onUpdateFormattedValue: [Function, Array] as PropType<
  MaybeArray<OnUpdateFormattedValue>
  >,
  'onUpdate:formattedValue': [Function, Array] as PropType<
  MaybeArray<OnUpdateFormattedValue>
  >,
  onBlur: [Function, Array] as PropType<MaybeArray<(e: FocusEvent) => void>>,
  onConfirm: [Function, Array] as PropType<
  MaybeArray<(value: number & null, formattedValue: string & null) => void>
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

export default defineComponent({
  name: 'TimePicker',
  props: timePickerProps,
  setup (props) {
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

    const inputInstRef = ref<InputInst | null>(null)
    const panelInstRef = ref<PanelRef | null>(null)

    const dateFnsOptionsRef = computed(() => {
      return {
        locale: dateLocaleRef.value.locale
      }
    })

    function getTimestampFromFormattedValue (
      value: string | null
    ): number | null {
      if (value === null) return null
      return strictParse(
        value,
        props.valueFormat || props.format,
        new Date(),
        dateFnsOptionsRef.value
      ).getTime()
    }

    const { defaultValue, defaultFormattedValue } = props

    const uncontrolledValueRef = ref(
      defaultFormattedValue !== undefined
        ? getTimestampFromFormattedValue(defaultFormattedValue)
        : defaultValue
    )
    const mergedValueRef = computed(() => {
      const { formattedValue } = props
      if (formattedValue !== undefined) {
        return getTimestampFromFormattedValue(formattedValue)
      }
      const { value } = props
      if (value !== undefined) {
        return value
      }
      return uncontrolledValueRef.value
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
      } else {
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
    watch(
      () => props.timeZone,
      () => {
        const mergedValue = mergedValueRef.value
        displayTimeStringRef.value =
          mergedValue === null
            ? ''
            : mergedFormatRef.value(
              mergedValue,
              props.format,
              dateFnsOptionsRef.value
            )
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

    const localizedNowRef = computed(() => {
      return localeRef.value.now
    })
    const localizedPlaceholderRef = computed(() => {
      if (props.placeholder !== undefined) return props.placeholder
      return localeRef.value.placeholder
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
    const isHourInvalidRef = computed(() => {
      const { isHourDisabled } = props
      if (hourValueRef.value === null) return false
      if (!isTimeInStep(hourValueRef.value, 'hours', props.hours)) return true
      if (!isHourDisabled) return false
      return isHourDisabled(hourValueRef.value)
    })
    const isMinuteInvalidRef = computed(() => {
      const { value: minuteValue } = minuteValueRef
      const { value: hourValue } = hourValueRef
      if (minuteValue === null || hourValue === null) return false
      if (!isTimeInStep(minuteValue, 'minutes', props.minutes)) return true
      const { isMinuteDisabled } = props
      if (!isMinuteDisabled) return false
      return isMinuteDisabled(minuteValue, hourValue)
    })
    const isSecondInvalidRef = computed(() => {
      const { value: minuteValue } = minuteValueRef
      const { value: hourValue } = hourValueRef
      const { value: secondValue } = secondValueRef
      if (secondValue === null || minuteValue === null || hourValue === null) {
        return false
      }
      if (!isTimeInStep(secondValue, 'seconds', props.seconds)) return true
      const { isSecondDisabled } = props
      if (!isSecondDisabled) return false
      return isSecondDisabled(secondValue, minuteValue, hourValue)
    })
    const isValueInvalidRef = computed(() => {
      return (
        isHourInvalidRef.value ||
        isMinuteInvalidRef.value ||
        isSecondInvalidRef.value
      )
    })
    const mergedAttrSizeRef = computed(() => {
      return props.format.length + 4
    })
    const amPmValueRef = computed(() => {
      const { value } = mergedValueRef
      if (value === null) return null
      return getHours(value) < 12 ? 'am' : 'pm'
    })
    const hourValueRef = computed(() => {
      const { value } = mergedValueRef
      if (value === null) return null
      return Number(mergedFormatRef.value(value, 'HH', dateFnsOptionsRef.value))
    })
    const minuteValueRef = computed(() => {
      const { value } = mergedValueRef
      if (value === null) return null
      return Number(mergedFormatRef.value(value, 'mm', dateFnsOptionsRef.value))
    })
    const secondValueRef = computed(() => {
      const { value } = mergedValueRef
      if (value === null) return null
      return Number(mergedFormatRef.value(value, 'ss', dateFnsOptionsRef.value))
    })
    function doUpdateFormattedValue (
      value: string | null,
      timestampValue: number | null
    ): void {
      const {
        onUpdateFormattedValue,
        'onUpdate:formattedValue': _onUpdateFormattedValue
      } = props
      if (onUpdateFormattedValue) {
        call(
          onUpdateFormattedValue as OnUpdateFormattedValueImpl,
          value,
          timestampValue
        )
      }
      if (_onUpdateFormattedValue) {
        call(
          _onUpdateFormattedValue as OnUpdateFormattedValueImpl,
          value,
          timestampValue
        )
      }
    }
    function createFormattedValue (value: number | null): string | null {
      return value === null
        ? null
        : mergedFormatRef.value(value, props.valueFormat || props.format)
    }
    function doUpdateValue (value: number | null): void {
      const {
        onUpdateValue,
        'onUpdate:value': _onUpdateValue,
        onChange
      } = props
      const { nTriggerFormChange, nTriggerFormInput } = formItem
      const formattedValue = createFormattedValue(value)
      if (onUpdateValue) {
        call(onUpdateValue as OnUpdateValueImpl, value, formattedValue)
      }
      if (_onUpdateValue) {
        call(_onUpdateValue as OnUpdateValueImpl, value, formattedValue)
      }
      if (onChange) call(onChange as OnUpdateValueImpl, value, formattedValue)
      doUpdateFormattedValue(formattedValue, value)
      uncontrolledValueRef.value = value
      nTriggerFormChange()
      nTriggerFormInput()
    }
    function doFocus (e: FocusEvent): void {
      const { onFocus } = props
      const { nTriggerFormFocus } = formItem
      if (onFocus) call(onFocus, e)
      nTriggerFormFocus()
    }
    function doBlur (e: FocusEvent): void {
      const { onBlur } = props
      const { nTriggerFormBlur } = formItem
      if (onBlur) call(onBlur, e)
      nTriggerFormBlur()
    }
    function doConfirm (): void {
      const { onConfirm } = props
      if (onConfirm) {
        call(
          onConfirm,
          mergedValueRef.value as number & null,
          createFormattedValue(mergedValueRef.value) as string & null
        )
      }
    }
    function handleTimeInputClear (e: MouseEvent): void {
      e.stopPropagation()
      doUpdateValue(null)
      deriveInputValue(null)
      props.onClear?.()
    }
    function handleFocusDetectorFocus (): void {
      closePanel({
        returnFocus: true
      })
    }
    function handleInputKeydown (e: KeyboardEvent): void {
      if (e.key === 'Escape' && mergedShowRef.value) {
        markEventEffectPerformed(e)
        // closePanel will be called in onDeactivated
      }
    }
    function handleMenuKeydown (e: KeyboardEvent): void {
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
    function disableTransitionOneTick (): void {
      transitionDisabledRef.value = true
      void nextTick(() => {
        transitionDisabledRef.value = false
      })
    }
    function handleTriggerClick (e: MouseEvent): void {
      if (mergedDisabledRef.value || happensIn(e, 'clear')) return
      if (!mergedShowRef.value) {
        openPanel()
      }
    }
    function handleHourClick (hour: ItemValue): void {
      if (typeof hour === 'string') return
      if (mergedValueRef.value === null) {
        doUpdateValue(getTime(setHours(startOfHour(new Date()), hour)))
      } else {
        doUpdateValue(getTime(setHours(mergedValueRef.value, hour)))
      }
    }
    function handleMinuteClick (minute: ItemValue): void {
      if (typeof minute === 'string') return
      if (mergedValueRef.value === null) {
        doUpdateValue(getTime(setMinutes(startOfMinute(new Date()), minute)))
      } else {
        doUpdateValue(getTime(setMinutes(mergedValueRef.value, minute)))
      }
    }
    function handleSecondClick (second: ItemValue): void {
      if (typeof second === 'string') return
      if (mergedValueRef.value === null) {
        doUpdateValue(getTime(setSeconds(startOfSecond(new Date()), second)))
      } else {
        doUpdateValue(getTime(setSeconds(mergedValueRef.value, second)))
      }
    }
    function handleAmPmClick (amPm: ItemValue): void {
      const { value: mergedValue } = mergedValueRef
      if (mergedValue === null) {
        const now = new Date()
        const hours = getHours(now)
        if (amPm === 'pm' && hours < 12) {
          doUpdateValue(getTime(setHours(now, hours + 12)))
        } else if (amPm === 'am' && hours >= 12) {
          doUpdateValue(getTime(setHours(now, hours - 12)))
        }
        doUpdateValue(getTime(now))
      } else {
        const hours = getHours(mergedValue)
        if (amPm === 'pm' && hours < 12) {
          doUpdateValue(getTime(setHours(mergedValue, hours + 12)))
        } else if (amPm === 'am' && hours >= 12) {
          doUpdateValue(getTime(setHours(mergedValue, hours - 12)))
        }
      }
    }
    function deriveInputValue (time?: null | number): void {
      if (time === undefined) time = mergedValueRef.value
      if (time === null) displayTimeStringRef.value = ''
      else {
        displayTimeStringRef.value = mergedFormatRef.value(
          time,
          props.format,
          dateFnsOptionsRef.value
        )
      }
    }
    function handleTimeInputFocus (e: FocusEvent): void {
      if (isInternalFocusSwitch(e)) return
      doFocus(e)
    }
    function handleTimeInputBlur (e: FocusEvent): void {
      if (isInternalFocusSwitch(e)) return
      if (mergedShowRef.value) {
        const panelEl = panelInstRef.value?.$el
        if (!panelEl?.contains(e.relatedTarget as Node)) {
          deriveInputValue()
          doBlur(e)
          closePanel({
            returnFocus: false
          })
        }
      } else {
        deriveInputValue()
        doBlur(e)
      }
    }

    function handleTimeInputActivate (): void {
      if (mergedDisabledRef.value) return
      if (!mergedShowRef.value) {
        openPanel()
      }
    }
    function handleTimeInputDeactivate (): void {
      if (mergedDisabledRef.value) return
      deriveInputValue()
      closePanel({
        returnFocus: false
      })
    }
    function scrollTimer (): void {
      if (!panelInstRef.value) return
      const { hourScrollRef, minuteScrollRef, secondScrollRef, amPmScrollRef } =
        panelInstRef.value
      ;[hourScrollRef, minuteScrollRef, secondScrollRef, amPmScrollRef].forEach(
        (itemScrollRef) => {
          if (!itemScrollRef) return
          const activeItemEl =
            itemScrollRef.contentRef?.querySelector('[data-active]')
          if (activeItemEl) {
            itemScrollRef.scrollTo({
              top: (activeItemEl as HTMLElement).offsetTop
            })
          }
        }
      )
    }
    function doUpdateShow (value: boolean): void {
      uncontrolledShowRef.value = value
      const { onUpdateShow, 'onUpdate:show': _onUpdateShow } = props
      if (onUpdateShow) call(onUpdateShow, value)
      if (_onUpdateShow) call(_onUpdateShow, value)
    }
    function isInternalFocusSwitch (e: FocusEvent): boolean {
      return !!(
        inputInstRef.value?.wrapperElRef?.contains(e.relatedTarget as Node) ||
        panelInstRef.value?.$el.contains(e.relatedTarget as Node)
      )
    }
    function openPanel (): void {
      memorizedValueRef.value = mergedValueRef.value
      doUpdateShow(true)
      void nextTick(scrollTimer)
    }
    function handleClickOutside (e: MouseEvent): void {
      if (
        mergedShowRef.value &&
        !inputInstRef.value?.wrapperElRef?.contains(
          getPreciseEventTarget(e) as Node | null
        )
      ) {
        closePanel({
          returnFocus: false
        })
      }
    }
    function closePanel ({ returnFocus }: { returnFocus: boolean }): void {
      if (mergedShowRef.value) {
        doUpdateShow(false)
        if (returnFocus) {
          inputInstRef.value?.focus()
        }
      }
    }
    function handleTimeInputUpdateValue (v: string): void {
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
        const { value: mergedValue } = mergedValueRef
        if (mergedValue !== null) {
          const newTime = set(mergedValue, {
            hours: getHours(time),
            minutes: getMinutes(time),
            seconds: getSeconds(time)
          })
          doUpdateValue(getTime(newTime))
        } else {
          doUpdateValue(getTime(time))
        }
      }
    }
    function handleCancelClick (): void {
      doUpdateValue(memorizedValueRef.value)
      doUpdateShow(false)
    }
    function handleNowClick (): void {
      const now = new Date()
      const getNowTime = {
        hours: getHours,
        minutes: getMinutes,
        seconds: getSeconds
      }
      const [mergeHours, mergeMinutes, mergeSeconds] = (
        ['hours', 'minutes', 'seconds'] as const
      ).map((i) =>
        !props[i] || isTimeInStep(getNowTime[i](now), i, props[i])
          ? getNowTime[i](now)
          : findSimilarTime(getNowTime[i](now), i, props[i])
      )
      const newValue = setSeconds(
        setMinutes(
          setHours(
            mergedValueRef.value ? mergedValueRef.value : getTime(now),
            mergeHours
          ),
          mergeMinutes
        ),
        mergeSeconds
      )
      doUpdateValue(getTime(newValue))
    }
    function handleConfirmClick (): void {
      deriveInputValue()
      doConfirm()
      closePanel({
        returnFocus: true
      })
    }
    function handleMenuFocusOut (e: FocusEvent): void {
      if (isInternalFocusSwitch(e)) return
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
      if (isValueInvalidRef.value) {
        doUpdateValue(memorizedValueRef.value)
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
      localizedNow: localizedNowRef,
      localizedPlaceholder: localizedPlaceholderRef,
      localizedNegativeText: localizedNegativeTextRef,
      localizedPositiveText: localizedPositiveTextRef,
      hourInFormat: hourInFormatRef,
      minuteInFormat: minuteInFormatRef,
      secondInFormat: secondInFormatRef,
      mergedAttrSize: mergedAttrSizeRef,
      displayTimeString: displayTimeStringRef,
      mergedSize: mergedSizeRef,
      mergedDisabled: mergedDisabledRef,
      isValueInvalid: isValueInvalidRef,
      isHourInvalid: isHourInvalidRef,
      isMinuteInvalid: isMinuteInvalidRef,
      isSecondInvalid: isSecondInvalidRef,
      transitionDisabled: transitionDisabledRef,
      hourValue: hourValueRef,
      minuteValue: minuteValueRef,
      secondValue: secondValueRef,
      amPmValue: amPmValueRef,
      handleInputKeydown,
      handleTimeInputFocus,
      handleTimeInputBlur,
      handleNowClick,
      handleConfirmClick,
      handleTimeInputUpdateValue,
      handleMenuFocusOut,
      handleCancelClick,
      handleClickOutside,
      handleTimeInputActivate,
      handleTimeInputDeactivate,
      handleHourClick,
      handleMinuteClick,
      handleSecondClick,
      handleAmPmClick,
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
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const { mergedClsPrefix, $slots, triggerOnRender } = this
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
                  default: () => (
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
