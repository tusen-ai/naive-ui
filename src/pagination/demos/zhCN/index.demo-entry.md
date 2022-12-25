# 分页 Pagination

<!--single-column-->

长数据之友。

## 演示

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
display-order.vue
rtl-debug.vue
```

## API

### Pagination Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| default-page | `number` | `1` | 非受控模式下的当前页 |  |
| default-page-size | `number` | `10` | 非受控模式下的分页大小 |  |
| disabled | `boolean` | `false` | 是否禁用 |  |
| display-order | `Array<'pages' \| 'size-picker' \| 'quick-jumper'>` | `['pages', 'size-picker', 'quick-jumper']` | 不同部分的展示顺序 | 2.32.2 |
| goto | `() => VNodeChild` | `undefined` | 渲染快速跳转的文本内容 | 2.34.3 |
| item-count | `number` | `undefined` | 总条数 |  |
| next | `(info: PaginationInfo) => VNodeChild` | `undefined` | 下一页 |  |
| prev | `(info: PaginationInfo) => VNodeChild` | `undefined` | 上一页 |  |
| label | `PaginationRenderLabel` | `undefined` | 每一项的内容 | 2.24.0 |
| page-count | `number` | `1` | 总页数 |  |
| page-sizes | `Array<number \| PaginationSizeOption>` | `[10]` | 每页条数， 可自定义 |  |
| page-size | `number` | `undefined` | 受控模式下的分页大小 |  |
| page-slot | `number` | `9` | 页码显示的个数 |  |
| page | `number` | `undefined` | 受控模式下的当前页 |  |
| prefix | `(info: PaginationInfo) => VNodeChild` | `undefined` | 分页前缀 |  |
| select-props | `SelectProps` | `undefined` | 分页大小选择器的属性 | 2.34.3 |
| show-quick-jumper | `boolean` | `false` | 是否显示快速跳转 |  |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 分页按钮的大小 | 2.29.0 |
| simple | `boolean` | `false` | 是否显示为简单分页 | 2.32.2 |
| suffix | `(info: PaginationInfo) => VNodeChild` | `undefined` | 分页后缀 |  |
| show-size-picker | `boolean` | `false` | 是否显示每页条数的选择器 |  |
| to | `string \| HTMLElement \| false` | `body` | 弹出菜单的容器节点，`false` 会待在原地 | 2.33.4 |
| on-update:page | `(page: number) => void` | `undefined` | 当前页发生改变时的回调函数 |  |
| on-update:page-size | `(pageSize: number) => void` | `undefined` | 当前分页大小发生改变时的回调函数 |  |

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

| 名称   | 参数                            | 说明               | 版本   |
| ------ | ------------------------------- | ------------------ | ------ |
| goto   | `()`                            | 快速跳转的文本内容 | 2.27.0 |
| label  | 同 `PaginationRenderLabel` 参数 | 每一项的内容       | 2.24.0 |
| next   | `(info: PaginationInfo)`        | 下一页             |        |
| prev   | `(info: PaginationInfo)`        | 上一页             |        |
| prefix | `(info: PaginationInfo)`        | 分页前缀           |        |
| suffix | `(info: PaginationInfo)`        | 分页后缀           |        |
