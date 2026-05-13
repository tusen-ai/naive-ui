import type { PropType, SlotsType } from 'vue'
import type { ThemeProps } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import type { TooltipProps } from '../../tooltip'
import type { HeatmapTheme } from '../styles/light'
import type { DayRect } from './interface'
import type {
  HeatmapData,
  HeatmapFirstDayOfWeek,
  HeatmapSlots
} from './public-types'
import type { HeatmapColorTheme } from './theme'
import { addDays, format, parseISO, startOfWeek } from 'date-fns'
import { groupBy, mapValues, maxBy } from 'lodash-es'
import { pxfy } from 'seemly'
import { computed, defineComponent, h } from 'vue'
import {
  useConfig,
  useLocale,
  useRtl,
  useTheme,
  useThemeClass
} from '../../_mixins'
import { createKey, resolveSlot, resolveWrappedSlot } from '../../_utils'
import { transformNaiveFirstDayOfWeekToDateFns } from '../../date-picker/src/utils'
import heatmapLight from '../styles/light'
import { useLoadingStyleClass } from './animationStyle'
import HeatmapColorIndicator from './ColorIndicator'
import Rect from './Rect'
import style from './styles/index.cssr'
import { heatmapColorThemes } from './theme'
import {
  completeDataGaps,
  createDayRect,
  createLoadingMatrix,
  createSparseMatrix
} from './utils'

interface Col {
  week: number
  month: string
}

export const heatmapProps = {
  ...(useTheme.props as ThemeProps<HeatmapTheme>),
  activeColors: Array as PropType<string[]>,
  colorTheme: String as PropType<HeatmapColorTheme>,
  data: Array as PropType<HeatmapData>,
  loadingData: Object as PropType<HeatmapData>,
  fillCalendarLeading: Boolean,
  firstDayOfWeek: {
    type: Number as PropType<HeatmapFirstDayOfWeek>,
    default: 0
  },
  loading: Boolean,
  minimumColor: String,
  showColorIndicator: {
    type: Boolean,
    default: true
  },
  showWeekLabels: {
    type: Boolean,
    default: true
  },
  showMonthLabels: {
    type: Boolean,
    default: true
  },
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium'
  },
  tooltip: {
    type: [Boolean, Object] as PropType<TooltipProps | boolean>,
    default: false
  },
  xGap: [Number, String] as PropType<number | string>,
  yGap: [Number, String] as PropType<number | string>
} as const

export type HeatmapProps = ExtractPublicPropTypes<typeof heatmapProps>

export default defineComponent({
  name: 'Heatmap',
  slots: Object as SlotsType<HeatmapSlots>,
  props: heatmapProps,
  setup(props) {
    const { mergedClsPrefixRef, mergedRtlRef, inlineThemeDisabled }
      = useConfig(props)
    const { localeRef, dateLocaleRef } = useLocale('Heatmap')
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
      const { xGap, yGap, size } = props
      const {
        common: { cubicBezierEaseInOut },
        self: {
          fontWeight,
          textColor,
          borderColor,
          loadingColorStart,
          [createKey('rectSize', size)]: rectSize,
          [createKey('borderRadius', size)]: sizeBorderRadius,
          [createKey('xGap', size)]: defaultXGap,
          [createKey('yGap', size)]: defaultYGap,
          [createKey('fontSize', size)]: fontSize
        }
      } = themeRef.value
      const cssVars = {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-font-size': fontSize,
        '--n-font-weight': fontWeight,
        '--n-text-color': textColor,
        '--n-border-radius': sizeBorderRadius,
        '--n-border-color': borderColor,
        '--n-loading-color-start': loadingColorStart,
        '--n-rect-size': rectSize,
        '--n-x-gap':
          xGap !== undefined
            ? typeof xGap === 'number'
              ? pxfy(xGap)
              : xGap
            : defaultXGap,
        '--n-y-gap':
          yGap !== undefined
            ? typeof yGap === 'number'
              ? pxfy(yGap)
              : yGap
            : defaultYGap
      }

      return cssVars
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
          'heatmap',
          computed(() => {
            const { size } = props
            return size[0]
          }),
          cssVarsRef,
          props
        )
      : undefined
    const mergedColorsRef = computed(() => {
      const {
        mininumColor: builtInMinimumColor,
        activeColors: builtInActiveColors
      } = themeRef.value.self
      const mergedMininumColor = props.minimumColor || builtInMinimumColor
      const theme = props.colorTheme && heatmapColorThemes[props.colorTheme]
      const mergedActiveColors
        = props.activeColors || theme || builtInActiveColors

      return [mergedMininumColor, ...mergedActiveColors]
    })

    const normalizedDataRef = computed(() => {
      if (!props.data || props.data.length === 0) {
        return []
      }
      return completeDataGaps(
        props.data,
        transformNaiveFirstDayOfWeekToDateFns(props.firstDayOfWeek),
        props.fillCalendarLeading
      )
    })

    const normalizedLoadingDataRef = computed(() => {
      if (!props.loadingData || props.loadingData.length === 0) {
        return []
      }
      return completeDataGaps(
        props.loadingData,
        transformNaiveFirstDayOfWeekToDateFns(props.firstDayOfWeek),
        props.fillCalendarLeading
      )
    })

    const maxValueRef = computed(() => {
      const validData = normalizedDataRef.value.filter(d => d.value !== null)
      return maxBy(validData, d => d.value!)?.value ?? 0
    })

    const heatmapMatrixRef = computed(() => {
      const data = normalizedDataRef.value
      const loadingData = normalizedLoadingDataRef.value
      if (props.loading && !loadingData.length) {
        return createLoadingMatrix(
          transformNaiveFirstDayOfWeekToDateFns(props.firstDayOfWeek)
        )
      }

      const finalData = props.loading ? loadingData : data
      if (!finalData.length)
        return []

      const maxValue = maxValueRef.value
      const colors = mergedColorsRef.value
      const calendarStartDate = finalData[0].timestamp

      const dayRects = finalData.map(item =>
        createDayRect(
          item,
          calendarStartDate,
          transformNaiveFirstDayOfWeekToDateFns(props.firstDayOfWeek),
          colors,
          maxValue
        )
      )

      return createSparseMatrix(
        7,
        dayRects,
        dayRect => dayRect.rowIndex,
        dayRect => dayRect.colIndex
      )
    })

    const weekLabelsRef = computed(() => {
      const { weekdayFormat } = localeRef.value
      const { locale } = dateLocaleRef.value

      const baseDate = startOfWeek(new Date(), {
        weekStartsOn: transformNaiveFirstDayOfWeekToDateFns(
          props.firstDayOfWeek
        )
      })

      return Array.from({ length: 7 }, (_, i) => {
        return {
          label: format(addDays(baseDate, i), weekdayFormat, { locale }),
          visible: i % 2 !== 0
        }
      })
    })

    const loadingMonthLabelsRef = computed(() => {
      const { monthFormat } = localeRef.value
      const { locale } = dateLocaleRef.value
      const currentYear = new Date().getFullYear()
      // for more consistent month label widths
      const colSpans = [5, 4, 5, 4, 5, 4, 5, 4, 4, 5, 4, 4]
      return Array.from({ length: 12 }, (_, i) => {
        const monthDate = new Date(currentYear, i, 1)
        return {
          name: format(monthDate, monthFormat, { locale }),
          colSpan: colSpans[i]
        }
      })
    })

    function getColsMonth(matrix: DayRect[][]): Col[] {
      const cols = matrix[0].length
      const res: Col[] = []
      for (let col = 0; col < cols; col++) {
        for (let row = 0; row < matrix.length; row++) {
          const cell = matrix[row][col]
          if (cell?.value !== null) {
            res.push({
              week: col,
              month: format(cell.timestamp, 'yyyy-MM')
            })
            break
          }
        }
      }
      return res
    }

    const dataMonthLabelsRef = computed(() => {
      const { monthFormat } = localeRef.value
      const { locale } = dateLocaleRef.value
      const matrix = heatmapMatrixRef.value
      if (!matrix || matrix.length === 0 || !matrix[0]) {
        return []
      }
      const colsWithMonth = getColsMonth(matrix)
      const monthStats = mapValues(
        groupBy(colsWithMonth, 'month'),
        (entries) => {
          const weekNumbers = entries.map(e => e.week)
          return {
            weekCount: entries.length,
            start: Math.min(...weekNumbers),
            end: Math.max(...weekNumbers)
          }
        }
      )

      return Object.entries(monthStats)
        .filter(([, stats]) => stats.weekCount >= 3) // ensure have enough space
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([month, stats]) => {
          const monthDate = new Date(parseISO(`${month}-01`))
          return {
            name: format(monthDate, monthFormat, { locale }),
            colSpan: stats.end - stats.start + 1
          }
        })
    })

    const monthLabelsRef = computed(() => {
      return props.loading && !props.loadingData
        ? loadingMonthLabelsRef.value
        : dataMonthLabelsRef.value
    })

    const loadingClassRef = useLoadingStyleClass(props, themeRef)

    return {
      weekLabels: weekLabelsRef,
      monthLabels: monthLabelsRef,
      mergedColors: mergedColorsRef,
      mergedClsPrefix: mergedClsPrefixRef,
      rtlEnabled: rtlEnabledRef,
      locale: localeRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender,
      heatmapMatrix: heatmapMatrixRef,
      loadingClass: loadingClassRef
    }
  },
  render() {
    const {
      loading,
      showWeekLabels,
      showMonthLabels,
      showColorIndicator,
      mergedClsPrefix,
      themeClass,
      cssVars,
      rtlEnabled,
      locale,
      weekLabels,
      monthLabels,
      mergedColors,
      $slots,
      heatmapMatrix,
      loadingClass,
      onRender
    } = this
    onRender?.()
    return (
      <div
        class={[
          themeClass,
          `${mergedClsPrefix}-heatmap`,
          rtlEnabled && `${mergedClsPrefix}-heatmap--rtl`
        ]}
        style={cssVars}
      >
        <div class={`${mergedClsPrefix}-heatmap__content`}>
          <table class={`${mergedClsPrefix}-heatmap__calendar-table`}>
            {showMonthLabels && (
              <thead>
                <tr>
                  {showWeekLabels && (
                    <th
                      class={`${mergedClsPrefix}-heatmap__week-header-cell`}
                    />
                  )}
                  {monthLabels.map((monthLabel, index) => (
                    <th
                      key={`month-${index}`}
                      colspan={monthLabel.colSpan}
                      class={`${mergedClsPrefix}-heatmap__month-label-cell`}
                    >
                      {monthLabel.name}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {weekLabels.map((weekLabel, rowIdx) => {
                return (
                  <tr key={`row-${rowIdx}`}>
                    {showWeekLabels && (
                      <td class={`${mergedClsPrefix}-heatmap__week-label-cell`}>
                        {weekLabel.visible ? weekLabel.label : null}
                      </td>
                    )}
                    {(heatmapMatrix[rowIdx] || []).map(
                      (day: DayRect, weekIdx: number) => {
                        return day.value !== null ? (
                          <td
                            key={`day-${rowIdx}-${weekIdx}`}
                            class={`${mergedClsPrefix}-heatmap__day-cell`}
                          >
                            <Rect
                              mergedClsPrefix={mergedClsPrefix}
                              data={day}
                              color={day.color}
                              tooltip={this.tooltip}
                              loading={loading}
                              loadingClass={loadingClass}
                            >
                              {{
                                tooltip: () => $slots.tooltip?.(day)
                              }}
                            </Rect>
                          </td>
                        ) : (
                          <td
                            key={`empty-${rowIdx}-${weekIdx}`}
                            class={`${mergedClsPrefix}-heatmap__day-cell`}
                          >
                            <div
                              class={`${mergedClsPrefix}-heatmap__empty-cell`}
                            />
                          </td>
                        )
                      }
                    )}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div class={`${mergedClsPrefix}-heatmap__footer`}>
          {resolveWrappedSlot(
            $slots.footer,
            children =>
              children && (
                <div class={`${mergedClsPrefix}-heatmap__footer`}>
                  {children}
                </div>
              )
          )}
          <div class={`${mergedClsPrefix}-heatmap__indicator`}>
            {resolveSlot($slots.indicator, () => [
              showColorIndicator && (
                <HeatmapColorIndicator
                  colors={mergedColors}
                  clsPrefix={mergedClsPrefix}
                >
                  {{
                    'leading-text': () =>
                      resolveSlot($slots['indicator-leading-text'], () => [
                        locale.less
                      ]),
                    'trailing-text': () =>
                      resolveSlot($slots['indicator-trailing-text'], () => [
                        locale.more
                      ])
                  }}
                </HeatmapColorIndicator>
              )
            ])}
          </div>
        </div>
      </div>
    )
  }
})
