# 分段控制器 Segment

用于展示多个选项并允许用户选择其中单个选项

自 `NEXT_VERSION` 开始提供。

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
| value | `string \| number` | - | 当前选中的分段值。 | NEXT_VERSION |
| default-value | `string \| number` | `null` | 默认选中的值 | NEXT_VERSION |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 大小 | NEXT_VERSION |
| disabled | `boolean` | `false` | 禁用状态 | NEXT_VERSION |
| vertical | `boolean` | `false` | 是否垂直分隔 | NEXT_VERSION |
| block | `boolean` | `false` | 是否显示为块级 | NEXT_VERSION |
| name | `string` | `undefined` | Segment 下所有 input[type="radio"] 的 name 属性。若未设置，则使用随机生成的名称 | NEXT_VERSION |
| options | `Array<SegmentItemType>` | `[]` | 分段组的选项 | NEXT_VERSION |
| on-update:value | `(value: string \| number) => void` | `undefined` | 发生变化时触发的回调方法 | NEXT_VERSION |

### SegmentItemType Properties

| 名称      | 类型               | 默认值  | 说明             | 版本         |
| --------- | ------------------ | ------- | ---------------- | ------------ |
| value     | `string \| number` | -       | 分段项的值       | NEXT_VERSION |
| label     | `string`           | -       | 分段项的显示文本 | NEXT_VERSION |
| disabled? | `boolean`          | `false` | 分段项的禁用状态 | NEXT_VERSION |

### Segment Slots

| 名称 | 参数 | 类型别名 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| default | `(value: string \| number; label: string \| number; disabled: boolean)` | `SegmentDefaultSlot` | Segment 的选项渲染 | NEXT_VERSION |
