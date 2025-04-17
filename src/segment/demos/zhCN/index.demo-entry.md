# 分段控制器 Segment

用于展示多个选项并允许用户选择其中单个选项

自 `2.41.1` 开始提供。

## 演示

```demo
basic.vue
vertical.vue
disabled.vue
block.vue
custom-option.vue
size.vue
rtl-debug.vue
```

## API

### Segment Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| value | `string \| number` | - | 当前选中的分段值。 |  |
| default-value | `string \| number` | `null` | 默认选中的值 |  |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 大小 |  |
| disabled | `boolean` | `false` | 禁用状态 |  |
| vertical | `boolean` | `false` | 是否垂直分隔 |  |
| block | `boolean` | `false` | 是否显示为块级 |  |
| options | `Array<SegmentItemType>` | `[]` | 分段组的选项 |  |
| on-update:value | `(value: string \| number) => void` | `undefined` | 发生变化时触发的回调方法 |

### Segment Slots

| 名称 | 参数 | 说明 |
| --- | --- | --- |
| label | `(value: string \| number; label: string \| number)` | Segment 的选项渲染 |
