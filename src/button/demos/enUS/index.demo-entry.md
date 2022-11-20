# Button

Button is used to trigger some actions.

## Demos

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
```

## API

### Button Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| attr-type | `'button' \| 'submit' \| 'reset'` | `'button'` | The `type` attribute of the button's DOM. |  |
| block | `boolean` | `false` | Whether the button is displayed as block. |  |
| bordered | `boolean` | `true` | Whether the button shows the border. |  |
| circle | `boolean` | `false` | Whether the button is round. |  |
| color | `string` | `undefined` | Button color (support `#FFF`, `#FFFFFF`, `yellow`,`rgb(0, 0, 0)` formatted colors). |  |
| dashed | `boolean` | `false` | Whether the button's border is a dashed line. |  |
| disabled | `boolean` | `false` | Whether the button is disabled. |  |
| focusable | `boolean` | `true` | Whether the button is focusable. |  |
| ghost | `boolean` | `false` | Whether the button is ghost. |  |
| native-focus-behavior | `boolean` | Browser is not Safari | Whether to follow button's native focus behavior. Since safari's button can't be focused by click, naive-ui uses some tricks to make it focusable on safari. If you don't need the behavior or need the button to be draggable, you can enable the prop. | 2.28.3 |
| icon-placement | `'left' \| 'right'` | `'left'` | The position of the icon in the button. |  |
| keyboard | `boolean` | `true` | Whether is supports keyboard operation. |  |
| quaternary | `boolean` | `false` | Whether the button is quaternary button. |  |
| loading | `boolean` | `false` | Whether the button shows the loading status. |  |
| render-icon | `() => VNodeChild` | `undefined` | Render function that renders button icon. | 2.34.0 |
| round | `boolean` | `false` | Whether the button shows rounded corners. |  |
| secondary | `boolean` | `false` | Whether the button is secondary button. |  |
| size | `'tiny' \| 'small' \| 'medium' \| 'large'` | `'medium'` | Button size. |  |
| strong | `boolean` | `false` | Whether to use strong text in the button. |  |
| tertiary | `boolean` | `false` | Whether the button is tertiary button. |  |
| text | `boolean` | `false` | Whether to display as a text button. |  |
| text-color | `string` | `undefined` | Button text color (support `#FFF`, `#FFFFFF`, `yellow`,`rgb(0, 0, 0)` formatted colors). |  |
| type | `'default' \| 'tertiary' \| 'primary' \| 'success' \| 'info' \| 'warning' \| 'error'` | `'default'` | Button type. |  |
| tag | `string` | `'button'` | What tag need the button be rendered as. |  |

### ButtonGroup Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| size | `'tiny' \| 'small' \| 'medium' \| 'large'` | `undefined` | The buttons' size in button group. If set, the button's size prop inner group won't work. |
| vertical | `boolean` | `false` | Directions of buttons in the group. |

### Button Slots

| Name    | Parameters | Description                        |
| ------- | ---------- | ---------------------------------- |
| default | `()`       | The default content of the button. |
| icon    | `()`       | The icon of the button.            |

### ButtonGroup Slots

| Name    | Parameters | Description                            |
| ------- | ---------- | -------------------------------------- |
| default | `()`       | The button group is filled by default. |
