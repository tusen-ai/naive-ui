# Pagination

<!--single-column-->

Long data's friend.

## Demos

```demo
basic
slot
quick-jumper
size-picker
disabled
item-count
prev
prefix
page-size-option
```

## API

### Pagination Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| default-page | `number` | `1` | Current page in uncontrolled mode. |
| default-page-size | `number` | `10` | Page size in uncontrolled mode. |
| next | `(info: PaginationInfo) => VNodeChild` | `undefined` | Next page. |
| prev | `(info: PaginationInfo) => VNodeChild` | `undefined` | Previous page. |
| item-count | `number` | `undefined` | Total number. |
| page-count | `number` | `1` | Total pages. |
| page-sizes | `Array<number \| PaginationSizeOption>` | `[10]` | Number of items per page, can be customize.  |
| page-size | `number` | `undefined` | Page size in controlled mode. |
| page-slot | `number` | `9` | The number of pages displayed. |
| page | `number` | `undefined` | Current page in controlled mode. |
| prefix | `(info: PaginationInfo) => VNodeChild` | `undefined` | Paging prefix. |
| show-quick-jumper | `boolean` | `false` | Whether to show fast jump. |
| suffix | `(info: PaginationInfo) => VNodeChild` | `undefined` | Page suffix. |
| show-size-picker | `boolean` | `false` | Whether to show the selector of the number of items per page. |
| on-update:page | `(page: number) => void` | `undefined` | Callback function when the current page changes. |
| on-update:page-size | `(pageSize: number) => void` | `undefined` | Callback function when the current page size changes. |

### Pagination Slots

| Name   | Parameters               | Description    |
| ------ | ------------------------ | -------------- |
| next   | `(info: PaginationInfo)` | Next page.     |
| prev   | `(info: PaginationInfo)` | Previous page. |
| prefix | `(info: PaginationInfo)` | Page prefix.   |
| suffix | `(info: PaginationInfo)` | Page suffix.   |

### PaginationInfo Type

```ts
interface PaginationInfo {
  startIndex: number
  endIndex: number
  page: number
  pageSize: number
  pageCount: number
  itemCount: number | undefined
}
```
