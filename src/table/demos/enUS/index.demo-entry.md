# Table

<!--single-column-->

If you only want to render some basic tables, use it. If you want to render structured data, see [Data Table](data-table).

## Demos

```demo
basic.vue
bordered.vue
size.vue
single-column.vue
single-line.vue
striped.vue
```

## Components

You can use `n-table`, `n-thead`, `n-tbody`, `n-tr`, `n-th` and `n-td`. At most time you won't need the components after `n-table`. They can be used to reduce the granularity of dependency collecting.

## API

### Table Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| bottom-bordered | `boolean` | `true` | The bottom border of the table, this prop is invalid when `bordered` is `true`. |
| bordered | `boolean` | `true` | Whether to show table border. |
| single-column | `boolean` | `false` | Whether rows are not divided. If the prop is `true`, table cell has no `border-bottom`. |
| single-line | `boolean` | `true` | Whether columns are not divided. If the prop is `true`, table cell has no `border-right`. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Table size. |
| striped | `boolean` | `false` | Whether to show zebra stripes on rows. |
