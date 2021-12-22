import {
  h,
  ref,
  toRef,
  defineComponent,
  computed,
  withDirectives,
  PropType,
  Transition,
  provide,
  nextTick,
  watch,
  CSSProperties,
  watchEffect
} from 'vue'
import { useIsMounted, useKeyboard, useMergedState } from 'vooks'
import { VBinder, VTarget, VFollower } from 'vueuc'
import { clickoutside } from 'vdirs'
import { happensIn } from 'seemly'
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
} from 'date-fns'
import { strictParse } from '../../date-picker/src/utils'
import { TimeIcon } from '../../_internal/icons'
import { InputInst, NInput } from '../../input'
import { NBaseIcon } from '../../_internal'
import { useConfig, useTheme, useLocale, useFormItem } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import {
  call,
  useAdjustedTo,
  MaybeArray,
  ExtractPublicPropTypes,
  warnOnce
} from '../../_utils'
import { timePickerLight } from '../styles'
import type { TimePickerTheme } from '../styles'
import Panel from './Panel'
import {
  IsHourDisabled,
  IsMinuteDisabled,
  IsSecondDisabled,
  ItemValue,
  OnUpdateValue,
  OnUpdateValueImpl,
  PanelRef,
  Size,
  timePickerInjectionKey
} from './interface'
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

const timePickerProps = {
  ...(useTheme.props as ThemeProps<TimePickerTheme>),
  to: useAdjustedTo.propTo,
  bordered: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  actions: Array as PropType<Array<'now' | 'confirm'>>,
  defaultValue: {
    type: Number as PropType<number | null>,
    default: null
  },
  placeholder: String,
  placement: {
    type: String,
    default: 'bottom-start'
  },
  value: Number as PropType<number | null>,
  format: {
    type: String,
    default: 'HH:mm:ss'
  },
  isHourDisabled: Function as PropType<IsHourDisabled>,
  size: String as PropType<Size>,
  isMinuteDisabled: Function as PropType<IsMinuteDisabled>,
  isSecondDisabled: Function as PropType<IsSecondDisabled>,
  inputReadonly: Boolean,
  clearable: Boolean,
  'onUpdate:value': [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  onUpdateValue: [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  onBlur: [Function, Array] as PropType<MaybeArray<(e: FocusEvent) => void>>,
  onFocus: [Function, Array] as PropType<MaybeArray<(e: FocusEvent) => void>>,
  // private
  stateful: {
    type: Boolean,
    default: true
  },
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

    const { mergedBorderedRef, mergedClsPrefixRef, namespaceRef } =
      useConfig(props)
    const { localeRef, dateLocaleRef } = useLocale('TimePicker')
    const formItem = useFormItem(props)
    const { mergedSizeRef, mergedDisabledRef } = formItem
    const themeRef = useTheme(
      'TimePicker',
      'TimePicker',
      style,
      timePickerLight,
      props,
      mergedClsPrefixRef
    )

    const keyboardState = useKeyboard()

    const inputInstRef = ref<InputInst | null>(null)
    const panelInstRef = ref<PanelRef | null>(null)

    const uncontrolledValueRef = ref(props.defaultValue)
    const controlledValueRef = toRef(props, 'value')
    const mergedValueRef = useMergedState(
      controlledValueRef,
      uncontrolledValueRef
    )
    const dateFnsOptionsRef = computed(() => {
      return {
        locale: dateLocaleRef.value.locale
      }
    })
    const { value: mergedValue } = mergedValueRef
    const displayTimeStringRef = ref(
      mergedValue === null
        ? ''
        : format(mergedValue, props.format, dateFnsOptionsRef.value)
    )
    const uncontrolledShowRef = ref(false)
    const controlledShowRef = toRef(props, 'show')
    const mergedShowRef = useMergedState(controlledShowRef, uncontrolledShowRef)
    const memorizedValueRef = ref(mergedValue)
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
      return Number(format(value, 'HH', dateFnsOptionsRef.value))
    })
    const minuteValueRef = computed(() => {
      const { value } = mergedValueRef
      if (value === null) return null
      return Number(format(value, 'mm', dateFnsOptionsRef.value))
    })
    const secondValueRef = computed(() => {
      const { value } = mergedValueRef
      if (value === null) return null
      return Number(format(value, 'ss', dateFnsOptionsRef.value))
    })
    function doChange (value: number | null): void {
      const {
        onUpdateValue,
        'onUpdate:value': _onUpdateValue,
        onChange
      } = props
      const { nTriggerFormChange, nTriggerFormInput } = formItem
      if (onUpdateValue) call(onUpdateValue as OnUpdateValueImpl, value)
      if (_onUpdateValue) call(_onUpdateValue as OnUpdateValueImpl, value)
      if (onChange) call(onChange as OnUpdateValueImpl, value)
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
    function handleTimeInputClear (e: MouseEvent): void {
      e.stopPropagation()
      doChange(null)
      deriveInputValue(null)
    }
    function handleFocusDetectorFocus (): void {
      closePanel({
        returnFocus: true
      })
    }
    function handleMenuKeyDown (e: KeyboardEvent): void {
      switch (e.code) {
        case 'Escape':
          closePanel({
            returnFocus: true
          })
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
        doChange(getTime(setHours(startOfHour(new Date()), hour)))
      } else {
        doChange(getTime(setHours(mergedValueRef.value, hour)))
      }
    }
    function handleMinuteClick (minute: ItemValue): void {
      if (typeof minute === 'string') return
      if (mergedValueRef.value === null) {
        doChange(getTime(setMinutes(startOfMinute(new Date()), minute)))
      } else {
        doChange(getTime(setMinutes(mergedValueRef.value, minute)))
      }
    }
    function handleSecondClick (second: ItemValue): void {
      if (typeof second === 'string') return
      if (mergedValueRef.value === null) {
        doChange(getTime(setSeconds(startOfSecond(new Date()), second)))
      } else {
        doChange(getTime(setSeconds(mergedValueRef.value, second)))
      }
    }
    function handleAmPmClick (amPm: ItemValue): void {
      const { value: mergedValue } = mergedValueRef
      if (mergedValue === null) {
        const now = new Date()
        const hours = getHours(now)
        if (amPm === 'pm' && hours < 12) {
          doChange(getTime(setHours(now, hours + 12)))
        } else if (amPm === 'am' && hours >= 12) {
          doChange(getTime(setHours(now, hours - 12)))
        }
        doChange(getTime(now))
      } else {
        const hours = getHours(mergedValue)
        if (amPm === 'pm' && hours < 12) {
          doChange(getTime(setHours(mergedValue, hours + 12)))
        } else if (amPm === 'am' && hours >= 12) {
          doChange(getTime(setHours(mergedValue, hours - 12)))
        }
      }
    }
    function deriveInputValue (time?: null | number): void {
      if (time === undefined) time = mergedValueRef.value
      if (time === null) displayTimeStringRef.value = ''
      else {
        displayTimeStringRef.value = format(
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
          doBlur(e)
          closePanel({
            returnFocus: false
          })
        }
      } else {
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
        !inputInstRef.value?.wrapperElRef?.contains(e.target as Node)
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
        doChange(null)
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
          doChange(getTime(newTime))
        } else {
          doChange(getTime(time))
        }
      }
    }
    function handleCancelClick (): void {
      doChange(memorizedValueRef.value)
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
      doChange(getTime(newValue))
    }
    function handleConfirmClick (): void {
      deriveInputValue()
      closePanel({
        returnFocus: true
      })
    }
    function handleMenuFocusOut (e: FocusEvent): void {
      if (isInternalFocusSwitch(e)) return
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
        doChange(memorizedValueRef.value)
      }
    })
    provide(timePickerInjectionKey, {
      mergedThemeRef: themeRef,
      mergedClsPrefixRef
    })
    return {
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
      handleMenuKeyDown,
      handleTriggerClick,
      mergedTheme: themeRef,
      triggerCssVars: computed(() => {
        const {
          common: { cubicBezierEaseInOut },
          self: { iconColor, iconColorDisabled }
        } = themeRef.value
        return {
          '--n-icon-color': iconColor,
          '--n-icon-color-disabled': iconColorDisabled,
          '--n-bezier': cubicBezierEaseInOut
        }
      }),
      cssVars: computed(() => {
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
    }
  },
  render () {
    const { mergedClsPrefix } = this
    return (
      <div
        class={`${mergedClsPrefix}-time-picker`}
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
                    >
                      {this.showIcon
                        ? {
                            [this.clearable ? 'clear' : 'suffix']: () => (
                              <NBaseIcon
                                clsPrefix={mergedClsPrefix}
                                class={`${mergedClsPrefix}-time-picker-icon`}
                              >
                                {{
                                  default: () => <TimeIcon />
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
                placement="bottom-start"
              >
                {{
                  default: () => (
                    <Transition
                      name="fade-in-scale-up-transition"
                      appear={this.isMounted}
                    >
                      {{
                        default: () =>
                          this.mergedShow
                            ? withDirectives(
                                <Panel
                                  ref="panelInstRef"
                                  actions={this.actions}
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
                                  onKeydown={this.handleMenuKeyDown}
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
                                [[clickoutside, this.handleClickOutside]]
                            )
                            : null
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
