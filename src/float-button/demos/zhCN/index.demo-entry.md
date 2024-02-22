# 浮动按钮 Float Button

跟 `Back Top` 很像，多一份颜值，多一份互动。

`2.38.0` 版本开始提供该组件。

## 演示

```demo
basic.vue
badge.vue
tooltip.vue
custom.vue
group.vue
menu.vue
```

## API

### FloatButton Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| bottom | `number \| string` | `40` | 按钮的 CSS `bottom` 属性 | 2.38.0 |
| height | `number \| string` | `40` | 按钮的 CSS `height` 属性 | 2.38.0 |
| left | `number \| string` | `undefined` | 按钮的 CSS `left` 属性 | 2.38.0 |
| menu-trigger | `'click' \| 'hover'` | `undefined` | 触发菜单显示的方式 | 2.38.0 |
| position | `'relative' \| 'absolute' \| 'fixed'` | `'fixed'` | 按钮组的定位方式 | 2.38.0 |
| right | `number \| string` | `undefined` | 按钮的 CSS `right` 属性 | 2.38.0 |
| shape | `'circle' \| 'square'` | `'circle'` | 按钮的形状 | 2.38.0 |
| show-menu | `boolean` | `undefined` | 是否打开菜单 | 2.38.0 |
| top | `number \| string` | `undefined` | 按钮的 CSS `top` 属性 | 2.38.0 |
| type | `'default' \| 'primary'` | `'default'` | 按钮的类型 | 2.38.0 |
| width | `number \| string` | `undefined` | 按钮的 CSS `width` 属性 | 2.38.0 |
| on-update:show-menu | `(value: boolean) => void` | `undefined` | 菜单打开或者关闭的回调 | 2.38.0 |

### FloatButtonGroup Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| bottom | `number \| string` | `undefined` | 按钮组的 CSS `bottom` 属性 | 2.38.0 |
| left | `number \| string` | `undefined` | 按钮组的 CSS `left` 属性 | 2.38.0 |
| position | `'relative' \| 'absolute' \| 'fixed'` | `'fixed'` | 按钮组的定位方式 | 2.38.0 |
| right | `number \| string` | `undefined` | 按钮组的 CSS `right` 属性 | 2.38.0 |
| shape | `'circle' \| 'square'` | `'circle'` | 按钮组的形状 | 2.38.0 |
| top | `number \| string` | `undefined` | 按钮组的 CSS `top` 属性 | 2.38.0 |

### FloatButton Slots

| 名称        | 参数 | 说明               | 版本   |
| ----------- | ---- | ------------------ | ------ |
| description | `()` | 按钮中的描述信息   | 2.38.0 |
| menu        | `()` | 按钮会触发的子菜单 | 2.38.0 |
