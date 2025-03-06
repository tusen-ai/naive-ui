# 分段控制器 Segment

用于展示多个选项并允许用户选择其中单个选项

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

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| value | `string \| number \| boolean` | - | 当前选中的分段值。 |  |
| default-value | `string \| number \| boolean` | `null` | 默认选中的值 |  |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 大小 |  |
| disabled | `boolean` | `false` | 禁用状态 |  |
| vertical | `boolean` | `false` | 是否垂直分隔 |  |
| block | `boolean` | `false` | 是否显示为块级 |  |
| options | `Array<SegmentItemType>` | `[]` | 分段组的选项 |  |
| on-update:value | `(value: string \| number \| boolean) => void` | `undefined` | 发生变化时触发的回调方法 |
