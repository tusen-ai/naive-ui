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
striped
```

## Components

You can use `n-table`, `n-thead`, `n-tbody`, `n-tr`, `n-th` and `n-td`. At most time you won't need the components after `n-table`. They can be used to reduce the granularity of dependency collecting.

## API

### Table Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| bottom-bordered | `boolean` | `true` | The bottom border of the table, this prop is invalid when `bordered` is `true`. |
| bordered | `boolean` | `true` | Whether to show table border. |
| single-column | `boolean` | `false` | Whether to display as a column (when `true`, each column has `border-right`). |
| single-line | `boolean` | `true` | Whether to display as a line (when `true`, each row has `border-bottom`). |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Table size. |
| striped | `boolean` | `false` | Whether to show zebra stripes on rows. |
