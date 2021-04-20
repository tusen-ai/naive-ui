# Grid 栅格

<!--single-column-->

基于 CSS Grid，响应式，远离 IE。

如果你一定要 IE，试试 [旧版栅格](legacy-grid).

```demo
basic
gap
offset
responsive
collapse
grid-basic-debug
```

## Props

### Grid Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| cols | `number \| ResponsiveDescription` | `24` |  |
| collapsed | `boolean` | `false` |  |
| collapsed-rows | `number` | `1` |  |
| responsive | `'self' \| 'screen'` | `'self'` | `'self'` 根据自身宽度进行响应式布局，`'screen'` 根据屏幕断点进行响应式布局 |
| x-gap | `number \| ResponsiveDescription` | `0` |  |
| y-gap | `number \| ResponsiveDescription` | `0` |  |

### GridItem Props

| 名称   | 类型      | 默认值  | 说明 |
| ------ | --------- | ------- | ---- |
| offset | `number`  | `0`     |      |
| span   | `number`  | `1`     |      |
| suffix | `boolean` | `false` |      |

## Slots

### Grid Slots

| 名称    | 参数 | 说明 |
| ------- | ---- | ---- |
| default | `()` |      |

### GridItem Slots

| 名称    | 参数                      | 说明 |
| ------- | ------------------------- | ---- |
| default | `({ overflow: boolean })` |      |
