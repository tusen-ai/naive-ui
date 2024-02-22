# Float Button

Like `Back Top`, more appearance level, more interaction.

Available since `NEXT_VERSION`.

## Demos

```demo
basic.vue
badge.vue
tooltip.vue
custom.vue
group.vue
```

## API

### FloatButton Props

| Name | Type | Default | Description | NEXT_VERSION |
| --- | --- | --- | --- | --- |
| bottom | `number \| string` | `40` | 距离页面底部的高度 | NEXT_VERSION |
| height | `number \| string` | `40` | 高度 | NEXT_VERSION |
| left | `number \| string` | `undefined` | 距离页面左侧的宽度 | NEXT_VERSION |
| menu-trigger | `'click' \| 'hover'` | `undefined` | 触发菜单显示的方式 | NEXT_VERSION |
| position | `'relative' \| 'absolute' \| 'fixed'` | `'fixed'` | 按钮组的定位方式 | NEXT_VERSION |
| right | `number \| string` | `undefined` | 距离页面右侧的宽度 | NEXT_VERSION |
| shape | `'circle' \| 'square'` | `'circle'` | 按钮的形状 | NEXT_VERSION |
| show-menu | `boolean` | `undefined` | 是否打开菜单 | NEXT_VERSION |
| top | `number \| string` | `undefined` | 距离页面顶部的高度 | NEXT_VERSION |
| type | `'default' \| 'primary'` | `'default'` | 按钮的类型 | NEXT_VERSION |
| width | `number \| string` | `undefined` | 宽度 | NEXT_VERSION |
| on-update:show-menu | `(value: boolean) => void` | `undefined` | 菜单打开或者关闭的回调 | NEXT_VERSION |

### FloatButtonGroup Props

| Name | Type | Default | Description | NEXT_VERSION |
| --- | --- | --- | --- | --- |
| bottom | `number \| string` | `undefined` | 距离页面底部的高度 | NEXT_VERSION |
| left | `number \| string` | `undefined` | 距离页面左侧的宽度 | NEXT_VERSION |
| position | `'relative' \| 'absolute' \| 'fixed'` | `'fixed'` | 按钮组的定位方式 | NEXT_VERSION |
| right | `number \| string` | `undefined` | 距离页面右侧的宽度 | NEXT_VERSION |
| shape | `'circle' \| 'square'` | `'circle'` | 按钮组的形状 | NEXT_VERSION |
| top | `number \| string` | `undefined` | 距离页面顶部的高度 | NEXT_VERSION |

### FloatButton Slots

| Name        | Parameters | Description        | Version      |
| ----------- | ---------- | ------------------ | ------------ |
| description | `()`       | 按钮中的描述信息   | NEXT_VERSION |
| menu        | `()`       | 按钮会触发的子菜单 | NEXT_VERSION |
