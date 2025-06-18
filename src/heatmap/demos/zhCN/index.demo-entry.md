<!--single-column-->

# 热力图 Heatmap

数字民工有属于自己的墙要刷

## 演示

```demo
basic.vue
themes.vue
colors.vue
```

## API

### Heatmap Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| data | `Array<{ date: Date, value: number }>` | `[]` | 热力图数据，包含日期和数值 |
| colors | `string[]` | `['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39']` | 颜色数组，按从浅到深的顺序排列 |
| unit | `string` | `undefined` | 数值的单位，用于 tooltip 显示 |
| weekStartOn | `number` | `0` | 一周的开始日，0 表示周日，1 表示周一 |
| showColorIndicator | `boolean` | `true` | 是否显示底部的颜色层级指示器 |
| type | `'month' \| 'year'` | `'year'` | 显示类型 |

### Heatmap Slots

| 名称   | 参数 | 说明         |
| ------ | ---- | ------------ |
| footer | `()` | 底部插槽内容 |
