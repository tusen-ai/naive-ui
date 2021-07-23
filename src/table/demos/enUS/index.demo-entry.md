# Table

<!--single-column-->

If you only want to render some basic table, use it. If you want to render structured data, see [Data Table](data-table).

## Demos

```demo
basic
bordered
size
single-column
single-line
```

## Components

You can use `n-table`, `n-thead`, `n-tbody`, `n-tr`, `n-th` and `n-td`. At most time you won't need the components after `n-table`. They can be used to reduce the granularity of dependency collecting.

## Props

### Table Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| buttom-bordered | `boolean` | `true` |  |
| bordered | `boolean` | `true` |  |
| single-column | `boolean` | `false` |  |
| single-line | `boolean` | `true` |  |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` |  |
