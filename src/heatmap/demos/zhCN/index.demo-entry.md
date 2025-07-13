<!--single-column-->

# 热力图 Heatmap

数字民工有属于自己的墙要刷。

自 `NEXT_VERSION` 开始提供。

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
| color-theme | `'github' \| 'green' \| 'blue' \| 'orange' \| 'purple' \| 'red'` | `HeatmapColorTheme` | `'github'` | 内置颜色主题 | NEXT_VERSION |
| colors | `string[]` |  | `undefined` | 颜色数组，按从浅到深的顺序排列，优先级高于 `color-theme` | NEXT_VERSION |
| data | `Array<{ timestamp: number, value?: number \| null }>` | `HeatmapData`, `HeatmapDataItem` | `[]` | 热力图数据，包含日期和数值 | NEXT_VERSION |
| loading | `boolean` |  | `false` | 是否显示加载状态 | NEXT_VERSION |
| show-color-indicator | `boolean` |  | `true` | 是否显示底部的颜色层级指示器 | NEXT_VERSION |
| show-month-labels | `boolean` |  | `true` | 是否显示月份标签 | NEXT_VERSION |
| show-week-labels | `boolean` |  | `true` | 是否显示周标签 | NEXT_VERSION |
| size | `'small' \| 'medium' \| 'large'` |  | `'medium'` | 热力图尺寸 | NEXT_VERSION |
| tooltip | `false \| TooltipProps` |  | `false` | tooltip 配置，`false` 为禁用，对象为 `TooltipProps` | NEXT_VERSION |
| week-starts-on | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6` | `HeatmapFirstDayOfWeek` | `0` | 一周的开始日，`0` 表示周一 | NEXT_VERSION |
| x-gap | `number \| string` |  | `undefined` | 水平方向间距 | NEXT_VERSION |
| y-gap | `number \| string` |  | `undefined` | 垂直方向间距 | NEXT_VERSION |

### Heatmap Slots

| 名称 | 参数 | 相关类型 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| indicator | `()` |  | 底部右侧指示器插槽，与 heatmap table 右边对齐 | NEXT_VERSION |
| info | `()` |  | 底部左侧信息插槽，与 heatmap table 左边对齐 | NEXT_VERSION |
| tooltip | `(props: { timestamp: number, value?: number \| null })` | `HeatmapTooltipSlotProps` | 自定义 tooltip 内容 | NEXT_VERSION |

### Others

1. `import { heatmapMockData } from 'naive-ui'`，`function heatmapMockData(year?: 'recent' | number): HeatmapData`
