# Color Picker

If there's no theme editor, I won't make the component.

## Demos

```demo
basic
size
form
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| default-show | `boolean` | `undefined` | Whether to show panel by default. |
| default-value | `string` | `#000000` | Default value of the picker. |
| modes | `Array<'rgba' \| 'hexa' \| 'hsla' \| 'hsva'>` | `['rgba', 'hexa', 'hsla']` | The value format of the picker. Notice that value will follow the mode once you select a new value from the picker. |
| to | `string \| HTMLElement` | `'body'` | Where to detach the panel. |
| show | `boolean` | `undefined` | Whether to show the panel. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` |  |
| value | `string \| null` | `undefined` | Value of the picker. |
| on-complete | `(value: string) => void` | `undefined` | Callback once the value is changed completely (not called during mousemove). |
| on-update:show | `(value: boolean) => void` | `undefined` | Callback once panel show status is changed. |
| on-update:value | `(value: string) => void` | `undefined` | Callback once the value is changed. |
