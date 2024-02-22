# Float Button

Like `BackTop` but with more appearance level, more interaction.

Available since `NEXT_VERSION`.

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

| Name | Type | Default | Description | NEXT_VERSION |
| --- | --- | --- | --- | --- |
| bottom | `number \| string` | `40` | CSS `bottom` property of the button group. | NEXT_VERSION |
| height | `number \| string` | `40` | CSS `height` property of the button group. | NEXT_VERSION |
| left | `number \| string` | `undefined` | CSS `left` property of the button group. | NEXT_VERSION |
| menu-trigger | `'click' \| 'hover'` | `undefined` | Trigger action to show submenu. | NEXT_VERSION |
| position | `'relative' \| 'absolute' \| 'fixed'` | `'fixed'` | CSS `position` property of the button group. | NEXT_VERSION |
| right | `number \| string` | `undefined` | CSS `right` property of the button group. | NEXT_VERSION |
| shape | `'circle' \| 'square'` | `'circle'` | Shape of the button. | NEXT_VERSION |
| show-menu | `boolean` | `undefined` | Whether submenu of the button is shown. | NEXT_VERSION |
| top | `number \| string` | `undefined` | CSS `top` property of the button group. | NEXT_VERSION |
| type | `'default' \| 'primary'` | `'default'` | Type of the button. | NEXT_VERSION |
| width | `number \| string` | `undefined` |  | NEXT_VERSION |
| on-update:show-menu | `(value: boolean) => void` | `undefined` | Callback when the menu is opened or closed. | NEXT_VERSION |

### FloatButtonGroup Props

| Name | Type | Default | Description | NEXT_VERSION |
| --- | --- | --- | --- | --- |
| bottom | `number \| string` | `undefined` | CSS `bottom` property of the button group. | NEXT_VERSION |
| left | `number \| string` | `undefined` | CSS `left` property of the button group. | NEXT_VERSION |
| position | `'relative' \| 'absolute' \| 'fixed'` | `'fixed'` | CSS `position` property of the button group. | NEXT_VERSION |
| right | `number \| string` | `undefined` | CSS `right` property of the button group. | NEXT_VERSION |
| shape | `'circle' \| 'square'` | `'circle'` | Shape of the button group. | NEXT_VERSION |
| top | `number \| string` | `undefined` | CSS `top` property of the button group. | NEXT_VERSION |

### FloatButton Slots

| Name        | Parameters | Description                  | Version      |
| ----------- | ---------- | ---------------------------- | ------------ |
| description | `()`       | Description for the button.  | NEXT_VERSION |
| menu        | `()`       | Submenu of the float button. | NEXT_VERSION |
