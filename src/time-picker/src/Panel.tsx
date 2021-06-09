import { h, ref, defineComponent, inject, PropType, computed } from 'vue'
import { NScrollbar } from '../../scrollbar'
import { NButton } from '../../button'
import { NBaseFocusDetector } from '../../_internal'
import { time } from './utils'
import {
  IsHourDisabled,
  IsMinuteDisabled,
  IsSecondDisabled,
  timePickerInjectionKey
} from './interface'
import PanelCol, { Item } from './PanelCol'

export default defineComponent({
  name: 'TimePickerPanel',
  props: {
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
    isHourInvalid: {
      type: Boolean,
      default: false
    },
    isMinuteInvalid: {
      type: Boolean,
      default: false
    },
    isSecondInvalid: {
      type: Boolean,
      default: false
    },
    isValueInvalid: {
      type: Boolean,
      default: false
    },
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
    hours: {
      type: [Array as PropType<number[]>, Number],
      default: null
    },
    minutes: {
      type: [Array as PropType<number[]>, Number],
      default: null
    },
    seconds: {
      type: [Array as PropType<number[]>, Number],
      default: null
    },
    isHourDisabled: Function as PropType<IsHourDisabled>,
    isMinuteDisabled: Function as PropType<IsMinuteDisabled>,
    isSecondDisabled: Function as PropType<IsSecondDisabled>,
    onHourClick: {
      type: Function as PropType<(value: number) => void>,
      required: true
    },
    onMinuteClick: {
      type: Function as PropType<(value: number) => void>,
      required: true
    },
    onSecondClick: {
      type: Function as PropType<(value: number) => void>,
      required: true
    },
    onNowClick: Function as PropType<() => void>,
    nowText: String,
    confirmText: String,
    transitionDisabled: {
      type: Boolean,
      default: false
    },
    onConfirmClick: Function as PropType<() => void>,
    onFocusin: Function as PropType<(e: FocusEvent) => void>,
    onFocusout: Function as PropType<(e: FocusEvent) => void>,
    onFocusDetectorFocus: Function as PropType<() => void>,
    onKeydown: Function as PropType<(e: KeyboardEvent) => void>
  },
  setup (props) {
    const {
      mergedThemeRef,
      mergedClsPrefixRef
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(timePickerInjectionKey)!

    const getStepArray = (array: number[], step: number): number[] => {
      return array.filter(v => v % step === 0)
    }
    const getNumbers = (values: string[]): number[] => {
      return values.map(v => Number(v))
    }
    const getFixValue = (value: number): string => {
      return `00${value}`.slice(-2)
    }
    const getValues = (values: number[]): string[] => {
      return values.map(v => getFixValue(v))
    }
    const setOrDefault = (defaultValue: string[], setValue: number[] | number | null): string[] => {
      let result: string[] = defaultValue
      if (setValue) {
        if (typeof setValue === 'number') {
          result = getValues(getStepArray(getNumbers(defaultValue), setValue))
        } else {
          result = getValues(setValue)
        }
      }
      return result
    }

    const hoursRef = computed<Item[]>(() => {
      const { isHourDisabled, hours } = props
      const timeHours = setOrDefault(time.hours, hours)
      return timeHours.map((hour) => {
        return {
          value: hour,
          disabled: isHourDisabled ? isHourDisabled(Number(hour)) : false
        }
      })
    })
    const minutesRef = computed<Item[]>(() => {
      const { isMinuteDisabled, minutes } = props
      const timeMinutes = setOrDefault(time.minutes, minutes)

      return timeMinutes.map((minute) => {
        return {
          value: minute,
          disabled: isMinuteDisabled
            ? isMinuteDisabled(Number(minute), props.hourValue)
            : false
        }
      })
    })
    const secondsRef = computed<Item[]>(() => {
      const { isSecondDisabled, seconds } = props
      const timeSeconds = setOrDefault(time.seconds, seconds)
      return timeSeconds.map((second) => {
        return {
          value: second,
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
    return {
      mergedTheme: mergedThemeRef,
      mergedClsPrefix: mergedClsPrefixRef,
      hours: hoursRef,
      minutes: minutesRef,
      seconds: secondsRef,
      hourScrollRef: ref(null),
      minuteScrollRef: ref(null),
      secondScrollRef: ref(null)
    }
  },
  render () {
    const { mergedClsPrefix, mergedTheme } = this
    return h(
      'div',
      {
        tabindex: 0,
        class: `${mergedClsPrefix}-time-picker-panel`,
        onFocusin: this.onFocusin,
        onFocusout: this.onFocusout,
        onKeydown: this.onKeydown
      },
      [
        <div class={`${mergedClsPrefix}-time-picker-cols`}>
          {this.showHour ? (
            <div
              class={[
                `${mergedClsPrefix}-time-picker-col`,
                {
                  [`${mergedClsPrefix}-time-picker-col--invalid`]: this
                    .isHourInvalid,
                  [`${mergedClsPrefix}-time-picker-col--transition-disabled`]: this
                    .transitionDisabled
                }
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
                {
                  [`${mergedClsPrefix}-time-picker-col--transition-disabled`]: this
                    .transitionDisabled,
                  [`${mergedClsPrefix}-time-picker-col--invalid`]: this
                    .isMinuteInvalid
                }
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
                {
                  [`${mergedClsPrefix}-time-picker-col--invalid`]: this
                    .isSecondInvalid,
                  [`${mergedClsPrefix}-time-picker-col--transition-disabled`]: this
                    .transitionDisabled
                }
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
        </div>,
        <div class={`${mergedClsPrefix}-time-picker-actions`}>
          <NButton
            size="tiny"
            theme={mergedTheme.peers.Button}
            themeOverrides={mergedTheme.peerOverrides.Button}
            onClick={this.onNowClick}
          >
            {{ default: () => this.nowText }}
          </NButton>
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
        </div>,
        <NBaseFocusDetector onFocus={this.onFocusDetectorFocus} />
      ]
    )
  }
})
