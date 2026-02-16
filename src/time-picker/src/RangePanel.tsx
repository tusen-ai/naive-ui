import type { PropType } from 'vue'
import type { MaybeArray } from '../../_utils'
import type {
  IsHourDisabled,
  IsMinuteDisabled,
  IsSecondDisabled,
  Item,
  ItemValue
} from './interface'
import { computed, defineComponent, h, inject, ref } from 'vue'
import { NBaseFocusDetector, NScrollbar } from '../../_internal'
import { NButton } from '../../button'
import { timePickerInjectionKey } from './interface'
import PanelCol from './PanelCol'
import { getAmPm, getTimeUnits, time } from './utils'

const timePickerRangePanelProps = {
  actions: {
    type: Array as PropType<Array<'clear' | 'now' | 'confirm'> | null>,
    default: () => ['now', 'confirm']
  },
  showHour: {
    type: Boolean,
    default: true
  },
  showMinute: {
    type: Boolean,
    default: true
  },
  showSecond: {
    type: Boolean,
    default: true
  },
  showPeriod: {
    type: Boolean,
    default: true
  },
  // start values
  startHourValue: {
    type: Number as PropType<number | null>,
    default: null
  },
  startMinuteValue: {
    type: Number as PropType<number | null>,
    default: null
  },
  startSecondValue: {
    type: Number as PropType<number | null>,
    default: null
  },
  startAmPmValue: {
    type: String as PropType<'am' | 'pm' | null>,
    default: null
  },
  isStartHourInvalid: Boolean,
  isStartMinuteInvalid: Boolean,
  isStartSecondInvalid: Boolean,
  isStartAmPmInvalid: Boolean,
  isStartValueInvalid: Boolean,
  // end values
  endHourValue: {
    type: Number as PropType<number | null>,
    default: null
  },
  endMinuteValue: {
    type: Number as PropType<number | null>,
    default: null
  },
  endSecondValue: {
    type: Number as PropType<number | null>,
    default: null
  },
  endAmPmValue: {
    type: String as PropType<'am' | 'pm' | null>,
    default: null
  },
  isEndHourInvalid: Boolean,
  isEndMinuteInvalid: Boolean,
  isEndSecondInvalid: Boolean,
  isEndAmPmInvalid: Boolean,
  isEndValueInvalid: Boolean,
  // disabled functions
  isStartHourDisabled: Function as PropType<IsHourDisabled>,
  isStartMinuteDisabled: Function as PropType<IsMinuteDisabled>,
  isStartSecondDisabled: Function as PropType<IsSecondDisabled>,
  isEndHourDisabled: Function as PropType<IsHourDisabled>,
  isEndMinuteDisabled: Function as PropType<IsMinuteDisabled>,
  isEndSecondDisabled: Function as PropType<IsSecondDisabled>,
  // start callbacks
  onStartHourClick: {
    type: Function as PropType<(value: ItemValue) => void>,
    required: true
  },
  onStartMinuteClick: {
    type: Function as PropType<(value: ItemValue) => void>,
    required: true
  },
  onStartSecondClick: {
    type: Function as PropType<(value: ItemValue) => void>,
    required: true
  },
  onStartAmPmClick: {
    type: Function as PropType<(value: ItemValue) => void>,
    required: true
  },
  // end callbacks
  onEndHourClick: {
    type: Function as PropType<(value: ItemValue) => void>,
    required: true
  },
  onEndMinuteClick: {
    type: Function as PropType<(value: ItemValue) => void>,
    required: true
  },
  onEndSecondClick: {
    type: Function as PropType<(value: ItemValue) => void>,
    required: true
  },
  onEndAmPmClick: {
    type: Function as PropType<(value: ItemValue) => void>,
    required: true
  },
  // shared
  onNowClick: Function as PropType<() => void>,
  clearText: String,
  nowText: String,
  confirmText: String,
  transitionDisabled: Boolean,
  onClearClick: Function as PropType<() => void>,
  onConfirmClick: Function as PropType<() => void>,
  onFocusin: Function as PropType<(e: FocusEvent) => void>,
  onFocusout: Function as PropType<(e: FocusEvent) => void>,
  onFocusDetectorFocus: Function as PropType<() => void>,
  onKeydown: Function as PropType<(e: KeyboardEvent) => void>,
  hours: [Number, Array] as PropType<MaybeArray<number>>,
  minutes: [Number, Array] as PropType<MaybeArray<number>>,
  seconds: [Number, Array] as PropType<MaybeArray<number>>,
  use12Hours: Boolean,
  isRangeInvalid: Boolean
}

export default defineComponent({
  name: 'TimePickerRangePanel',
  props: timePickerRangePanelProps,
  setup(props) {
    const { mergedThemeRef, mergedClsPrefixRef } = inject(
      timePickerInjectionKey
    )!

    // start hours
    const startHoursRef = computed<Item[]>(() => {
      const { isStartHourDisabled, hours, use12Hours, startAmPmValue } = props
      if (!use12Hours) {
        return getTimeUnits(time.hours, hours).map((hour) => {
          return {
            label: hour,
            value: Number(hour),
            disabled: isStartHourDisabled
              ? isStartHourDisabled(Number(hour))
              : false
          }
        })
      }
      else {
        const mergedAmPmValue = startAmPmValue ?? getAmPm(Date.now())
        return getTimeUnits(time.hours, hours, mergedAmPmValue).map((hour) => {
          const hourAs12FormattedNumber = Number(hour)
          const hourAs24FormattedNumber
            = mergedAmPmValue === 'pm' && hourAs12FormattedNumber !== 12
              ? hourAs12FormattedNumber + 12
              : hourAs12FormattedNumber
          return {
            label: hour,
            value: hourAs24FormattedNumber,
            disabled: isStartHourDisabled
              ? isStartHourDisabled(hourAs24FormattedNumber)
              : false
          }
        })
      }
    })
    const startMinutesRef = computed<Item[]>(() => {
      const { isStartMinuteDisabled, minutes } = props
      return getTimeUnits(time.minutes, minutes).map((minute) => {
        return {
          label: minute,
          value: Number(minute),
          disabled: isStartMinuteDisabled
            ? isStartMinuteDisabled(Number(minute), props.startHourValue)
            : false
        }
      })
    })
    const startSecondsRef = computed<Item[]>(() => {
      const { isStartSecondDisabled, seconds } = props
      return getTimeUnits(time.seconds, seconds).map((second) => {
        return {
          label: second,
          value: Number(second),
          disabled: isStartSecondDisabled
            ? isStartSecondDisabled(
                Number(second),
                props.startMinuteValue,
                props.startHourValue
              )
            : false
        }
      })
    })
    const startAmPmRef = computed<Item[]>(() => {
      const { isStartHourDisabled } = props
      let amDisabled = true
      let pmDisabled = true
      for (let i = 0; i < 12; ++i) {
        if (!isStartHourDisabled?.(i)) {
          amDisabled = false
          break
        }
      }
      for (let i = 12; i < 24; ++i) {
        if (!isStartHourDisabled?.(i)) {
          pmDisabled = false
          break
        }
      }
      return [
        {
          label: 'AM',
          value: 'am' as const,
          disabled: amDisabled
        },
        {
          label: 'PM',
          value: 'pm' as const,
          disabled: pmDisabled
        }
      ]
    })

    // end hours
    const endHoursRef = computed<Item[]>(() => {
      const { isEndHourDisabled, hours, use12Hours, endAmPmValue } = props
      if (!use12Hours) {
        return getTimeUnits(time.hours, hours).map((hour) => {
          return {
            label: hour,
            value: Number(hour),
            disabled: isEndHourDisabled
              ? isEndHourDisabled(Number(hour))
              : false
          }
        })
      }
      else {
        const mergedAmPmValue = endAmPmValue ?? getAmPm(Date.now())
        return getTimeUnits(time.hours, hours, mergedAmPmValue).map((hour) => {
          const hourAs12FormattedNumber = Number(hour)
          const hourAs24FormattedNumber
            = mergedAmPmValue === 'pm' && hourAs12FormattedNumber !== 12
              ? hourAs12FormattedNumber + 12
              : hourAs12FormattedNumber
          return {
            label: hour,
            value: hourAs24FormattedNumber,
            disabled: isEndHourDisabled
              ? isEndHourDisabled(hourAs24FormattedNumber)
              : false
          }
        })
      }
    })
    const endMinutesRef = computed<Item[]>(() => {
      const { isEndMinuteDisabled, minutes } = props
      return getTimeUnits(time.minutes, minutes).map((minute) => {
        return {
          label: minute,
          value: Number(minute),
          disabled: isEndMinuteDisabled
            ? isEndMinuteDisabled(Number(minute), props.endHourValue)
            : false
        }
      })
    })
    const endSecondsRef = computed<Item[]>(() => {
      const { isEndSecondDisabled, seconds } = props
      return getTimeUnits(time.seconds, seconds).map((second) => {
        return {
          label: second,
          value: Number(second),
          disabled: isEndSecondDisabled
            ? isEndSecondDisabled(
                Number(second),
                props.endMinuteValue,
                props.endHourValue
              )
            : false
        }
      })
    })
    const endAmPmRef = computed<Item[]>(() => {
      const { isEndHourDisabled } = props
      let amDisabled = true
      let pmDisabled = true
      for (let i = 0; i < 12; ++i) {
        if (!isEndHourDisabled?.(i)) {
          amDisabled = false
          break
        }
      }
      for (let i = 12; i < 24; ++i) {
        if (!isEndHourDisabled?.(i)) {
          pmDisabled = false
          break
        }
      }
      return [
        {
          label: 'AM',
          value: 'am' as const,
          disabled: amDisabled
        },
        {
          label: 'PM',
          value: 'pm' as const,
          disabled: pmDisabled
        }
      ]
    })

    return {
      mergedTheme: mergedThemeRef,
      mergedClsPrefix: mergedClsPrefixRef,
      startHours: startHoursRef,
      startMinutes: startMinutesRef,
      startSeconds: startSecondsRef,
      startAmPm: startAmPmRef,
      endHours: endHoursRef,
      endMinutes: endMinutesRef,
      endSeconds: endSecondsRef,
      endAmPm: endAmPmRef,
      startHourScrollRef: ref(null),
      startMinuteScrollRef: ref(null),
      startSecondScrollRef: ref(null),
      startAmPmScrollRef: ref(null),
      endHourScrollRef: ref(null),
      endMinuteScrollRef: ref(null),
      endSecondScrollRef: ref(null),
      endAmPmScrollRef: ref(null)
    }
  },
  render() {
    const { mergedClsPrefix, mergedTheme } = this

    const renderCols = (
      side: 'start' | 'end',
      hours: Item[],
      minutes: Item[],
      seconds: Item[],
      amPm: Item[],
      hourValue: number | null,
      minuteValue: number | null,
      secondValue: number | null,
      amPmValue: 'am' | 'pm' | null,
      isHourInvalid: boolean,
      isMinuteInvalid: boolean,
      isSecondInvalid: boolean,
      onHourClick: ((value: ItemValue) => void) | undefined,
      onMinuteClick: ((value: ItemValue) => void) | undefined,
      onSecondClick: ((value: ItemValue) => void) | undefined,
      onAmPmClick: ((value: ItemValue) => void) | undefined,
      hourScrollRef: string,
      minuteScrollRef: string,
      secondScrollRef: string,
      amPmScrollRef: string
    ) => (
      <div class={`${mergedClsPrefix}-time-picker-cols`}>
        {this.showHour ? (
          <div
            class={[
              `${mergedClsPrefix}-time-picker-col`,
              isHourInvalid && `${mergedClsPrefix}-time-picker-col--invalid`,
              this.transitionDisabled
              && `${mergedClsPrefix}-time-picker-col--transition-disabled`
            ]}
          >
            <NScrollbar
              ref={hourScrollRef}
              theme={mergedTheme.peers.Scrollbar}
              themeOverrides={mergedTheme.peerOverrides.Scrollbar}
            >
              {{
                default: () => [
                  <PanelCol
                    clsPrefix={mergedClsPrefix}
                    data={hours}
                    activeValue={hourValue}
                    onItemClick={onHourClick}
                  />,
                  <div class={`${mergedClsPrefix}-time-picker-col__padding`} />
                ]
              }}
            </NScrollbar>
          </div>
        ) : null}
        {this.showMinute ? (
          <div
            class={[
              `${mergedClsPrefix}-time-picker-col`,
              this.transitionDisabled
              && `${mergedClsPrefix}-time-picker-col--transition-disabled`,
              isMinuteInvalid && `${mergedClsPrefix}-time-picker-col--invalid`
            ]}
          >
            <NScrollbar
              ref={minuteScrollRef}
              theme={mergedTheme.peers.Scrollbar}
              themeOverrides={mergedTheme.peerOverrides.Scrollbar}
            >
              {{
                default: () => [
                  <PanelCol
                    clsPrefix={mergedClsPrefix}
                    data={minutes}
                    activeValue={minuteValue}
                    onItemClick={onMinuteClick}
                  />,
                  <div class={`${mergedClsPrefix}-time-picker-col__padding`} />
                ]
              }}
            </NScrollbar>
          </div>
        ) : null}
        {this.showSecond ? (
          <div
            class={[
              `${mergedClsPrefix}-time-picker-col`,
              isSecondInvalid && `${mergedClsPrefix}-time-picker-col--invalid`,
              this.transitionDisabled
              && `${mergedClsPrefix}-time-picker-col--transition-disabled`
            ]}
          >
            <NScrollbar
              ref={secondScrollRef}
              theme={mergedTheme.peers.Scrollbar}
              themeOverrides={mergedTheme.peerOverrides.Scrollbar}
            >
              {{
                default: () => [
                  <PanelCol
                    clsPrefix={mergedClsPrefix}
                    data={seconds}
                    activeValue={secondValue}
                    onItemClick={onSecondClick}
                  />,
                  <div class={`${mergedClsPrefix}-time-picker-col__padding`} />
                ]
              }}
            </NScrollbar>
          </div>
        ) : null}
        {this.use12Hours ? (
          <div
            class={[
              `${mergedClsPrefix}-time-picker-col`,
              this.transitionDisabled
              && `${mergedClsPrefix}-time-picker-col--transition-disabled`
            ]}
          >
            <NScrollbar
              ref={amPmScrollRef}
              theme={mergedTheme.peers.Scrollbar}
              themeOverrides={mergedTheme.peerOverrides.Scrollbar}
            >
              {{
                default: () => [
                  <PanelCol
                    clsPrefix={mergedClsPrefix}
                    data={amPm}
                    activeValue={amPmValue}
                    onItemClick={onAmPmClick}
                  />,
                  <div class={`${mergedClsPrefix}-time-picker-col__padding`} />
                ]
              }}
            </NScrollbar>
          </div>
        ) : null}
      </div>
    )

    return (
      <div
        tabindex={0}
        class={[
          `${mergedClsPrefix}-time-picker-panel`,
          `${mergedClsPrefix}-time-picker-panel--range`
        ]}
        onFocusin={this.onFocusin}
        onFocusout={this.onFocusout}
        onKeydown={this.onKeydown}
      >
        <div class={`${mergedClsPrefix}-time-picker-range-cols`}>
          {renderCols(
            'start',
            this.startHours,
            this.startMinutes,
            this.startSeconds,
            this.startAmPm,
            this.startHourValue,
            this.startMinuteValue,
            this.startSecondValue,
            this.startAmPmValue,
            this.isStartHourInvalid,
            this.isStartMinuteInvalid,
            this.isStartSecondInvalid,
            this.onStartHourClick,
            this.onStartMinuteClick,
            this.onStartSecondClick,
            this.onStartAmPmClick,
            'startHourScrollRef',
            'startMinuteScrollRef',
            'startSecondScrollRef',
            'startAmPmScrollRef'
          )}
          <div
            class={`${mergedClsPrefix}-time-picker-range-cols__vertical-divider`}
          />
          {renderCols(
            'end',
            this.endHours,
            this.endMinutes,
            this.endSeconds,
            this.endAmPm,
            this.endHourValue,
            this.endMinuteValue,
            this.endSecondValue,
            this.endAmPmValue,
            this.isEndHourInvalid,
            this.isEndMinuteInvalid,
            this.isEndSecondInvalid,
            this.onEndHourClick,
            this.onEndMinuteClick,
            this.onEndSecondClick,
            this.onEndAmPmClick,
            'endHourScrollRef',
            'endMinuteScrollRef',
            'endSecondScrollRef',
            'endAmPmScrollRef'
          )}
        </div>
        {this.actions?.length ? (
          <div class={`${mergedClsPrefix}-time-picker-actions`}>
            {this.actions?.includes('clear') ? (
              <NButton
                theme={mergedTheme.peers.Button}
                themeOverrides={mergedTheme.peerOverrides.Button}
                size="tiny"
                onClick={this.onClearClick}
              >
                {{ default: () => this.clearText }}
              </NButton>
            ) : null}
            {this.actions?.includes('now') ? (
              <NButton
                size="tiny"
                theme={mergedTheme.peers.Button}
                themeOverrides={mergedTheme.peerOverrides.Button}
                onClick={this.onNowClick}
              >
                {{ default: () => this.nowText }}
              </NButton>
            ) : null}
            {this.actions?.includes('confirm') ? (
              <NButton
                size="tiny"
                type="primary"
                class={`${mergedClsPrefix}-time-picker-actions__confirm`}
                theme={mergedTheme.peers.Button}
                themeOverrides={mergedTheme.peerOverrides.Button}
                disabled={this.isRangeInvalid}
                onClick={this.onConfirmClick}
              >
                {{ default: () => this.confirmText }}
              </NButton>
            ) : null}
          </div>
        ) : null}
        <NBaseFocusDetector onFocus={this.onFocusDetectorFocus} />
      </div>
    )
  }
})
