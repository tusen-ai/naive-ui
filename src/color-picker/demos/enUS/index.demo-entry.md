# Color Picker

Unlike the real world, these color values are discrete.

## Demos

```demo
basic
alpha
size
modes
form
swatches
native
```

## API

### ColorPicker Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| default-show | `boolean` | `undefined` | Whether to show the color panel by default. |
| default-value | `string` | Black color value of 1st mode's corresponding value. | Default value of the picker. |
| modes | `Array<'rgb' \| 'hex' \| 'hsl' \| 'hsv'>` | `['rgb', 'hex', 'hsl']` | The value format of the picker. Notice that value will follow the mode once you select a new value from the picker. |
| to | `string \| HTMLElement` | `'body'` | Where to attach the panel to. |
| show | `boolean` | `undefined` | Whether the color panel is shown. |
| show-alpha | `boolean` | `true` | Whether the alpha channel can be adjusted. |
| show-preview | `boolean` | `false` | Whether the color preview is shown. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Size of the picker. |
| swatches | `string[]` | `undefined` | Value of the swatches. |
| value | `string \| null` | `undefined` | Value of the picker. |
| on-complete | `(value: string) => void` | `undefined` | Callback once the value is changed completely (not called during mousemove). |
| on-update:show | `(value: boolean) => void` | `undefined` | Callback once panel the show status is changed. |
| on-update:value | `(value: string) => void` | `undefined` | Callback once the value is changed. |
| actions | `Array<'confirm'> \| null` | `null` | The types of buttons to be shown in the panel. |

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
