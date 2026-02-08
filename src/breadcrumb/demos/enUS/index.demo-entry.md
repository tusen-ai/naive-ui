# Breadcrumb

It doesn't look like what it calls.

## Demos

```demo
basic.vue
custom.vue
separator.vue
separator-per-item.vue
```

## API

### Breadcrumb Props

| Name      | Type     | Default | Description           |
| --------- | -------- | ------- | --------------------- |
| separator | `string` | `'/'`   | Breadcrumb separator. |

### BreadcrumbItem Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| clickable | `boolean` | `true` | Whether it's clickable. | 2.30.0 |
| href | `string` | `undefined` | BreadcrumbItem link. |  |
| separator | `string` | `undefined` | BreadcrumbItem separator. |  |
| show-separator | `boolean` | `true` | Whether to show the separator. | NEXT_VERSION |

### Breadcrumb Slots

| Name    | Parameters | Description              |
| ------- | ---------- | ------------------------ |
| default | `()`       | Breadcrumb default slot. |

### Breadcrumb Item Slots

| Name      | Parameters | Description                    |
| --------- | ---------- | ------------------------------ |
| default   | `()`       | BreadcrumbItem default slot.   |
| separator | `()`       | BreadcrumbItem separator slot. |
