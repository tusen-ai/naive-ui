import {
  computed,
  defineComponent,
  ExtractPropTypes,
  h,
  ref,
  PropType,
  CSSProperties
} from 'vue'
import {
  getDate,
  format,
  getYear,
  addMonths,
  startOfDay,
  startOfMonth
} from 'date-fns'
import { dateArray } from '../../date-picker/src/utils'
import style from './styles/index.cssr'
import { useLocale, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { calendarLight } from '../styles'
import type { CalendarTheme } from '../styles'
import { ChevronLeftIcon, ChevronRightIcon } from '../../_internal/icons'
import { NBaseIcon } from '../../_internal'

const calendarProps = {
  ...(useTheme.props as ThemeProps<CalendarTheme>),
  isDateDisabled: Function as PropType<(date: number) => boolean | undefined>
} as const

export type CalendarProps = Partial<ExtractPropTypes<typeof calendarProps>>

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
    const valueRef = ref<number | null>(null)
    function handlePrevClick (): void {
      monthTsRef.value = addMonths(monthTsRef.value, -1).valueOf()
    }
    function handleNextClick (): void {
      monthTsRef.value = addMonths(monthTsRef.value, 1).valueOf()
    }
    return {
      locale: localeRef,
      dateLocale: dateLocaleRef,
      now,
      value: ref<number | null>(null),
      monthTs: monthTsRef,
      dateItems: computed(() => {
        return dateArray(
          monthTsRef.value,
          valueRef.value,
          now,
          localeRef.value.firstDayOfWeek,
          true
        )
      }),
      handlePrevClick,
      handleNextClick,
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
            cellColorActive
          }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--border-color': borderColor,
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
          '--cell-color-hover': cellColorHover,
          '--cell-color-active': cellColorActive
        }
      })
    }
  },
  render () {
    const {
      isDateDisabled,
      monthTs,
      cssVars,
      value,
      dateLocale: { locale },
      handlePrevClick,
      handleNextClick
    } = this
    const normalizedValue = value && startOfDay(value).valueOf()
    return (
      <div class="n-calendar" style={cssVars as CSSProperties}>
        <div class="n-calendar-header">
          <NBaseIcon onClick={handlePrevClick} class="n-calendar-prev-btn">
            {{ default: () => <ChevronLeftIcon /> }}
          </NBaseIcon>
          <NBaseIcon onClick={handleNextClick} class="n-calendar-next-btn">
            {{ default: () => <ChevronRightIcon /> }}
          </NBaseIcon>
          {getYear(monthTs)} {format(monthTs, 'MMMM', { locale })}
        </div>
        <div
          class="n-calendar-dates"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, minmax(0, 1fr))'
          }}
        >
          {this.dateItems.map(
            ({ ts, inCurrentMonth, isCurrentDate }, index) => {
              const disabled = !inCurrentMonth || isDateDisabled?.(ts) === true
              return (
                <div
                  key={isCurrentDate ? 'current' : index}
                  class={[
                    'n-calendar-cell',
                    disabled && 'n-calendar-cell--disabled',
                    isCurrentDate && 'n-calendar-cell--current',
                    normalizedValue === startOfDay(ts).valueOf() &&
                      'n-calendar-cell--selected'
                  ]}
                  onClick={() => {
                    this.value = ts
                    this.monthTs = startOfMonth(ts).valueOf()
                  }}
                >
                  <div class="n-calendar-date">
                    {disabled ? (
                      <div class="n-calendar-date__date" key="disabled">
                        {getDate(ts)}
                      </div>
                    ) : (
                      <div class="n-calendar-date__date" key="available">
                        {getDate(ts)}
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
                </div>
              )
            }
          )}
        </div>
      </div>
    )
  }
})
