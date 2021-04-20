# 表格 Table

<!--single-column-->

如果你只想画点简单的表格，用它。需要渲染数据请看<n-a to="data-table">数据表格 Data Table</n-a>。

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
| buttom-bordered | `boolean`                        | `true`     |      |
| bordered        | `boolean`                        | `true`     |      |
| single-column   | `boolean`                        | `false`    |      |
| single-line     | `boolean`                        | `true`     |      |
| size            | `'small' \| 'medium' \| 'large'` | `'medium'` |      |
