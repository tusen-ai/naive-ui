# Pagination

<!--single-column-->

Long data's friend.

## Demos

```demo
basic.vue
simple.vue
slot.vue
quick-jumper.vue
size.vue
size-picker.vue
disabled.vue
item-count.vue
prev.vue
prefix.vue
page-size-option.vue
```

## API

### Pagination Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| default-page | `number` | `1` | Current page in uncontrolled mode. |  |
| default-page-size | `number` | `10` | Page size in uncontrolled mode. |  |
| disabled | `boolean` | `false` | Whether to disable the pagination. |  |
| display-order | `Array<'pages' \| 'size-picker' \| 'quick-jumper'>` | `['pages', 'size-picker', 'quick-jumper']` | Display order of different parts. | 2.32.2 |
| goto | `() => VNodeChild` | `undefined` | Fast jump content render function. | 2.34.3 |
| item-count | `number` | `undefined` | Total number. |  |
| next | `(info: PaginationInfo) => VNodeChild` | `undefined` | Next page. |  |
| prev | `(info: PaginationInfo) => VNodeChild` | `undefined` | Previous page. |  |
| label | `PaginationRenderLabel` | `undefined` | Item content. | 2.24.0 |
| page-count | `number` | `1` | Total pages. |  |
| page-sizes | `Array<number \| PaginationSizeOption>` | `[10]` | Number of items per page, can be customize. |  |
| page-size | `number` | `undefined` | Page size in controlled mode. |  |
| page-slot | `number` | `9` | The number of pages displayed. |  |
| page | `number` | `undefined` | Current page in controlled mode. |  |
| prefix | `(info: PaginationInfo) => VNodeChild` | `undefined` | Paging prefix. |  |
| select-props | `SelectProps` | `undefined` | Page size select's props. | 2.34.3 |
| show-quick-jumper | `boolean` | `false` | Whether to show fast jump. |  |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | size of page item. | 2.29.0 |
| simple | `boolean` | `false` | Whether to use simple mode. | 2.32.2 |
| suffix | `(info: PaginationInfo) => VNodeChild` | `undefined` | Page suffix. |  |
| show-size-picker | `boolean` | `false` | Whether to show the selector of the number of items per page. |  |
| to | `string \| HTMLElement \| false` | `body` | Container node of the pop menu. `false` will keep it not detached. | 2.33.4 |
| on-update:page | `(page: number) => void` | `undefined` | Callback function when the current page changes. |  |
| on-update:page-size | `(pageSize: number) => void` | `undefined` | Callback function when the current page size changes. |  |

#### PaginationRenderLabel Type

```ts
type PaginationRenderLabel = (
  info:
    | {
        type: 'fast-backward' | 'fast-forward'
        node: VNode
        active: boolean
      }
    | {
        type: 'page'
        node: number
        active: boolean
      }
) => VNodeChild
```

#### PaginationInfo Type

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

### Pagination Slots

| Name | Parameters | Description | Version |
| --- | --- | --- | --- |
| goto | `()` | Fast jump text before quick jumper. | 2.27.0 |
| label | The same as `PaginationRenderLabel`'s parameters | Item content. | 2.24.0 |
| next | `(info: PaginationInfo)` | Next page. |  |
| prev | `(info: PaginationInfo)` | Previous page. |  |
| prefix | `(info: PaginationInfo)` | Page prefix. |  |
| suffix | `(info: PaginationInfo)` | Page suffix. |  |
