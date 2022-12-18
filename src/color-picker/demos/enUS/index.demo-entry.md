# Color Picker

Unlike the real world, these color values are discrete.

## Demos

```demo
basic.vue
alpha.vue
size.vue
disabled.vue
modes.vue
actions.vue
form.vue
swatches.vue
native.vue
```

## API

### ColorPicker Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| default-show | `boolean` | `undefined` | Whether to show the color panel by default. |  |
| default-value | `string` | Black color value of 1st mode's corresponding value. | Default value of the picker. |  |
| modes | `Array<'rgb' \| 'hex' \| 'hsl' \| 'hsv'>` | `['rgb', 'hex', 'hsl']` | The value format of the picker. Notice that value will follow the mode once you select a new value from the picker. |  |
| placement | `'top-start' \| 'top' \| 'top-end' \| 'right-start' \| 'right' \| 'right-end' \| 'bottom-start' \| 'bottom' \| 'bottom-end' \| 'left-start' \| 'left' \| 'left-end'` | `'bottom-start'` | Color panel placement. | 2.25.0 |
| render-label | `(color: string \| null) => VNodeChild` | `undefined` | Label render function of the color picker trigger. | 2.24.0 |
| show | `boolean` | `undefined` | Whether the color panel is shown. |  |
| show-alpha | `boolean` | `true` | Whether the alpha channel can be adjusted. |  |
| show-preview | `boolean` | `false` | Whether the color preview is shown. |  |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Size of the picker. |  |
| disabled | `boolean` | `false` | Whether to disable the color picker. | 2.24.5 |
| swatches | `string[]` | `undefined` | Value of the swatches. |  |
| to | `string \| HTMLElement \| false` | `'body'` | Where to attach the panel to. `false` will keep it not detached. |  |
| value | `string \| null` | `undefined` | Value of the picker. |  |
| on-complete | `(value: string) => void` | `undefined` | Callback once the value is changed completely (not called during mousemove). |  |
| on-confirm | `(value: string) => void` | `undefined` | Callback once the confirm button is clicked. | 2.29.0 |
| on-update:show | `(value: boolean) => void` | `undefined` | Callback once panel the show status is changed. |  |
| on-update:value | `(value: string) => void` | `undefined` | Callback once the value is changed. |  |
| actions | `Array<'confirm' \| 'clear'> \| null` | `null` | The types of buttons to be shown in the panel. |  |

### ColorPicker Slots

| Name | Parameters | Description | Version |
| --- | --- | --- | --- |
| label | `(color: string \| null)` | Label of the color picker trigger. | 2.24.0 |

## Q & A

### How to get color value from name?

Naive doesn't provide it builtin. You can create a color map, like [https://github.com/bgrins/TinyColor/blob/master/tinycolor.js#L803](https://github.com/bgrins/TinyColor/blob/master/tinycolor.js#L803).

Or you can create a function like this.

```js
export function getRgb (colorName) {
  const el = document.createElement('div')
  el.style.color = colorName
  document.body.appendChild(el)
  const rgbColor = getComputedStyle(el).color
  document.body.removeChild(el)
  return rgbColor
}
```
