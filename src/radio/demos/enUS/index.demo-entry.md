# Radio

<!--single-column-->

When I was young, I was fond of listening to the radio, such as FM 106.8 or FM 92.1.

## Demos

```demo
basic
group
button-group
size
```

## API

### Radio Props, RadioButton Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| checked | `boolean` | `undefined` | Checked status. |
| default-checked | `boolean` | `false` | Default checked status. |
| disabled | `boolean` | `false` | Disabled status. |
| name | `string` | `undefined` | The name attribute of the radio element. If not set, name of `radio-group` will be used. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Size. |
| value | `string` | `undefined` | Checked value. |
| on-update:checked | `(check: boolean) => void` | `undefined` | Callback method triggered when a change occurs. |

### RadioGroup Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| disabled | `boolean` | `false` | Disabled status. |
| name | `string` | `undefined` | The name attribute of the radio elements inside the group. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Size. |
| value | `string \| null` | `null` | Checked value. |
| on-update:value | `(value: string) => void` | `undefined` | Callback method triggered when a change occurs. |
