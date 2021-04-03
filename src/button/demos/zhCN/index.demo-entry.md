# 按钮 Button

按钮用来触发一些操作。

## 演示

```demo
basic
dashed
size
text
disabled
icon
events
shape
ghost
loading
color
group
debug
```

## Props

### Button Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| attr-type | `'button' \| 'submit' \| 'reset'` | `'button'` | 按钮的 DOM `type` 属性 |
| block | `boolean` | `false` |  |
| bordered | `boolean` | `true` |  |
| circle | `boolean` | `false` |  |
| color | `string` | `undefined` | 只支持形如 `#FFF`, `#FFFFFF`, `rgb(0, 0, 0)` 的颜色 |
| dashed | `boolean` | `false` |  |
| disabled | `boolean` | `false` |  |
| ghost | `boolean` | `false` |  |
| icon-placement | `'left' \| 'right'` | `'left'` |  |
| keyboard | `boolean` | `true` | 是否支持键盘操作 |
| loading | `boolean` | `false` |  |
| round | `boolean` | `false` |  |
| size | `'tiny' \| 'small' \| 'medium' \| 'large'` | `'medium'` |  |
| text | `boolean` | `false` |  |
| type | `'default' \| 'primary' \| 'success' \| 'info' \| 'warning' \| 'error'` | `'default'` |  |

### Button Group Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| size | `'tiny' \| 'small' \| 'medium' \| 'large'` | `undefined` | 在组内的按钮的尺寸。如果设定，内部的按钮尺寸将不生效 |
| vertical | `boolean` | `false` |  |

## Slots

### Button Slots

| 名称    | 参数 | 说明 |
| ------- | ---- | ---- |
| default | `()` |      |
| icon    | `()` |      |

### Button Group Slots

| 名称    | 参数 | 说明 |
| ------- | ---- | ---- |
| default | `()` |      |
