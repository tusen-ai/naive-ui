# 面包屑 Breadcrumb

这东西长得和它名字不怎么像。

## 演示

```demo
basic.vue
custom.vue
separator.vue
separator-per-item.vue
```

## API

### Breadcrumb Props

| 名称      | 类型     | 默认值 | 说明               |
| --------- | -------- | ------ | ------------------ |
| separator | `string` | `'/'`  | 面包屑之间的分隔符 |

### BreadcrumbItem Props

| 名称      | 类型      | 默认值      | 说明                   | 版本   |
| --------- | --------- | ----------- | ---------------------- | ------ |
| clickable | `boolean` | `true`      | 是否可点击             | 2.30.0 |
| href      | `string`  | `undefined` | 链接地址               |        |
| separator | `string`  | `'/'`       | 面包屑子项之间的分隔符 |        |

### Breadcrumb Slots

| 名称    | 参数 | 说明                      |
| ------- | ---- | ------------------------- |
| default | `()` | Breadcrumb 默认填充的内容 |

### Breadcrumb Item Slots

| 名称      | 参数 | 说明                          |
| --------- | ---- | ----------------------------- |
| default   | `()` | BreadcrumbItem 默认填充的内容 |
| separator | `()` | 分隔符填充的内容              |
