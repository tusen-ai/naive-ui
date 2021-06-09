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
  CSSProperties
} from 'vue'
import { useIsMounted, useKeyboard, useMergedState } from 'vooks'
import { VBinder, VTarget, VFollower } from 'vueuc'
import { clickoutside } from 'vdirs'
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
  warn,
  call,
  useAdjustedTo,
  MaybeArray,
  ExtractPublicPropTypes
} from '../../_utils'
import { timePickerLight } from '../styles'
import type { TimePickerTheme } from '../styles'
import Panel from './Panel'
import style from './styles/index.cssr'
import {
  IsHourDisabled,
  IsMinuteDisabled,
  IsSecondDisabled,
  OnUpdateValue,
  OnUpdateValueImpl,
  PanelRef,
  Size,
  timePickerInjectionKey
} from './interface'

// validate hours,minutes,seconds prop
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
  clearable: {
    type: Boolean,
    default: false
  },
  // eslint-disable-next-line vue/prop-name-casing
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
    type: Boolean,
    default: false
  },
  // deprecated
  onChange: {
    type: [Function, Array] as PropType<MaybeArray<OnUpdateValue> | undefined>,
    validator: () => {
      if (__DEV__) {
        warn(
          'time-picker',
          '`on-change` is deprecated, please use `on-update:value` instead.'
        )
      }
      return true
    },
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
  }
}

export type TimePickerProps = ExtractPublicPropTypes<typeof timePickerProps>

export default defineComponent({
  name: 'TimePicker',
  props: timePickerProps,
  setup (props) {
    const { mergedBorderedRef, mergedClsPrefixRef, namespaceRef } =
      useConfig(props)
    const { localeRef, dateLocaleRef } = useLocale('TimePicker')
    const formItem = useFormItem(props)
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
    const activeRef = ref(false)
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
      if (!isHourDisabled) return false
      if (hourValueRef.value === null) return false
      return isHourDisabled(hourValueRef.value)
    })
    const isMinuteInvalidRef = computed(() => {
      const { isMinuteDisabled } = props
      if (!isMinuteDisabled) return false
      const { value: minuteValue } = minuteValueRef
      const { value: hourValue } = hourValueRef
      if (minuteValue === null || hourValue === null) return false
      return isMinuteDisabled(minuteValue, hourValue)
    })
    const isSecondInvalidRef = computed(() => {
      const { isSecondDisabled } = props
      if (!isSecondDisabled) return false
      const { value: minuteValue } = minuteValueRef
      const { value: hourValue } = hourValueRef
      const { value: secondValue } = secondValueRef
      if (secondValue === null || minuteValue === null || hourValue === null) {
        return false
      }
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
    function handleHourClick (hour: number): void {
      if (mergedValueRef.value === null) {
        doChange(getTime(setHours(startOfHour(new Date()), hour)))
      } else {
        doChange(getTime(setHours(mergedValueRef.value, hour)))
      }
    }
    function handleMinuteClick (minute: number): void {
      if (mergedValueRef.value === null) {
        doChange(getTime(setMinutes(startOfMinute(new Date()), minute)))
      } else {
        doChange(getTime(setMinutes(mergedValueRef.value, minute)))
      }
    }
    function handleSecondClick (second: number): void {
      if (mergedValueRef.value === null) {
        doChange(getTime(setSeconds(startOfSecond(new Date()), second)))
      } else {
        doChange(getTime(setSeconds(mergedValueRef.value, second)))
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
      if (activeRef.value) {
        const panelEl = panelInstRef.value?.$el
        if (!panelEl?.contains(e.relatedTarget as Node)) {
          doBlur(e)
          closePanel({
            returnFocus: false
          })
        }
      }
    }

    function handleTimeInputActivate (): void {
      if (props.disabled) return
      if (!activeRef.value) {
        openPanel()
      }
    }
    function handleTimeInputDeactivate (): void {
      if (props.disabled) return
      deriveInputValue()
      closePanel({
        returnFocus: false
      })
    }
    function scrollTimer (): void {
      if (!panelInstRef.value) return
      const { hourScrollRef, minuteScrollRef, secondScrollRef } =
        panelInstRef.value
      if (hourScrollRef) {
        const hour = hourScrollRef.contentRef?.querySelector(
          '[data-active]'
        ) as HTMLElement
        if (hour) {
          hourScrollRef.scrollTo({ top: hour.offsetTop })
        }
      }
      if (minuteScrollRef) {
        const minute = minuteScrollRef.contentRef?.querySelector(
          '[data-active]'
        ) as HTMLElement
        if (minute) {
          minuteScrollRef.scrollTo({ top: minute.offsetTop })
        }
      }
      if (secondScrollRef) {
        const second = secondScrollRef.contentRef?.querySelector(
          '[data-active]'
        ) as HTMLElement
        if (second) {
          secondScrollRef.scrollTo({ top: second.offsetTop })
        }
      }
    }
    function isInternalFocusSwitch (e: FocusEvent): boolean {
      return !!(
        inputInstRef.value?.wrapperElRef?.contains(e.relatedTarget as Node) ||
        panelInstRef.value?.$el.contains(e.relatedTarget as Node)
      )
    }
    function openPanel (): void {
      memorizedValueRef.value = mergedValueRef.value
      activeRef.value = true
      void nextTick(scrollTimer)
    }
    function handleClickOutside (e: MouseEvent): void {
      if (
        activeRef.value &&
        !inputInstRef.value?.wrapperElRef?.contains(e.target as Node)
      ) {
        closePanel({
          returnFocus: false
        })
      }
    }
    function closePanel ({ returnFocus }: { returnFocus: boolean }): void {
      if (activeRef.value) {
        activeRef.value = false
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
      activeRef.value = false
    }
    function handleNowClick (): void {
      const now = new Date()
      if (!mergedValueRef.value) doChange(getTime(now))
      else {
        const newValue = setSeconds(
          setMinutes(
            setHours(mergedValueRef.value, getHours(now)),
            getMinutes(now)
          ),
          getSeconds(now)
        )
        doChange(getTime(newValue))
      }
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
    watch(activeRef, () => {
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
      active: activeRef,
      localizedNow: localizedNowRef,
      localizedPlaceholder: localizedPlaceholderRef,
      localizedNegativeText: localizedNegativeTextRef,
      localizedPositiveText: localizedPositiveTextRef,
      hourInFormat: hourInFormatRef,
      minuteInFormat: minuteInFormatRef,
      secondInFormat: secondInFormatRef,
      mergedAttrSize: mergedAttrSizeRef,
      displayTimeString: displayTimeStringRef,
      mergedSize: formItem.mergedSizeRef,
      isValueInvalid: isValueInvalidRef,
      isHourInvalid: isHourInvalidRef,
      isMinuteInvalid: isMinuteInvalidRef,
      isSecondInvalid: isSecondInvalidRef,
      transitionDisabled: transitionDisabledRef,
      hourValue: hourValueRef,
      minuteValue: minuteValueRef,
      secondValue: secondValueRef,
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
      handleTimeInputClear,
      handleFocusDetectorFocus,
      handleMenuKeyDown,
      mergedTheme: themeRef,
      triggerCssVars: computed(() => {
        const {
          common: { cubicBezierEaseInOut },
          self: { iconColor, iconColorDisabled }
        } = themeRef.value
        return {
          '--icon-color': iconColor,
          '--icon-color-disabled': iconColorDisabled,
          '--bezier': cubicBezierEaseInOut
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
            panelActionPadding
          },
          common: { cubicBezierEaseInOut }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--border-radius': borderRadius,
          '--item-color-hover': itemColorHover,
          '--item-font-size': itemFontSize,
          '--item-height': itemHeight,
          '--item-opacity-disabled': itemOpacityDisabled,
          '--item-text-color': itemTextColor,
          '--item-text-color-active': itemTextColorActive,
          '--item-width': itemWidth,
          '--panel-action-padding': panelActionPadding,
          '--panel-box-shadow': panelBoxShadow,
          '--panel-color': panelColor,
          '--panel-divider-color': panelDividerColor
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
                      disabled={this.disabled}
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
                      internalForceFocus={this.active}
                    >
                      {this.showIcon
                        ? {
                          suffix: () => (
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
                show={this.active}
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
                          this.active
                            ? withDirectives(
                              <Panel
                                ref="panelInstRef"
                                style={this.cssVars as CSSProperties}
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
                                showSecond={this.secondInFormat}
                                isSecondInvalid={this.isSecondInvalid}
                                isSecondDisabled={this.isSecondDisabled}
                                isValueInvalid={this.isValueInvalid}
                                nowText={this.localizedNow}
                                confirmText={this.localizedPositiveText}
                                onFocusout={this.handleMenuFocusOut}
                                onKeydown={this.handleMenuKeyDown}
                                onHourClick={this.handleHourClick}
                                onMinuteClick={this.handleMinuteClick}
                                onSecondClick={this.handleSecondClick}
                                onNowClick={this.handleNowClick}
                                onConfirmClick={this.handleConfirmClick}
                                onFocusDetectorFocus={
                                  this.handleFocusDetectorFocus
                                }
                                seconds={this.seconds}
                                minutes={this.minutes}
                                hours={this.hours}
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
