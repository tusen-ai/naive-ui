# 按钮 Button

按钮用来触发一些操作。

## 演示

```demo
basic.vue
secondary.vue
tertiary.vue
quaternary.vue
dashed.vue
size.vue
text.vue
tag.vue
disabled.vue
icon.vue
events.vue
shape.vue
ghost.vue
loading.vue
color.vue
group.vue
icon-button.vue
popover.vue
rtl-debug.vue
debug.vue
```

## API

### Button Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| attr-type | `'button' \| 'submit' \| 'reset'` | `'button'` | 按钮的 DOM 的 `type` 属性 |  |
| block | `boolean` | `false` | 按钮是否显示为块级 |  |
| bordered | `boolean` | `true` | 按钮是否显示 border |  |
| circle | `boolean` | `false` | 按钮是否为圆形 |  |
| color | `string` | `undefined` | 按钮颜色（支持形如 `#FFF`， `#FFFFFF`， `yellow`，`rgb(0, 0, 0)` 的颜色） |  |
| dashed | `boolean` | `false` | 按钮边框是否为虚线 |  |
| disabled | `boolean` | `false` | 按钮是否禁用 |  |
| focusable | `boolean` | `true` | 按钮是否可以被聚焦 |  |
| ghost | `boolean` | `false` | 按钮是否透明 |  |
| native-focus-behavior | `boolean` | 浏览器不是 Safari | 按钮是否遵循原生的 focus 行为。Safari 原生的 button 无法通过点击被聚焦，所以默认情况下 naive-ui 做了一些处理使它可以被聚焦，如果你不需要这种行为，或者发现你需要让按钮可被拖动，可以开启这个属性 | 2.28.3 |
| icon-placement | `'left' \| 'right'` | `'left'` | 按钮中图标的位置 |  |
| keyboard | `boolean` | `true` | 是否支持键盘操作 |  |
| loading | `boolean` | `false` | 按钮是否显示加载状态 |  |
| quaternary | `boolean` | `false` | 是否是四级按钮 |  |
| render-icon | `() => VNodeChild` | `undefined` | 按钮图标的渲染函数 | 2.34.0 |
| round | `boolean` | `false` | 按钮是否显示圆角 |  |
| size | `'tiny' \| 'small' \| 'medium' \| 'large'` | `'medium'` | 按钮的尺寸 |  |
| secondary | `boolean` | `false` | 是否是次要按钮 |  |
| strong | `boolean` | `false` | 按钮文字是否加粗 |  |
| tertiary | `boolean` | `false` | 是否是三级按钮 |  |
| text | `boolean` | `false` | 是否显示为文本按钮 |  |
| text-color | `string` | `undefined` | 按钮文字颜色（支持形如 `#FFF`， `#FFFFFF`， `yellow`，`rgb(0, 0, 0)` 的颜色） |  |
| type | `'default' \| 'tertiary' \| 'primary' \| 'success' \| 'info' \| 'warning' \| 'error'` | `'default'` | 按钮的类型 |  |
| tag | `string` | `'button'` | 按钮需要被渲染为什么标签 |  |

### ButtonGroup Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| size | `'tiny' \| 'small' \| 'medium' \| 'large'` | `undefined` | 在组内的按钮的尺寸。如果设定，内部的按钮尺寸将不生效 |
| vertical | `boolean` | `false` | 组内按钮的排列方式 |

### Button Slots

| 名称    | 参数 | 说明       |
| ------- | ---- | ---------- |
| default | `()` | 按钮的内容 |
| icon    | `()` | 按钮的图标 |

### ButtonGroup Slots

| 名称    | 参数 | 说明         |
| ------- | ---- | ------------ |
| default | `()` | 按钮组的内容 |
