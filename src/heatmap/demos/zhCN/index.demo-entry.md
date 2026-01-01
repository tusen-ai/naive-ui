<!--single-column-->

# 热力图 Heatmap

数字民工有属于自己的墙要刷。

自 `2.43.0` 开始提供。

<n-alert type="info" title="使用前提" :bordered="false">
  <n-text>
    颜色相关的属性 <n-text code>active-colors</n-text> 和 <n-text code>minimum-color</n-text> 的优先级高于 <n-text code>color-theme</n-text>，如果同时设置了这三个属性，则使用 <n-text code>active-colors</n-text> 和 <n-text code>minimum-color</n-text>建议不要同时设置。
  </n-text>
  <br />
  <n-text>
    都不设置时，使用 Naive 内置的默认值 类 GitHub 的一套主题。
  </n-text>
</n-alert>

## 演示

```demo
basic.vue
themes.vue
colors.vue
slots.vue
```

## API

### Heatmap Props

类型 `HeatmapProps`

| 名称 | 类型 | 相关类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- | --- |
| active-colors | `string[]` | - | `undefined` | 颜色数组，按从浅到深的顺序排列，优先级高于 `color-theme` | 2.43.0 |
| color-theme | `'green' \| 'blue' \| 'orange' \| 'purple' \| 'red'` | `HeatmapColorTheme` | `undefined` | 内置颜色主题 | 2.43.0 |
| data | `Array<{ timestamp: number, value?: number \| null }>` | `HeatmapData`, `HeatmapDataItem` | `[]` | 热力图数据，包含日期和数值 | 2.43.0 |
| first-day-of-week | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6` | `HeatmapFirstDayOfWeek` | `0` | 一周的开始日，`0` 表示周一，6 表示周日 | 2.43.0 |
| fill-calendar-leading | `boolean` | - | `false` | 是否填满日历网格的头部，适用于 GitHub 风格的最近一年视图 | 2.43.0 |
| loading | `boolean` | - | `false` | 是否显示加载状态 | 2.43.0 |
| loading-data | `Array<{ timestamp: number, value?: number \| null }>` | `HeatmapData`, `HeatmapDataItem` | `undefined` | 加载状态下展示的数据，如果单元格的 `value` 为 `null` 不展示 cell，但占位，如果单元格的 `value` 设为任意非 `null` 值，则展示加载状态 | 2.43.0 |
| minimum-color | `string` | - | `undefined` | 热力图最小颜色，默认为 `active-colors` 中的第一个颜色 | 2.43.0 |
| show-color-indicator | `boolean` | - | `true` | 是否显示底部的颜色层级指示器 | 2.43.0 |
| show-month-labels | `boolean` | - | `true` | 是否显示月份标签 | 2.43.0 |
| show-week-labels | `boolean` | - | `true` | 是否显示周标签 | 2.43.0 |
| size | `'small' \| 'medium' \| 'large'` | - | `'medium'` | 热力图尺寸 | 2.43.0 |
| tooltip | `boolean \| TooltipProps` | - | `false` | tooltip 配置，`false` 为禁用，对象为 `TooltipProps` | 2.43.0 |
| x-gap | `number \| string` | - | `undefined` | 水平方向间距 | 2.43.0 |
| y-gap | `number \| string` | - | `undefined` | 垂直方向间距 | 2.43.0 |

### Heatmap Slots

类型 `HeatmapSlots`

| 名称 | 参数 | 相关类型 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| footer | `()` | - | 底部左侧信息插槽，与 heatmap table 左边对齐 | 2.43.0 |
| indicator | `()` | - | 底部右侧指示器插槽，与 heatmap table 右边对齐 | 2.43.0 |
| indicator-leading-text | `()` | - | 颜色层级指示器的前置文字 | 2.43.0 |
| indicator-trailing-text | `()` | - | 颜色层级指示器的后置文字 | 2.43.0 |
| tooltip | `(props: { timestamp: number, value?: number \| null })` | `HeatmapTooltipSlotProps` | 自定义 tooltip 内容 | 2.43.0 |

### Others

1. `import { heatmapMockData } from 'naive-ui'`，`function heatmapMockData(year?: 'recent' | number): HeatmapData`
