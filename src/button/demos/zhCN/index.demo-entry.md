# 按钮 Button

按钮用来触发一些操作。

## 演示

```demo
basic
dashed
size
text
tag
disabled
icon
events
shape
ghost
loading
color
group
icon-button
rtl-debug
debug
```

## Props

### Button Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| attr-type | `'button' \| 'submit' \| 'reset'` | `'button'` | 按钮的 DOM `type` 属性 |
| block | `boolean` | `false` | 按钮是否显示为块级 |
| bordered | `boolean` | `true` | 按钮是否显示 border |
| circle | `boolean` | `false` | 按钮是否为圆形 |
| color | `string` | `undefined` | 只支持形如 `#FFF`, `#FFFFFF`, `rgb(0, 0, 0)` 的颜色 |
| dashed | `boolean` | `false` | 按钮 border 是否为虚线 |
| disabled | `boolean` | `false` | 按钮是否禁用 |
| ghost | `boolean` | `false` | 按钮是否透明 |
| icon-placement | `'left' \| 'right'` | `'left'` | 按钮中 icon 的位置 |
| keyboard | `boolean` | `true` | 是否支持键盘操作 |
| loading | `boolean` | `false` | 按钮是否显示加载状态 |
| round | `boolean` | `false` | 按钮是否显示圆角 |
| size | `'tiny' \| 'small' \| 'medium' \| 'large'` | `'medium'` | 按钮的尺寸 |
| text | `boolean` | `false` | 是否显示为文本按钮 |
| type | `'default' \| 'primary' \| 'success' \| 'info' \| 'warning' \| 'error'` | `'default'` | 按钮的类型 |

### Button Group Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| size | `'tiny' \| 'small' \| 'medium' \| 'large'` | `undefined` | 在组内的按钮的尺寸。如果设定，内部的按钮尺寸将不生效 |
| vertical | `boolean` | `false` | 组内按钮的排列方式 |

## Slots

### Button Slots

| 名称    | 参数 | 说明                 |
| ------- | ---- | -------------------- |
| default | `()` | 按钮的内容           |
| icon    | `()` | 按钮中 icon 填充内容 |

### Button Group Slots

| 名称    | 参数 | 说明         |
| ------- | ---- | ------------ |
| default | `()` | 按钮组的内容 |
