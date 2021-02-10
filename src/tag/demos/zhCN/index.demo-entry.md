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
```

## Props

### Tag

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| bordered | `boolean` | `true` |  |
| checkable | `boolean` | `false` |  |
| checked | `boolean` | `false` |  |
| closable | `boolean` | `false` |  |
| disabled | `boolean` | `false` |  |
| round | `boolean` | `false` |  |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` |  |
| type | `'default' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'default'` |  |
| on-update:checked | `(value: boolean) => any` | `undefined` |  |

## Slots

| 名称    | 参数 | 说明 |
| ------- | ---- | ---- |
| default | `()` |      |
