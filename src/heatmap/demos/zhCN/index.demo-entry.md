<!--single-column-->

# 热力图 Heatmap

数字民工有属于自己的墙要刷。

自 `NEXT_VERSION` 开始提供。

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

| 名称 | 类型 | 相关类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- | --- |
| color-theme | `'green' \| 'blue' \| 'orange' \| 'purple' \| 'red'` | `HeatmapColorTheme` | `'undefined'` | 内置颜色主题 | NEXT_VERSION |
| active-colors | `string[]` |  | `undefined` | 颜色数组，按从浅到深的顺序排列，优先级高于 `color-theme` | NEXT_VERSION |
| minimum-color | `string` |  | `undefined` | 热力图最小颜色，默认为 `active-colors` 中的第一个颜色 | NEXT_VERSION |
| data | `Array<{ timestamp: number, value?: number \| null }>` | `HeatmapData`, `HeatmapDataItem` | `[]` | 热力图数据，包含日期和数值 | NEXT_VERSION |
| loading | `boolean` |  | `false` | 是否显示加载状态 | NEXT_VERSION |
| show-color-indicator | `boolean` |  | `true` | 是否显示底部的颜色层级指示器 | NEXT_VERSION |
| show-month-labels | `boolean` |  | `true` | 是否显示月份标签 | NEXT_VERSION |
| show-week-labels | `boolean` |  | `true` | 是否显示周标签 | NEXT_VERSION |
| size | `'small' \| 'medium' \| 'large'` |  | `'medium'` | 热力图尺寸 | NEXT_VERSION |
| tooltip | `boolean \| TooltipProps \| false` |  | `true` | tooltip 配置，`false` 为禁用，对象为 `TooltipProps` | NEXT_VERSION |
| first-day-of-week | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6` | `HeatmapFirstDayOfWeek` | `0` | 一周的开始日，`0` 表示周一，6 表示周日 | NEXT_VERSION |
| fill-calendar | `boolean` |  | `false` | 是否填满整个日历网格，当为 `true` 时第一列将完全填充，适用于 GitHub 风格的最近一年视图 | NEXT_VERSION |
| x-gap | `number \| string` |  | `undefined` | 水平方向间距 | NEXT_VERSION |
| y-gap | `number \| string` |  | `undefined` | 垂直方向间距 | NEXT_VERSION |

### Heatmap Slots

| 名称 | 参数 | 相关类型 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| indicator | `()` |  | 底部右侧指示器插槽，与 heatmap table 右边对齐 | NEXT_VERSION |
| indicator-leading-text | `()` |  | 颜色层级指示器的前置文字 | NEXT_VERSION |
| indicator-trailing-text | `()` |  | 颜色层级指示器的后置文字 | NEXT_VERSION |
| footer | `()` |  | 底部左侧信息插槽，与 heatmap table 左边对齐 | NEXT_VERSION |
| tooltip | `(props: { timestamp: number, value?: number \| null })` | `HeatmapTooltipSlotProps` | 自定义 tooltip 内容 | NEXT_VERSION |

### Others

1. `import { heatmapMockData } from 'naive-ui'`，`function heatmapMockData(year?: 'recent' | number): HeatmapData`
