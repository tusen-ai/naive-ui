# Grid 栅格

<!--single-column-->

基于 CSS Grid，响应式，远离 IE。

```demo
vshow-debug.vue
```

basic.vue gap.vue offset.vue responsive.vue responsive-item.vue collapse.vue grid-basic-debug.vue

## API

### Grid Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| cols | `number \| ResponsiveDescription` | `24` | 显示的栅格数量 |
| collapsed | `boolean` | `false` | 是否默认折叠 |
| collapsed-rows | `number` | `1` | 默认展示的行数 |
| responsive | `'self' \| 'screen'` | `'self'` | `'self'` 根据自身宽度进行响应式布局，`'screen'` 根据屏幕断点进行响应式布局 |
| item-responsive | `boolean` | `false` | 子元素是否可具有响应式宽度 |
| x-gap | `number \| ResponsiveDescription` | `0` | 横向间隔槽 |
| y-gap | `number \| ResponsiveDescription` | `0` | 纵向间隔槽 |

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
