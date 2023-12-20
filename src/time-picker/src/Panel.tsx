import { h, ref, defineComponent, inject, type PropType, computed } from 'vue'
import { NScrollbar, NBaseFocusDetector } from '../../_internal'
import { NButton } from '../../button'
import { getTimeUnits, time, getAmPm } from './utils'
import {
  type IsHourDisabled,
  type IsMinuteDisabled,
  type IsSecondDisabled,
  type ItemValue,
  type Item,
  timePickerInjectionKey
} from './interface'
import PanelCol from './PanelCol'
import { type MaybeArray } from '../../_utils'

const timePickerPanelProps = {
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
  isHourInvalid: Boolean,
  isMinuteInvalid: Boolean,
  isSecondInvalid: Boolean,
  isAmPmInvalid: Boolean,
  isValueInvalid: Boolean,
  hourValue: {
    type: Number as PropType<number | null>,
    default: null
  },
  minuteValue: {
    type: Number as PropType<number | null>,
    default: null
  },
  secondValue: {
    type: Number as PropType<number | null>,
    default: null
  },
  amPmValue: {
    type: String as PropType<'am' | 'pm' | null>,
    default: null
  },
  isHourDisabled: Function as PropType<IsHourDisabled>,
  isMinuteDisabled: Function as PropType<IsMinuteDisabled>,
  isSecondDisabled: Function as PropType<IsSecondDisabled>,
  onHourClick: {
    type: Function as PropType<(value: ItemValue) => void>,
    required: true
  },
  onMinuteClick: {
    type: Function as PropType<(value: ItemValue) => void>,
    required: true
  },
  onSecondClick: {
    type: Function as PropType<(value: ItemValue) => void>,
    required: true
  },
  onAmPmClick: {
    type: Function as PropType<(value: ItemValue) => void>,
    required: true
  },
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
  use12Hours: Boolean
}

export default defineComponent({
  name: 'TimePickerPanel',
  props: timePickerPanelProps,
  setup (props) {
    const {
      mergedThemeRef,
      mergedClsPrefixRef
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(timePickerInjectionKey)!

    const hoursRef = computed<Item[]>(() => {
      const { isHourDisabled, hours, use12Hours, amPmValue } = props
      if (!use12Hours) {
        return getTimeUnits(time.hours, hours).map((hour) => {
          return {
            label: hour,
            value: Number(hour),
            disabled: isHourDisabled ? isHourDisabled(Number(hour)) : false
          }
        })
      } else {
        const mergedAmPmValue = amPmValue ?? getAmPm(Date.now())
        return getTimeUnits(time.hours, hours, mergedAmPmValue).map((hour) => {
          const hourAs12FormattedNumber = Number(hour)
          const hourAs24FormattedNumber =
            mergedAmPmValue === 'pm' && hourAs12FormattedNumber !== 12
              ? hourAs12FormattedNumber + 12
              : hourAs12FormattedNumber
          return {
            label: hour,
            value: hourAs24FormattedNumber,
            disabled: isHourDisabled
              ? isHourDisabled(hourAs24FormattedNumber)
              : false
          }
        })
      }
    })
    const minutesRef = computed<Item[]>(() => {
      const { isMinuteDisabled, minutes } = props
      return getTimeUnits(time.minutes, minutes).map((minute) => {
        return {
          label: minute,
          value: Number(minute),
          disabled: isMinuteDisabled
            ? isMinuteDisabled(Number(minute), props.hourValue)
            : false
        }
      })
    })
    const secondsRef = computed<Item[]>(() => {
      const { isSecondDisabled, seconds } = props
      return getTimeUnits(time.seconds, seconds).map((second) => {
        return {
          label: second,
          value: Number(second),
          disabled: isSecondDisabled
            ? isSecondDisabled(
              Number(second),
              props.minuteValue,
              props.hourValue
            )
            : false
        }
      })
    })
    const amPmRef = computed<Item[]>(() => {
      const { isHourDisabled } = props
      let amDisabled = true
      let pmDisabled = true
      for (let i = 0; i < 12; ++i) {
        if (!isHourDisabled?.(i)) {
          amDisabled = false
          break
        }
      }
      for (let i = 12; i < 24; ++i) {
        if (!isHourDisabled?.(i)) {
          pmDisabled = false
          break
        }
      }
      return [
        {
          label: 'AM',
          value: 'am',
          disabled: amDisabled
        },
        {
          label: 'PM',
          value: 'pm',
          disabled: pmDisabled
        }
      ]
    })
    return {
      mergedTheme: mergedThemeRef,
      mergedClsPrefix: mergedClsPrefixRef,
      hours: hoursRef,
      minutes: minutesRef,
      seconds: secondsRef,
      amPm: amPmRef,
      hourScrollRef: ref(null),
      minuteScrollRef: ref(null),
      secondScrollRef: ref(null),
      amPmScrollRef: ref(null)
    }
  },
  render () {
    const { mergedClsPrefix, mergedTheme } = this
    return (
      <div
        tabindex={0}
        class={`${mergedClsPrefix}-time-picker-panel`}
        onFocusin={this.onFocusin}
        onFocusout={this.onFocusout}
        onKeydown={this.onKeydown}
      >
        <div class={`${mergedClsPrefix}-time-picker-cols`}>
          {this.showHour ? (
            <div
              class={[
                `${mergedClsPrefix}-time-picker-col`,
                this.isHourInvalid &&
                  `${mergedClsPrefix}-time-picker-col--invalid`,
                this.transitionDisabled &&
                  `${mergedClsPrefix}-time-picker-col--transition-disabled`
              ]}
            >
              <NScrollbar
                ref="hourScrollRef"
                theme={mergedTheme.peers.Scrollbar}
                themeOverrides={mergedTheme.peerOverrides.Scrollbar}
              >
                {{
                  default: () => [
                    <PanelCol
                      clsPrefix={mergedClsPrefix}
                      data={this.hours}
                      activeValue={this.hourValue}
                      onItemClick={this.onHourClick}
                    />,
                    <div
                      class={`${mergedClsPrefix}-time-picker-col__padding`}
                    />
                  ]
                }}
              </NScrollbar>
            </div>
          ) : null}
          {this.showMinute ? (
            <div
              class={[
                `${mergedClsPrefix}-time-picker-col`,
                this.transitionDisabled &&
                  `${mergedClsPrefix}-time-picker-col--transition-disabled`,
                this.isMinuteInvalid &&
                  `${mergedClsPrefix}-time-picker-col--invalid`
              ]}
            >
              <NScrollbar
                ref="minuteScrollRef"
                theme={mergedTheme.peers.Scrollbar}
                themeOverrides={mergedTheme.peerOverrides.Scrollbar}
              >
                {{
                  default: () => [
                    <PanelCol
                      clsPrefix={mergedClsPrefix}
                      data={this.minutes}
                      activeValue={this.minuteValue}
                      onItemClick={this.onMinuteClick}
                    />,
                    <div
                      class={`${mergedClsPrefix}-time-picker-col__padding`}
                    />
                  ]
                }}
              </NScrollbar>
            </div>
          ) : null}
          {this.showSecond ? (
            <div
              class={[
                `${mergedClsPrefix}-time-picker-col`,
                this.isSecondInvalid &&
                  `${mergedClsPrefix}-time-picker-col--invalid`,
                this.transitionDisabled &&
                  `${mergedClsPrefix}-time-picker-col--transition-disabled`
              ]}
            >
              <NScrollbar
                ref="secondScrollRef"
                theme={mergedTheme.peers.Scrollbar}
                themeOverrides={mergedTheme.peerOverrides.Scrollbar}
              >
                {{
                  default: () => [
                    <PanelCol
                      clsPrefix={mergedClsPrefix}
                      data={this.seconds}
                      activeValue={this.secondValue}
                      onItemClick={this.onSecondClick}
                    />,
                    <div
                      class={`${mergedClsPrefix}-time-picker-col__padding`}
                    />
                  ]
                }}
              </NScrollbar>
            </div>
          ) : null}
          {this.use12Hours ? (
            <div
              class={[
                `${mergedClsPrefix}-time-picker-col`,
                this.isAmPmInvalid &&
                  `${mergedClsPrefix}-time-picker-col--invalid`,
                this.transitionDisabled &&
                  `${mergedClsPrefix}-time-picker-col--transition-disabled`
              ]}
            >
              <NScrollbar
                ref="amPmScrollRef"
                theme={mergedTheme.peers.Scrollbar}
                themeOverrides={mergedTheme.peerOverrides.Scrollbar}
              >
                {{
                  default: () => [
                    <PanelCol
                      clsPrefix={mergedClsPrefix}
                      data={this.amPm}
                      activeValue={this.amPmValue}
                      onItemClick={this.onAmPmClick}
                    />,
                    <div
                      class={`${mergedClsPrefix}-time-picker-col__padding`}
                    />
                  ]
                }}
              </NScrollbar>
            </div>
          ) : null}
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
                disabled={this.isValueInvalid}
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
