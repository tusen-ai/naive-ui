import {
  h,
  defineComponent,
  ref,
  Transition,
  computed,
  provide,
  PropType,
  watch,
  withDirectives,
  ExtractPropTypes,
  CSSProperties,
  reactive,
  toRef,
  ComputedRef
} from 'vue'
import { VBinder, VTarget, VFollower, FollowerPlacement } from 'vueuc'
import { clickoutside } from 'vdirs'
import { format, getTime, isValid } from 'date-fns'
import { useIsMounted, useMergedState } from 'vooks'
import { InputRef, NInput } from '../../input'
import { NBaseIcon } from '../../_internal'
import { useFormItem, useTheme, useConfig, useLocale } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { DateIcon, ToIcon } from '../../_internal/icons'
import { warn, call, useAdjustedTo, createKey, MaybeArray } from '../../_utils'
import { datePickerLight } from '../styles'
import { strictParse } from './utils'
// import { getDerivedTimeFromKeyboardEvent } from './utils'
import {
  uniCalendarValidation,
  dualCalendarValidation
} from './validation-utils'
import DatetimePanel from './panel/datetime'
import DatetimerangePanel from './panel/datetimerange'
import DatePanel from './panel/date'
import DaterangePanel from './panel/daterange'
import style from './styles/index.cssr'
import { DatePickerTheme } from '../styles/light'
import {
  OnUpdateValue,
  OnUpdateValueImpl,
  Value,
  PanelRef,
  DatePickerInjection,
  IsDateDisabled,
  IsTimeDisabled
} from './interface'
import { Size as TimePickerSize } from '../../time-picker/src/interface'

const DATE_FORMAT = {
  date: 'yyyy-MM-dd',
  datetime: 'yyyy-MM-dd HH:mm:ss',
  daterange: 'yyyy-MM-dd',
  datetimerange: 'yyyy-MM-dd HH:mm:ss'
}

const datePickerProps = {
  ...(useTheme.props as ThemeProps<DatePickerTheme>),
  bordered: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  clearable: {
    type: Boolean,
    default: false
  },
  defaultValue: {
    type: [Number, Array] as PropType<Value | null>,
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  },
  placement: {
    type: String as PropType<FollowerPlacement>,
    default: 'bottom-start'
  },
  value: [Number, Array] as PropType<Value | null>,
  size: String as PropType<'small' | 'medium' | 'large'>,
  type: {
    type: String as PropType<
    'date' | 'datetime' | 'daterange' | 'datetimerange'
    >,
    default: 'date'
  },
  separator: String,
  placeholder: String,
  startPlaceholder: String,
  endPlaceholder: String,
  format: String,
  dateFormat: String,
  timeFormat: String,
  actions: Array as PropType<Array<'clear' | 'cancel' | 'confirm'>>,
  isDateDisabled: Function as PropType<IsDateDisabled>,
  isTimeDisabled: Function as PropType<IsTimeDisabled>,
  // eslint-disable-next-line vue/prop-name-casing
  'onUpdate:value': [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  onUpdateValue: [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  onFocus: [Function, Array] as PropType<(e: FocusEvent) => void>,
  onBlur: [Function, Array] as PropType<(e: FocusEvent) => void>,
  // deprecated
  onChange: {
    type: [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
    validator: () => {
      if (__DEV__) {
        warn(
          'data-picker',
          '`on-change` is deprecated, please use `on-update:value` instead.'
        )
      }
      return true
    },
    default: undefined
  }
} as const

export type DatePickerProps = ExtractPropTypes<typeof datePickerProps>

export default defineComponent({
  name: 'DatePicker',
  props: datePickerProps,
  setup (props) {
    const { locale, dateLocale } = useLocale('DatePicker')
    const formItem = useFormItem(props)
    const { NConfigProvider } = useConfig(props)
    const panelInstRef = ref<PanelRef | null>(null)
    const triggerElRef = ref<HTMLElement | null>(null)
    const inputInstRef = ref<InputRef | null>(null)
    const uncontrolledValueRef = ref(props.defaultValue)
    const controlledValueRef = computed(() => props.value)
    const mergedValueRef = useMergedState(
      controlledValueRef,
      uncontrolledValueRef
    )
    const singleInputValueRef = ref('')
    const rangeStartInputValueRef = ref('')
    const rangeEndInputValueRef = ref('')
    const activeRef = ref(false)
    const themeRef = useTheme(
      'DatePicker',
      'DatePicker',
      style,
      datePickerLight,
      props
    )
    const dateFnsOptionsRef = computed(() => {
      return {
        locale: dateLocale.value.locale
      }
    })
    const timePickerSizeRef = computed<TimePickerSize>(() => {
      return (
        NConfigProvider?.mergedComponentProps?.DatePicker?.timePickerSize ||
        'small'
      )
    })
    const isRangeRef = computed(() => {
      return ['daterange', 'datetimerange'].includes(props.type)
    })
    const localizedPlacehoderRef = computed(() => {
      if (props.placeholder === undefined) {
        if (props.type === 'date') {
          return locale.value.datePlaceholder
        } else if (props.type === 'datetime') {
          return locale.value.datetimePlaceholder
        }
        return props.placeholder
      } else {
        return props.placeholder
      }
    })
    const localizedStartPlaceholderRef = computed(() => {
      if (props.startPlaceholder === undefined) {
        if (props.type === 'daterange') {
          return locale.value.startDatePlaceholder
        } else if (props.type === 'datetimerange') {
          return locale.value.startDatetimePlaceholder
        }
        return ''
      } else {
        return props.startPlaceholder
      }
    })
    const localizedEndPlaceholderRef = computed(() => {
      if (props.endPlaceholder === undefined) {
        if (props.type === 'daterange') {
          return locale.value.endDatePlaceholder
        } else if (props.type === 'datetimerange') {
          return locale.value.endDatetimePlaceholder
        }
        return ''
      } else {
        return props.endPlaceholder
      }
    })
    const mergedFormatRef = computed(() => {
      return props.format || DATE_FORMAT[props.type]
    })
    function doUpdateValue (value: Value | null): void {
      const {
        'onUpdate:value': _onUpdateValue,
        onUpdateValue,
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
    function handleKeyDown (e: KeyboardEvent): void {
      if (e.code === 'Escape') {
        closeCalendar({
          returnFocus: true
        })
      }
      // We need to handle the conflict with normal date value input
      // const { value: mergedValue } = mergedValueRef
      // if (props.type === 'date' && !Array.isArray(mergedValue)) {
      //   const nextValue = getDerivedTimeFromKeyboardEvent(mergedValue, e)
      //   doUpdateValue(nextValue)
      // }
    }
    function handleClear (e: MouseEvent): void {
      e.stopPropagation()
    }
    function handlePanelTabOut (): void {
      closeCalendar({
        returnFocus: true
      })
    }
    function handleClickOutside (e: MouseEvent): void {
      if (activeRef.value && !triggerElRef.value?.contains(e.target as Node)) {
        closeCalendar({
          returnFocus: false
        })
      }
    }
    function handlePanelClose (): void {
      closeCalendar({
        returnFocus: true
      })
    }
    // --- Panel update value
    function handlePanelUpdateValue (value: number): void {
      doUpdateValue(value)
    }
    // --- Refresh
    function deriveInputState (): void {
      const value = mergedValueRef.value
      if (isRangeRef.value) {
        if (Array.isArray(value) || value === null) {
          deriveRangeInputState(value)
        }
      } else {
        if (!Array.isArray(value)) {
          deriveSingleInputState(value)
        }
      }
    }
    function deriveSingleInputState (value: number | null): void {
      if (value === null) {
        singleInputValueRef.value = ''
      } else {
        singleInputValueRef.value = format(value, mergedFormatRef.value)
      }
    }
    function deriveRangeInputState (values: [number, number] | null): void {
      if (values === null) {
        rangeStartInputValueRef.value = ''
        rangeEndInputValueRef.value = ''
      } else {
        rangeStartInputValueRef.value = format(values[0], mergedFormatRef.value)
        rangeEndInputValueRef.value = format(values[1], mergedFormatRef.value)
      }
    }
    // --- Input deactivate & blur
    function handleInputActivate (): void {
      if (!activeRef.value) {
        openCalendar()
      }
    }
    function handleInputBlur (e: FocusEvent): void {
      if (!panelInstRef.value?.$el.contains(e.relatedTarget as Node)) {
        doBlur(e)
        deriveInputState()
        closeCalendar({
          returnFocus: false
        })
      }
    }
    function handleInputDeactivate (): void {
      if (props.disabled) return
      deriveInputState()
      closeCalendar({
        returnFocus: false
      })
    }
    // --- Input
    function handleSingleUpdateValue (v: string): void {
      // TODO, fix conflict with clear
      if (v === '') {
        doUpdateValue(null)
        return
      }
      const newSelectedDateTime = strictParse(
        v,
        mergedFormatRef.value,
        new Date(),
        dateFnsOptionsRef.value
      )
      if (isValid(newSelectedDateTime)) {
        doUpdateValue(getTime(newSelectedDateTime))
        deriveInputState()
      } else {
        singleInputValueRef.value = v
      }
    }
    function handleRangeUpdateValue (v: [string, string]): void {
      if (v[0] === '' && v[1] === '') {
        // clear or just delete all the inputs
        doUpdateValue(null)
        return
      }
      const [startTime, endTime] = v
      const newStartTime = strictParse(
        startTime,
        mergedFormatRef.value,
        new Date(),
        dateFnsOptionsRef.value
      )
      const newEndTime = strictParse(
        endTime,
        mergedFormatRef.value,
        new Date(),
        dateFnsOptionsRef.value
      )
      if (isValid(newStartTime) && isValid(newEndTime)) {
        doUpdateValue([getTime(newStartTime), getTime(newEndTime)])
        deriveInputState()
      } else {
        ;[rangeStartInputValueRef.value, rangeEndInputValueRef.value] = v
      }
    }
    // --- Click
    function handleTriggerClick (): void {
      if (props.disabled) return
      if (!activeRef.value) {
        openCalendar()
      }
    }
    // --- Focus
    function handleInputFocus (e: FocusEvent): void {
      if (props.disabled) return
      doFocus(e)
    }
    // --- Calendar
    function openCalendar (): void {
      if (props.disabled || activeRef.value) return
      activeRef.value = true
    }
    function closeCalendar ({ returnFocus }: { returnFocus: boolean }): void {
      if (activeRef.value) {
        activeRef.value = false
        if (returnFocus) {
          inputInstRef.value?.focus()
        }
      }
    }
    // If new value is valid, set calendarTime and refresh display strings.
    // If new value is invalid, do nothing.
    watch(mergedValueRef, () => {
      deriveInputState()
    })
    // init
    deriveInputState()

    const uniVaidation = uniCalendarValidation(props, mergedValueRef)
    const dualValidation = dualCalendarValidation(props, mergedValueRef)
    provide<DatePickerInjection>(
      'NDatePicker',
      reactive({
        mergedTheme: themeRef,
        timePickerSize: timePickerSizeRef,
        locale: locale,
        dateLocale: dateLocale,
        value: mergedValueRef,
        isDateDisabled: toRef(
          props,
          'isDateDisabled'
        ) as ComputedRef<IsDateDisabled>,
        ...uniVaidation,
        ...dualValidation
      })
    )
    return {
      uncontrolledValue: uncontrolledValueRef,
      mergedValue: mergedValueRef,
      panelInstRef,
      triggerElRef,
      inputInstRef,
      isMounted: useIsMounted(),
      displayTime: singleInputValueRef,
      displayStartTime: rangeStartInputValueRef,
      displayEndTime: rangeEndInputValueRef,
      active: activeRef,
      adjustedTo: useAdjustedTo(props),
      isRange: isRangeRef,
      localizedStartPlaceholder: localizedStartPlaceholderRef,
      localizedEndPlaceholder: localizedEndPlaceholderRef,
      mergedSize: formItem.mergedSize,
      localizedPlacehoder: localizedPlacehoderRef,
      isValueInvalid: uniVaidation.isValueInvalid,
      isStartValueInvalid: dualValidation.isStartValueInvalid,
      isEndValueInvalid: dualValidation.isEndValueInvalid,
      handleClickOutside,
      handleKeyDown,
      handleClear,
      handleTriggerClick,
      handleInputActivate,
      handleInputDeactivate,
      handleInputFocus,
      handleInputBlur,
      handlePanelTabOut,
      handlePanelClose,
      handleRangeUpdateValue,
      handleSingleUpdateValue,
      handlePanelUpdateValue,
      ...useConfig(props),
      mergedTheme: themeRef,
      triggerCssVars: computed(() => {
        const {
          common: { cubicBezierEaseInOut },
          self: { iconColor, iconColorDisabled }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--icon-color': iconColor,
          '--icon-color-disabled': iconColorDisabled
        }
      }),
      cssVars: computed(() => {
        const { type } = props
        const {
          common: { cubicBezierEaseInOut },
          self: {
            calendarTitleFontSize,
            calendarDaysFontSize,
            itemFontSize,
            itemTextColor,
            itemColorDisabled,
            itemColorIncluded,
            itemColorHover,
            itemColorActive,
            itemBorderRadius,
            itemTextColorDisabled,
            itemTextColorActive,
            panelColor,
            panelTextColor,
            arrowColor,
            calendarTitleTextColor,
            panelActionDividerColor,
            panelHeaderDividerColor,
            calendarDaysDividerColor,
            panelBoxShadow,
            panelBorderRadius,
            calendarTitleFontWeight,
            panelActionPadding,
            itemSize,
            itemCellWidth,
            itemCellHeight,
            calendarTitlePadding,
            calendarTitleHeight,
            calendarDaysHeight,
            calendarDaysTextColor,
            arrowSize,
            panelHeaderPadding,
            calendarDividerColor,
            calendarTitleGridTempateColumns,
            [createKey('calendarLeftPadding', type)]: calendarLeftPadding,
            [createKey('calendarRightPadding', type)]: calendarRightPadding
          }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,

          '--panel-border-radius': panelBorderRadius,
          '--panel-color': panelColor,
          '--panel-box-shadow': panelBoxShadow,
          '--panel-text-color': panelTextColor,

          // panel header
          '--panel-header-padding': panelHeaderPadding,
          '--panel-header-divider-color': panelHeaderDividerColor,

          // panel calendar
          '--calendar-left-padding': calendarLeftPadding,
          '--calendar-right-padding': calendarRightPadding,
          '--calendar-title-height': calendarTitleHeight,
          '--calendar-title-padding': calendarTitlePadding,
          '--calendar-title-font-size': calendarTitleFontSize,
          '--calendar-title-font-weight': calendarTitleFontWeight,
          '--calendar-title-text-color': calendarTitleTextColor,
          '--calendar-title-grid-template-columns': calendarTitleGridTempateColumns,
          '--calendar-days-height': calendarDaysHeight,
          '--calendar-days-divider-color': calendarDaysDividerColor,
          '--calendar-days-font-size': calendarDaysFontSize,
          '--calendar-days-text-color': calendarDaysTextColor,
          '--calendar-divider-color': calendarDividerColor,

          // panel action
          '--panel-action-padding': panelActionPadding,
          '--panel-action-divider-color': panelActionDividerColor,

          // panel item
          '--item-font-size': itemFontSize,
          '--item-border-radius': itemBorderRadius,
          '--item-size': itemSize,
          '--item-cell-width': itemCellWidth,
          '--item-cell-height': itemCellHeight,
          '--item-text-color': itemTextColor,
          '--item-color-included': itemColorIncluded,
          '--item-color-disabled': itemColorDisabled,
          '--item-color-hover': itemColorHover,
          '--item-color-active': itemColorActive,
          '--item-text-color-disabled': itemTextColorDisabled,
          '--item-text-color-active': itemTextColorActive,

          // panel arrow
          '--arrow-size': arrowSize,
          '--arrow-color': arrowColor
        }
      })
    }
  },
  render () {
    const commonInputProps = {
      bordered: this.mergedBordered,
      size: this.mergedSize,
      theme: this.mergedTheme.peers.Input,
      themeOverrides: this.mergedTheme.peerOverrides.Input,
      passivelyActivated: true,
      disabled: this.disabled,
      readonly: this.disabled,
      forceFocus: this.active,
      deactivateOnEnter: true,
      clearable: this.clearable,
      onClear: this.handleClear,
      onClick: this.handleTriggerClick,
      onActivate: this.handleInputActivate,
      onDeactivate: this.handleInputDeactivate,
      onFocus: this.handleInputFocus,
      onBlur: this.handleInputBlur
    }
    const commonPanelProps = {
      onUpdateValue: this.handlePanelUpdateValue,
      onTabOut: this.handlePanelTabOut,
      onClose: this.handlePanelClose,
      onKeydown: this.handleKeyDown,
      ref: 'panelInstRef',
      value: this.mergedValue,
      active: this.active,
      actions: this.actions,
      style: this.cssVars as CSSProperties
    }
    return (
      <div
        ref="triggerElRef"
        class={[
          'n-date-picker',
          {
            'n-date-picker--disabled': this.disabled,
            'n-date-picker--range': this.isRange
          }
        ]}
        style={this.triggerCssVars as CSSProperties}
        onKeydown={this.handleKeyDown}
      >
        <VBinder>
          {{
            default: () => [
              <VTarget>
                {{
                  default: () =>
                    this.isRange ? (
                      <NInput
                        ref="inputInstRef"
                        value={[this.displayStartTime, this.displayEndTime]}
                        placeholder={[
                          this.localizedStartPlaceholder,
                          this.localizedEndPlaceholder
                        ]}
                        textDecoration={[
                          this.isStartValueInvalid ? 'line-through' : '',
                          this.isEndValueInvalid ? 'line-through' : ''
                        ]}
                        pair
                        onUpdateValue={this.handleRangeUpdateValue}
                        {...commonInputProps}
                      >
                        {{
                          separator: () => (
                            <NBaseIcon class="n-date-picker-icon">
                              {{ default: () => <ToIcon /> }}
                            </NBaseIcon>
                          ),
                          clear: () => (
                            <NBaseIcon class="n-date-picker-icon">
                              {{ default: () => <DateIcon /> }}
                            </NBaseIcon>
                          )
                        }}
                      </NInput>
                    ) : (
                      <NInput
                        ref="inputInstRef"
                        value={this.displayTime}
                        placeholder={this.localizedPlacehoder}
                        textDecoration={
                          this.isValueInvalid && !this.isRange
                            ? 'line-through'
                            : ''
                        }
                        onUpdateValue={this.handleSingleUpdateValue}
                        {...commonInputProps}
                      >
                        {{
                          clear: () => (
                            <NBaseIcon class="n-date-picker-icon">
                              {{ default: () => <DateIcon /> }}
                            </NBaseIcon>
                          )
                        }}
                      </NInput>
                    )
                }}
              </VTarget>,
              <VFollower
                show={this.active}
                containerClass={this.namespace}
                to={this.adjustedTo}
                placement="bottom-start"
              >
                {{
                  default: () => (
                    <Transition
                      name="n-fade-in-scale-up-transition"
                      appear={this.isMounted}
                    >
                      {{
                        default: () =>
                          this.active
                            ? withDirectives(
                              this.type === 'datetime' ? (
                                <DatetimePanel {...commonPanelProps} />
                              ) : this.type === 'daterange' ? (
                                <DaterangePanel {...commonPanelProps} />
                              ) : this.type === 'datetimerange' ? (
                                <DatetimerangePanel {...commonPanelProps} />
                              ) : (
                                <DatePanel {...commonPanelProps} />
                              ),
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
