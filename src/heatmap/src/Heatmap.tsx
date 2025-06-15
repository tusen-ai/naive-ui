import type { ThemeProps } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'

import type { HeatmapTheme } from '../styles/light'
import type { RectData } from './interface'
import {
  eachDayOfInterval,
  endOfWeek,
  format,
  getMonth,
  getWeek,
  getYear,
  startOfWeek
} from 'date-fns'
import { maxBy } from 'lodash-es'
import { computed, defineComponent, h, type PropType } from 'vue'
import {
  useConfig,
  useLocale,
  useRtl,
  useTheme,
  useThemeClass
} from '../../_mixins'
import heatmapLight from '../styles/light'
import Rect from './Rect'
import style from './styles/index.cssr'

interface DayRect {
  date: Date
  value: number
  color: string
  dayOfWeek: number // 0 = Sunday
  weekKey: string
  inTargetYear: boolean
}

interface PanelColor {
  [K: number]: string
}

export const heatmapProps = {
  ...(useTheme.props as ThemeProps<HeatmapTheme>),
  data: Array as PropType<RectData[]>,
  weekStartOn: {
    type: Number,
    default: 0
  },
  type: {
    type: String as PropType<'month' | 'year'>,
    default: 'year'
  },
  showColorIndicator: {
    type: Boolean,
    default: true
  },
  unit: {
    type: String,
    require: true
  },
  panelColors: {
    type: Array as PropType<PanelColor[]>,
    default: []
  },
  xAxis: {
    type: Array as PropType<string[]>
  },
  yAxis: {
    type: Array as PropType<string[]>
  }
} as const

export type HeatmapProps = ExtractPublicPropTypes<typeof heatmapProps>

export default defineComponent({
  name: 'Heatmap',
  props: heatmapProps,
  setup(props) {
    const { mergedClsPrefixRef, mergedRtlRef, inlineThemeDisabled }
      = useConfig(props)
    const themeRef = useTheme(
      'Heatmap',
      '-heatmap',
      style,
      heatmapLight,
      props,
      mergedClsPrefixRef
    )
    const rtlEnabledRef = useRtl('Heatmap', mergedRtlRef, mergedClsPrefixRef)
    const cssVarsRef = computed(() => {
      const {
        // eslint-disable-next-line no-empty-pattern
        self: {},
        // eslint-disable-next-line no-empty-pattern
        common: {}
      } = themeRef.value
      return {}
    })
    function generateRGBColor(value: number, maxValue: number): string {
      const ratio = value / maxValue
      const r = Math.floor(255 * ratio)
      const g = Math.floor(255 * ratio)
      const b = Math.floor(255 * (1 - ratio))
      return `rgb(${r}, ${g}, ${b})`
    }

    const { data } = props

    const weeksRef = computed(() => {
      if (!data?.length)
        return []

      const startYear = getYear(data[0].date)
      const maxValue = maxBy(data, d => d.value)?.value ?? 0

      const yearStart = new Date(startYear, 0, 1)
      const yearEnd = new Date(startYear, 11, 31)
      const startDate = startOfWeek(yearStart, { weekStartsOn: 0 })
      const endDate = endOfWeek(yearEnd, { weekStartsOn: 0 })

      const dataMap = new Map(
        data.map(d => [format(d.date, 'yyyy-MM-dd'), d])
      )

      const weeks: DayRect[][] = []
      let currentWeek: DayRect[] = []
      eachDayOfInterval({ start: startDate, end: endDate }).forEach((date) => {
        const dateStr = format(date, 'yyyy-MM-dd')
        const originalData = dataMap.get(dateStr)
        // 考虑近一年的情况
        const inTargetYear = getYear(date) === startYear
        const dayData = {
          date,
          value: originalData?.value ?? 0,
          color: generateRGBColor(originalData?.value ?? 0, maxValue),
          dayOfWeek: date.getDay(), // 0 = Sunday 考虑可以自定义 一周的开始是哪天
          weekKey: `${getYear(date)}-${getMonth(date)}-${getWeek(date, { weekStartsOn: 0 })}`,
          inTargetYear
        }

        // 按周分组
        if (date.getDay() === 0 && currentWeek.length > 0) {
          weeks.push(currentWeek)
          currentWeek = []
        }
        currentWeek.push(dayData)
      })
      if (currentWeek.length > 0)
        weeks.push(currentWeek)

      return weeks.filter(week => week.some(day => day.inTargetYear))
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('heatmap', undefined, cssVarsRef, props)
      : undefined

    return {
      weeks: weeksRef,
      mergedClsPrefix: mergedClsPrefixRef,
      rtlEnabled: rtlEnabledRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render() {
    const {
      mergedClsPrefix,
      themeClass,
      weeks = [],
      $slots,
      showColorIndicator,
      unit
    } = this
    const renderWeekRects = (week: DayRect[], weekIndex: number) => {
      const weekRects = Array.from({ length: 7 }).map((_, dayIndex) => {
        const rectData = week.find(
          d => d.dayOfWeek === dayIndex && d.inTargetYear
        )
        return rectData ? (
          <Rect
            key={rectData.date.toISOString()}
            mergedClsPrefix={mergedClsPrefix}
            data={rectData}
            color={rectData.color}
            unit={unit}
          />
        ) : (
          <div
            key={`placeholder-${weekIndex}-${dayIndex}`}
            class={`${mergedClsPrefix}-heatmap__placeholder`}
          />
        )
      })
      return weekRects
    }

    return (
      <div class={[`${mergedClsPrefix}-heatmap`, themeClass]}>
        <div class={`${mergedClsPrefix}-heatmap__container`}>
          {weeks.map((week, weekIndex) => {
            return (
              <div
                key={`week-${weekIndex}`}
                class={`${mergedClsPrefix}-heatmap__week`}
              >
                {renderWeekRects(week, weekIndex)}
              </div>
            )
          })}
        </div>
        <div class={`${mergedClsPrefix}-heatmap__footer`}>
          {$slots.footer?.()}
          {showColorIndicator ? (
            <div class={`${mergedClsPrefix}-heatmap__color-indicator`}>
              <span>Less</span>
              {11111}
              <span>More</span>
            </div>
          ) : null}
        </div>
      </div>
    )
  }
})
