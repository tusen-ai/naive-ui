import {
  computed,
  defineComponent,
  ExtractPropTypes,
  h,
  ref,
  PropType,
  CSSProperties,
  Fragment,
  toRef,
  renderSlot
} from 'vue'
import {
  getDate,
  format,
  getYear,
  addMonths,
  startOfDay,
  startOfMonth,
  getMonth
} from 'date-fns'
import { dateArray } from '../../date-picker/src/utils'
import { NButton, NButtonGroup } from '../../button'
import style from './styles/index.cssr'
import { useLocale, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { calendarLight } from '../styles'
import type { CalendarTheme } from '../styles'
import { ChevronLeftIcon, ChevronRightIcon } from '../../_internal/icons'
import { NBaseIcon } from '../../_internal'
import { composite } from 'seemly'
import { call, MaybeArray } from '../../_utils'
import { useMergedState } from 'vooks'

const calendarProps = {
  ...(useTheme.props as ThemeProps<CalendarTheme>),
  isDateDisabled: Function as PropType<(date: number) => boolean | undefined>,
  value: Number,
  defaultValue: {
    type: Number as PropType<number | null>,
    defualt: null
  },
  'onUpdate:value': [Function, Array] as PropType<
  MaybeArray<(value: number) => void>
  >,
  onUpdateValue: [Function, Array] as PropType<
  MaybeArray<(value: number) => void>
  >
} as const

export type CalendarProps = Partial<ExtractPropTypes<typeof calendarProps>>

interface DateItem {
  year: number
  month: number
  date: number
}

export default defineComponent({
  name: 'Calendar',
  props: calendarProps,
  setup (props) {
    const themeRef = useTheme(
      'Calendar',
      'Calendar',
      style,
      calendarLight,
      props
    )
    const { locale: localeRef, dateLocale: dateLocaleRef } = useLocale(
      'DatePicker'
    )
    const now = Date.now()
    // ts => timestamp
    const monthTsRef = ref(startOfMonth(now).valueOf())
    const uncontrolledValueRef = ref<number | null>(null)
    const mergedValueRef = useMergedState(
      toRef(props, 'value'),
      uncontrolledValueRef
    )

    function doUpdateValue (value: number, time: DateItem): void {
      const { onUpdateValue, 'onUpdate:value': _onUpdateValue } = props
      if (onUpdateValue) {
        call(onUpdateValue, value, time)
      }
      if (_onUpdateValue) {
        call(_onUpdateValue, value, time)
      }
      uncontrolledValueRef.value = value
    }

    function handlePrevClick (): void {
      monthTsRef.value = addMonths(monthTsRef.value, -1).valueOf()
    }
    function handleNextClick (): void {
      monthTsRef.value = addMonths(monthTsRef.value, 1).valueOf()
    }
    function handleTodayClick (): void {
      monthTsRef.value = startOfMonth(now).valueOf()
    }
    return {
      locale: localeRef,
      dateLocale: dateLocaleRef,
      now,
      mergedValue: mergedValueRef,
      monthTs: monthTsRef,
      dateItems: computed(() => {
        return dateArray(
          monthTsRef.value,
          mergedValueRef.value,
          now,
          localeRef.value.firstDayOfWeek,
          true
        )
      }),
      doUpdateValue,
      handleTodayClick,
      handlePrevClick,
      handleNextClick,
      mergedTheme: themeRef,
      cssVars: computed(() => {
        const {
          common: { cubicBezierEaseInOut },
          self: {
            borderColor,
            borderRadius,
            titleFontSize,
            textColor,
            titleFontWeight,
            titleTextColor,
            dayTextColor,
            fontSize,
            lineHeight,
            dateColorCurrent,
            dateTextColorCurrent,
            cellColorHover,
            cellColor,
            cellColorModal,
            barColor
          }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--border-color': composite(cellColor, borderColor),
          '--border-color-modal': composite(cellColorModal, borderColor),
          '--border-radius': borderRadius,
          '--text-color': textColor,
          '--title-font-weight': titleFontWeight,
          '--title-font-size': titleFontSize,
          '--title-text-color': titleTextColor,
          '--day-text-color': dayTextColor,
          '--font-size': fontSize,
          '--line-height': lineHeight,
          '--date-color-current': dateColorCurrent,
          '--date-text-color-current': dateTextColorCurrent,
          '--cell-color': cellColor,
          '--cell-color-hover': composite(cellColor, cellColorHover),
          '--cell-color-hover-modal': composite(cellColorModal, cellColorHover),
          '--bar-color': barColor
        }
      })
    }
  },
  render () {
    const {
      isDateDisabled,
      monthTs,
      cssVars,
      mergedValue,
      mergedTheme,
      locale: { monthBeforeYear, today },
      dateLocale: { locale },
      handleTodayClick,
      handlePrevClick,
      handleNextClick
    } = this
    const normalizedValue = mergedValue && startOfDay(mergedValue).valueOf()
    const localeMonth = format(monthTs, 'MMMM', { locale })
    const month = getMonth(monthTs)
    const year = getYear(monthTs)
    const title = monthBeforeYear
      ? `${localeMonth} ${year}`
      : `${year} ${localeMonth}`
    return (
      <div class="n-calendar" style={cssVars as CSSProperties}>
        <div class="n-calendar-header">
          <div class="n-calendar-header__title">{title}</div>
          <div class="n-calendar-header__extra">
            <NButtonGroup>
              {{
                default: () => (
                  <>
                    <NButton
                      size="small"
                      onClick={handlePrevClick}
                      theme={mergedTheme.peers.Button}
                      themeOverrides={mergedTheme.peerOverrides.Button}
                    >
                      {{
                        icon: () => (
                          <NBaseIcon class="n-calendar-prev-btn">
                            {{ default: () => <ChevronLeftIcon /> }}
                          </NBaseIcon>
                        )
                      }}
                    </NButton>
                    <NButton
                      size="small"
                      onClick={handleTodayClick}
                      theme={mergedTheme.peers.Button}
                      themeOverrides={mergedTheme.peerOverrides.Button}
                    >
                      {{ default: () => today }}
                    </NButton>
                    <NButton
                      size="small"
                      onClick={handleNextClick}
                      theme={mergedTheme.peers.Button}
                      themeOverrides={mergedTheme.peerOverrides.Button}
                    >
                      {{
                        icon: () => (
                          <NBaseIcon class="n-calendar-next-btn">
                            {{ default: () => <ChevronRightIcon /> }}
                          </NBaseIcon>
                        )
                      }}
                    </NButton>
                  </>
                )
              }}
            </NButtonGroup>
          </div>
        </div>
        <div class="n-calendar-dates">
          {this.dateItems.map(
            ({ ts, inCurrentMonth, isCurrentDate }, index) => {
              const disabled = !inCurrentMonth || isDateDisabled?.(ts) === true
              const selected = normalizedValue === startOfDay(ts).valueOf()
              const date = getDate(ts)
              return (
                <div
                  key={isCurrentDate ? 'current' : index}
                  class={[
                    'n-calendar-cell',
                    disabled && 'n-calendar-cell--disabled',
                    isCurrentDate && 'n-calendar-cell--current',
                    selected && 'n-calendar-cell--selected'
                  ]}
                  onClick={() => {
                    this.doUpdateValue(ts, {
                      year,
                      month,
                      date
                    })
                    this.monthTs = startOfMonth(ts).valueOf()
                  }}
                >
                  <div class="n-calendar-date">
                    {disabled ? (
                      <div class="n-calendar-date__date" key="disabled">
                        {date}
                      </div>
                    ) : (
                      <div class="n-calendar-date__date" key="available">
                        {date}
                      </div>
                    )}
                    {index < 7 && (
                      <div class="n-calendar-date__day">
                        {format(ts, 'EEE', {
                          locale
                        })}
                      </div>
                    )}
                  </div>
                  {renderSlot(this.$slots, 'default', {
                    year,
                    month,
                    date
                  })}
                  <div class="n-calendar-cell__bar" key={month} />
                </div>
              )
            }
          )}
        </div>
      </div>
    )
  }
})
