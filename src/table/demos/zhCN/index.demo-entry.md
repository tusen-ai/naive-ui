# 表格 Table

<!--single-column-->

如果你只想画点简单的表格，用它。需要渲染数据请看[数据表格 Data Table](data-table)。

## 演示

```demo
basic
bordered
size
single-column
single-line
```

## Components

你可以使用 `n-table`、`n-thead`、`n-tbody`、`n-tr`、`n-th` 和 `n-td`。多数情况下你不需要使用后面的组件，他们可以用来减少依赖收集的粒度。

## Props

### Table Props

| 名称            | 类型                             | 默认值     | 说明 |
| --------------- | -------------------------------- | ---------- | ---- |
| bottom-bordered | `boolean` | `true` | 表格底部边框，在 `bordered = true` 时该参数无效 |
| bordered | `boolean` | `true` | 表格边框 |
| single-column | `boolean` | `false` | 单列模式表格 |
| single-line | `boolean` | `true` | 表格列的边框 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 表格尺寸大小 |
