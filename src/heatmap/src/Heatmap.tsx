import type { ThemeProps } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'

import type { HeatmapTheme } from '../styles/light'
import type { RectData } from './interface'
import { eachDayOfInterval, format, getWeek, getYear } from 'date-fns'
import { maxBy } from 'lodash-es'
import { computed, defineComponent, h, type PropType } from 'vue'
import { useConfig, useRtl, useTheme, useThemeClass } from '../../_mixins'
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
  colors: {
    type: Array as PropType<string[]>,
    default: () => ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39']
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
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('heatmap', undefined, cssVarsRef, props)
      : undefined

    function generateColor(value: number, maxValue: number): string {
      if (value === 0) {
        return props.colors[0] // 值为0时使用第一个颜色（空白状态）
      }
      if (maxValue === 0) {
        return props.colors[0] // 所有值都为0时使用第一个颜色
      }
      const ratio = Math.min(value / maxValue, 1)
      // 计算颜色层级，除了第一个空白色，其余颜色按层级分配
      const colorLevels = props.colors.length - 1 // 减去空白色
      const level = Math.ceil(ratio * colorLevels) // 1 到 colorLevels
      return props.colors[level] || props.colors[props.colors.length - 1]
    }

    const weeksRef = computed(() => {
      if (!props.data?.length)
        return []

      // 找到数据的实际日期范围
      const sortedData = [...props.data].sort(
        (a, b) => a.date.getTime() - b.date.getTime()
      )
      const earliestDate = sortedData[0].date
      const latestDate = sortedData[sortedData.length - 1].date
      const maxValue = maxBy(props.data, d => d.value)?.value ?? 0

      // 扩展到完整的周范围
      const weekStartsOn = props.weekStartOn as 0 | 1 | 2 | 3 | 4 | 5 | 6

      // 找到第一周的开始日期（完整周的开始）
      const startDate = new Date(earliestDate)
      const firstDayOfWeek = startDate.getDay()
      const daysToSubtract = (firstDayOfWeek - weekStartsOn + 7) % 7
      startDate.setDate(startDate.getDate() - daysToSubtract)

      // 找到最后一周的结束日期（完整周的结束）
      const endDate = new Date(latestDate)
      const lastDayOfWeek = endDate.getDay()
      const daysToAdd = (weekStartsOn + 6 - lastDayOfWeek) % 7
      endDate.setDate(endDate.getDate() + daysToAdd)

      // 创建数据映射，用于快速查找
      const dataMap = new Map(
        props.data.map(d => [format(d.date, 'yyyy-MM-dd'), d])
      )

      // 生成完整周范围内的所有日期
      const allDates = eachDayOfInterval({ start: startDate, end: endDate })

      // 将所有日期转换为 DayRect 对象或 null
      const allDayRects: (DayRect | null)[] = allDates.map((date) => {
        const dateStr = format(date, 'yyyy-MM-dd')
        const originalData = dataMap.get(dateStr)

        // 如果这个日期不在实际数据范围内，返回null（表示占位符）
        if (date < earliestDate || date > latestDate) {
          return null
        }

        const value = originalData?.value ?? 0

        return {
          date,
          value,
          color: generateColor(value, maxValue),
          dayOfWeek: date.getDay(),
          weekKey: `${getYear(date)}-${getWeek(date, { weekStartsOn })}`,
          inTargetYear: true
        }
      })

      // 按周分组，每周固定7天
      const weeks: (DayRect | null)[][] = []
      for (let i = 0; i < allDayRects.length; i += 7) {
        const week = allDayRects.slice(i, i + 7)
        weeks.push(week)
      }

      return weeks
    })

    // 计算月份标签
    const monthLabelsRef = computed(() => {
      if (!weeksRef.value.length) {
        return []
      }

      const monthLabels: Array<{
        label: string
        weekIndex: number
        visible: boolean
      }> = []
      const seenMonths = new Set<string>()

      weeksRef.value.forEach((week, weekIndex) => {
        // 找到这周最早的有效日期
        const firstValidDay = week.find(day => day !== null)
        if (firstValidDay) {
          const monthKey = format(firstValidDay.date, 'yyyy-MM')

          // 如果这个月还没有添加过标签
          if (!seenMonths.has(monthKey)) {
            seenMonths.add(monthKey)

            // 计算剩余空间
            const remainingWeeks = weeksRef.value.length - weekIndex
            const isVisible = remainingWeeks >= 3 // 至少需要3周的空间来显示月份名

            monthLabels.push({
              label: format(firstValidDay.date, 'MMM'),
              weekIndex,
              visible: isVisible
            })
          }
        }
      })

      return monthLabels
    })

    // 计算星期标签
    const weekLabelsRef = computed(() => {
      const weekStartsOn = props.weekStartOn as 0 | 1 | 2 | 3 | 4 | 5 | 6
      // GitHub风格的星期标签
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      const labels: Array<{ label: string, visible: boolean }> = []

      for (let i = 0; i < 7; i++) {
        const dayIndex = (weekStartsOn + i) % 7
        const dayName = dayNames[dayIndex]
        // GitHub样式：只在奇数行显示标签 (Mon, Wed, Fri)，避免过于拥挤
        const visible = i === 1 || i === 3 || i === 5
        labels.push({
          label: dayName,
          visible
        })
      }

      return labels
    })

    return {
      weeks: weeksRef,
      monthLabels: monthLabelsRef,
      weekLabels: weekLabelsRef,
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
      weekLabels = [],
      $slots,
      showColorIndicator,
      unit,
      colors
    } = this

    // 计算月份标签（table版本）
    const calculateMonthLabels = () => {
      const monthLabels: Array<{
        name: string
        colSpan: number
      }> = []

      let currentMonth = -1
      let weekCount = 0

      weeks.forEach((week) => {
        const firstValidDay = week.find(day => day !== null)
        if (firstValidDay) {
          const month = firstValidDay.date.getMonth()

          if (month !== currentMonth) {
            if (currentMonth !== -1 && weekCount > 0) {
              monthLabels.push({
                name: format(
                  new Date(firstValidDay.date.getFullYear(), currentMonth),
                  'MMM'
                ),
                colSpan: weekCount
              })
            }
            currentMonth = month
            weekCount = 1
          }
          else {
            weekCount++
          }
        }
        else {
          weekCount++
        }
      })

      // 添加最后一个月份
      if (currentMonth !== -1 && weekCount > 0) {
        const lastValidWeek = weeks[weeks.length - 1]
        const lastValidDay = lastValidWeek.find(day => day !== null)
        if (lastValidDay) {
          monthLabels.push({
            name: format(
              new Date(lastValidDay.date.getFullYear(), currentMonth),
              'MMM'
            ),
            colSpan: weekCount
          })
        }
      }

      return monthLabels
    }

    const tableMonthLabels = calculateMonthLabels()

    const renderColorIndicator = () => {
      return (
        <div class={`${mergedClsPrefix}-heatmap__color-indicator`}>
          <span class={`${mergedClsPrefix}-heatmap__color-indicator-text`}>
            Less
          </span>
          <div class={`${mergedClsPrefix}-heatmap__color-squares`}>
            {colors.map((color, index) => (
              <div
                key={index}
                class={`${mergedClsPrefix}-heatmap__color-square`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <span class={`${mergedClsPrefix}-heatmap__color-indicator-text`}>
            More
          </span>
        </div>
      )
    }

    return (
      <div class={[`${mergedClsPrefix}-heatmap`, themeClass]}>
        <div class={`${mergedClsPrefix}-heatmap__content`}>
          <table class={`${mergedClsPrefix}-heatmap__table`}>
            {/* 月份标签表头 */}
            <thead>
              <tr>
                <th class={`${mergedClsPrefix}-heatmap__week-header`}></th>
                {tableMonthLabels.map((monthLabel, index) => (
                  <th
                    key={`month-${index}`}
                    colspan={monthLabel.colSpan}
                    class={`${mergedClsPrefix}-heatmap__month-label`}
                  >
                    {monthLabel.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* 数据行 - 每行代表一周中的某一天 */}
              {[0, 1, 2, 3, 4, 5, 6].map(dayOfWeek => (
                <tr
                  key={`row-${dayOfWeek}`}
                  class={`${mergedClsPrefix}-heatmap__day-row`}
                >
                  {/* 星期标签 */}
                  <td class={`${mergedClsPrefix}-heatmap__week-label`}>
                    {weekLabels[dayOfWeek]?.visible
                      ? weekLabels[dayOfWeek]?.label
                      : ''}
                  </td>
                  {/* 每周的格子 */}
                  {weeks.map((week, weekIndex) => {
                    const day = week.find(d => d && d.dayOfWeek === dayOfWeek)

                    if (day) {
                      return (
                        <td
                          key={`day-${weekIndex}-${dayOfWeek}`}
                          class={`${mergedClsPrefix}-heatmap__cell`}
                        >
                          <Rect
                            mergedClsPrefix={mergedClsPrefix}
                            data={day}
                            color={day.color}
                            unit={unit}
                          />
                        </td>
                      )
                    }
                    else {
                      return (
                        <td
                          key={`empty-${weekIndex}-${dayOfWeek}`}
                          class={`${mergedClsPrefix}-heatmap__cell`}
                        >
                          <div
                            class={`${mergedClsPrefix}-heatmap__placeholder`}
                          >
                          </div>
                        </td>
                      )
                    }
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div class={`${mergedClsPrefix}-heatmap__footer`}>
          {$slots.footer?.()}
          {showColorIndicator ? renderColorIndicator() : null}
        </div>
      </div>
    )
  }
})
