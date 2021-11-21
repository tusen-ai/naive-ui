# Switch

I have a Nintendo Switch, but don't have time to play it. This reminds me of my childhood when I played NDS... a happier time.

## Demos

```demo
basic
size
content
loading
event
customize-value
shape
```

## API

### Switch Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| checked-value | `string \| boolean \| number` | `true` | Value of checked state. |
| default-value | `boolean` | `false` | Default value. |
| disabled | `boolean` | `false` | Whether to disable the switch. |
| loading | `boolean` | `false` | Whether to show loading state. |
| round | `boolean` | `true` | Whether the switch has rounded corners.   |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | The size of the switch. |
| value | `boolean` | `undefined` | Value when being set manually. |
| unchecked-value | `string \| boolean \| number` | `false` | Value of unchecked state. |
| on-update:value | `(value: boolean) => void` | `undefined` | Callback when the component's value changes. |

### Switch Slots

| Name      | Parameters | Description                           |
| --------- | ---------- | ------------------------------------- |
| checked   | `()`       | Content when the switch is checked.   |
| unchecked | `()`       | Content when the switch is unchecked. |
