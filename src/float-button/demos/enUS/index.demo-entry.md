# Float Button

Like `BackTop` but with more appearance level, more interaction.

Available since `2.38.0`.

## Demos

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

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| bottom | `number \| string` | `40` | CSS `bottom` property of the button group. | 2.38.0 |
| height | `number \| string` | `40` | CSS `height` property of the button group. | 2.38.0 |
| left | `number \| string` | `undefined` | CSS `left` property of the button group. | 2.38.0 |
| menu-trigger | `'click' \| 'hover'` | `undefined` | Trigger action to show submenu. | 2.38.0 |
| position | `'relative' \| 'absolute' \| 'fixed'` | `'fixed'` | CSS `position` property of the button group. | 2.38.0 |
| right | `number \| string` | `undefined` | CSS `right` property of the button group. | 2.38.0 |
| shape | `'circle' \| 'square'` | `'circle'` | Shape of the button. | 2.38.0 |
| show-menu | `boolean` | `undefined` | Whether submenu of the button is shown. | 2.38.0 |
| top | `number \| string` | `undefined` | CSS `top` property of the button group. | 2.38.0 |
| type | `'default' \| 'primary'` | `'default'` | Type of the button. | 2.38.0 |
| width | `number \| string` | `undefined` |  | 2.38.0 |
| on-update:show-menu | `(value: boolean) => void` | `undefined` | Callback when the menu is opened or closed. | 2.38.0 |

### FloatButtonGroup Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| bottom | `number \| string` | `undefined` | CSS `bottom` property of the button group. | 2.38.0 |
| left | `number \| string` | `undefined` | CSS `left` property of the button group. | 2.38.0 |
| position | `'relative' \| 'absolute' \| 'fixed'` | `'fixed'` | CSS `position` property of the button group. | 2.38.0 |
| right | `number \| string` | `undefined` | CSS `right` property of the button group. | 2.38.0 |
| shape | `'circle' \| 'square'` | `'circle'` | Shape of the button group. | 2.38.0 |
| top | `number \| string` | `undefined` | CSS `top` property of the button group. | 2.38.0 |

### FloatButton Slots

| Name        | Parameters | Description                  | Version |
| ----------- | ---------- | ---------------------------- | ------- |
| description | `()`       | Description for the button.  | 2.38.0  |
| menu        | `()`       | Submenu of the float button. | 2.38.0  |
