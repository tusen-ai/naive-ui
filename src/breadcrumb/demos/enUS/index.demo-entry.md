# Breadcrumb

It doesn't look like what it calls.

## Demos

```demo
basic
custom
separator
separator-per-item
```

## API

### Breadcrumb Props

| Name      | Type     | Default | Description           |
| --------- | -------- | ------- | --------------------- |
| separator | `string` | `'/'`   | Breadcrumb separator. |

### BreadcrumbItem Props

| Name      | Type     | Default     | Description               |
| --------- | -------- | ----------- | ------------------------- |
| separator | `string` | `undefined` | BreadcrumbItem separator. |
| href      | `string` | `undefined` | BreadcrumbItem link.      |

### Breadcrumb Slots

| Name    | Parameters | Description              |
| ------- | ---------- | ------------------------ |
| default | `()`       | Breadcrumb default slot. |

### Breadcrumb Item Slots

| Name      | Parameters | Description                    |
| --------- | ---------- | ------------------------------ |
| default   | `()`       | BreadcrumbItem default slot.   |
| separator | `()`       | BreadcrumbItem separator slot. |
