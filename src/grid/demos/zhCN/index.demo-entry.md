# Grid 栅格

<!--single-column-->

基于 CSS Grid，响应式，远离 IE。

<n-alert type="warning" title="注意" :bordered="false">
  由于技术限制，<n-text code>n-grid-item</n-text> 是无法被二次封装的。
</n-alert>

## 演示

```demo
basic.vue
gap.vue
offset.vue
responsive.vue
responsive-item.vue
collapse.vue
layout-shift-disabled.vue
grid-basic-debug.vue
```

## API

### Grid Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| cols | `number \| ResponsiveDescription` | `24` | 显示的栅格数量 |  |
| collapsed | `boolean` | `false` | 是否默认折叠 |  |
| collapsed-rows | `number` | `1` | 默认展示的行数 |  |
| layout-shift-disabled | `boolean` | `false` | 默认情况下，`n-grid` 会基于窗口宽度和容器宽度计算栅格内容，这会有两个副作用：在进行 SSR 的时候可能会出现内容闪烁；渲染时会出现 Layout Shift，这会略微影响渲染性能。但是如果你不需要响应式功能，你可以通过 `layout-shift-disabled` 规避删格的副作用。需要注意的是，打开这个选项会禁用 `n-grid` 的一切响应式功能和 `n-grid-item` 的 `suffix`、`offset` | 2.32.2 |
| responsive | `'self' \| 'screen'` | `'self'` | `'self'` 根据自身宽度进行响应式布局，`'screen'` 根据屏幕断点进行响应式布局 |  |
| item-responsive | `boolean` | `false` | 子元素是否可具有响应式宽度 |  |
| x-gap | `number \| ResponsiveDescription` | `0` | 横向间隔槽 |  |
| y-gap | `number \| ResponsiveDescription` | `0` | 纵向间隔槽 |  |

### GridItem Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| offset | `number \| ResponsiveDescription` | `0` | 栅格左侧的间隔格数， |
| span | `number \| ResponsiveDescription` | `1` | 栅格占据的列数，为 0 的时候会隐藏 |
| suffix | `boolean` | `false` | 栅格后缀 |

### Grid Slots

| 名称    | 参数 | 说明     |
| ------- | ---- | -------- |
| default | `()` | 栅格内容 |

### GridItem Slots

| 名称    | 参数                      | 说明         |
| ------- | ------------------------- | ------------ |
| default | `({ overflow: boolean })` | 栅格节点内容 |
