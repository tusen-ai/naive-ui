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
prefix
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| default-page | `number` | `1` |  |
| default-page-size | `number` | `10` |  |
| item-count | `number` | `undefined` |  |
| page-count | `number` | `1` |  |
| page-sizes | `Array<number>` | `['10']` |  |
| page-size | `number` | `undefined` |  |
| page-slot | `number` | `9` |  |
| page | `number` | `undefined` |  |
| prefix | `(info: PaginationInfo) => VNodeChild` | `undefined` |  |
| show-quick-jumper | `boolean` | `false` |  |
| suffix | `(info: PaginationInfo) => VNodeChild` | `undefined` |  |
| show-size-picker | `boolean` | `false` |  |
| on-update:page | `(page: number) => void` | `undefined` |  |
| on-update:page-size | `(pageSize: number) => void` | `undefined` |  |

## Slots

| 名称   | 参数                     | 说明 |
| ------ | ------------------------ | ---- |
| prefix | `(info: PaginationInfo)` |      |
| suffix | `(info: PaginationInfo)` |      |

## API

### PaginationInfo Type

```__ts
interface PaginationInfo {
  startIndex: number
  endIndex: number
  page: number
  pageSize: number
  pageCount: number
}
```
