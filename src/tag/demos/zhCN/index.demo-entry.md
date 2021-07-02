# 标签 Tag

通常用来展示一些属性，偶尔也用来当一些备选的属性。

## 演示

```demo
basic
closable
disabled
size
checkable
shape
rtl-debug
```

## Props

### Tag

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| bordered | `boolean` | `true` | 是否有边框 |
| checkable | `boolean` | `false` | 是否可以选择 |
| checked | `boolean` | `false` | 是否被选中 |
| closable | `boolean` | `false` | 是否可关闭 |
| disabled | `boolean` | `false` | 是否禁用 |
| round | `boolean` | `false` | 是否圆角 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 尺寸 |
| type | `'default' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'default'` | 类型 |
| on-click | `(e: MouseEvent) => void` | `undefined` | 点击关闭时的回调 |
| on-update:checked | `(value: boolean) => void` | `undefined` | 选择状态更改时的回调 |

## Slots

| 名称    | 参数 | 说明 |
| ------- | ---- | ---- |
| default | `()` |      |
