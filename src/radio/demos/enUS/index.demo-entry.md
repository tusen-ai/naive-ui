# Radio

<!--single-column-->

When I was young, I loved listening to the radio, such as FM 106.8 or FM 92.1.

## Demos

```demo
basic.vue
group.vue
button-group.vue
size.vue
```

## API

### Radio Props, RadioButton Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| checked | `boolean` | `undefined` | Checked state. |  |
| default-checked | `boolean` | `false` | Default checked state. |  |
| disabled | `boolean` | `false` | Disabled state. |  |
| label | `string` | `undefined` | Radio label. If not set, render default slot content, if both, use default slot content first. | 2.28.0 |
| name | `string` | `undefined` | The name attribute of the radio element. If not set, name of `radio-group` will be used. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Size. |  |
| value | `string \| number \| boolean` | `'on'` | Checked value. | `boolean` 2.33.0 |
| on-update:checked | `(check: boolean) => void` | `undefined` | Callback method triggered when a selection change occurs. |  |

### RadioGroup Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| disabled | `boolean` | `false` | Disabled state. |
| name | `string` | `undefined` | The name attribute of the radio elements inside the group. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Size. |
| value | `string \| number \| boolean \| null` | `null` | Checked value. |
| default-value | `string \| number \| boolean \| null` | `null` | Default checked value. |
| on-update:value | `(value: string \| number \| boolean) => void` | `undefined` | Callback method triggered when a selection change occurs. |
