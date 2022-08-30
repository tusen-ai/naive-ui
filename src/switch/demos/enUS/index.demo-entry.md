# Switch

I have a Nintendo Switch, but don't have time to play it. This reminds me of my childhood when I played NDS... a happier time.

## Demos

```demo
basic.vue
size.vue
content.vue
loading.vue
event.vue
customize-value.vue
shape.vue
color.vue
icon.vue
```

## API

### Switch Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| checked-value | `string \| boolean \| number` | `true` | Value of checked state. |  |
| default-value | `boolean` | `false` | Default value. |  |
| disabled | `boolean` | `false` | Whether to disable the switch. |  |
| loading | `boolean` | `false` | Whether to show loading state. |  |
| rail-style | `(info: { focused: boolean, checked: boolean }) => (CSSProperties \| string)` | `undefined` | Rail style generator. |  |
| round | `boolean` | `true` | Whether the switch has rounded corners.   |  |
| rubber-band | `boolean` | `true` | Whether the switch button has rubber band effect. | 2.28.3 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | The size of the switch. |  |
| unchecked-value | `string \| boolean \| number` | `false` | Value of checked state. |  |
| value | `string \| number \| boolean \| undefined` | `undefined` | Value when being set manually. |  |
| on-update:value | `(value: boolean) => void` | `undefined` | Callback when the component's value changes. |  |

### Switch Slots

| Name | Parameters | Description | Version |
| --- | --- | --- | --- |
| checked | `()` | Content when the switch is checked. |  |
| checked-icon | `()` | Icon of switch button when checked. | 2.25.3 |
| icon | `()` | Icon of switch button. | 2.25.3 |
| unchecked | `()` | Content when the switch is unchecked. |  |
| unchecked-icon | `()` | Icon of switch button when unchecked. | 2.25.3 |
