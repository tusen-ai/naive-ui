# Switch

I have a Nintendo Switch, but have no time to play. It always make me recall the time when I played NDS, childhood is a happy time.

## Demos

```demo
basic
size
content
loading
event
```

## API

### Switch Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| default-value | `boolean` | `false` | Default value in uncontrolled mode. |
| disabled | `boolean` | `false` | Whether to disable the switch. |
| loading | `boolean` | `false` | Whether to show loading status. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | The size of switch. |
| value | `boolean` | `undefined` | Value in controlled mode. |
| on-update:value | `(value: boolean) => void` | `undefined` | Callback when the component's value changes. |

### Switch Slots

| Name      | Parameters | Description                             |
| --------- | ---------- | --------------------------------------- |
| checked   | `()`       | Content when the switch is checked.     |
| unchecked | `()`       | Content when the switch is not checked. |
