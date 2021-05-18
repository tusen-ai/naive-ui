# 分页 Pagination

<!--single-column-->

长数据之友。

## 演示

```demo
basic
slot
quick-jumper
size-picker
disabled
item-count
```

## Props

| 名称                | 类型                         | 默认值      | 说明 |
| ------------------- | ---------------------------- | ----------- | ---- |
| default-page        | `number`                     | `1`         |      |
| default-page-size   | `number`                     | `10`        |      |
| page-count          | `number`                     | `1`         |      |
| page-sizes          | `Array<number>`              | `['10']`    |      |
| page-size           | `number`                     | `undefined` |      |
| page-slot           | `number`                     | `9`         |      |
| page                | `number`                     | `undefined` |      |
| show-quick-jumper   | `boolean`                    | `false`     |      |
| show-size-picker    | `boolean`                    | `false`     |      |
| on-update:page      | `(page: number) => void`     | `undefined` |      |
| on-update:page-size | `(pageSize: number) => void` | `undefined` |      |
