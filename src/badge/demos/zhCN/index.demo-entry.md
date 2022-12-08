# 标记 Badge

我敢说你肯定见过这玩意而且知道怎么用它。

## 演示

```demo
basic.vue
type.vue
processing.vue
show-zero.vue
offset.vue
overflow.vue
manual.vue
custom-content.vue
color.vue
raw.vue
rtl-debug.vue
```

## API

### Badge Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| color | `string` | `undefined` | 标记的颜色 |
| dot | `boolean` | `false` | 标记是否显示为点 |
| max | `number` | `undefined` | 标记最大数来处理溢出情况 |
| offset | `Array<string \| number>` | `[0, 0]` | 设置状态点的位置偏移，格式为 `[left, top]` |
| processing | `boolean` | `false` | 标记显示进度 |
| show-zero | `boolean` | `false` | 标记为 0 时是否显示 |
| show | `boolean` | `true` | 标记受控显示 |
| type | `'default' \| 'success' \| 'error' \| 'warning' \| 'info'` | `'default'` | 标记显示类型 |
| value | `string \| number` | `undefined` | 标记数量 |

### Badge Slots

| 名称    | 参数 | 说明             |
| ------- | ---- | ---------------- |
| default | `()` | 标记内填充的内容 |
