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

## Props

### Radio Props, RadioButton Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| checked | `boolean` | `undefined` |  |
| default-checked | `boolean` | `false` |  |
| name | `string` | `undefined` | The name attribute of the radio element. If not set, name of `radio-group` will be used. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 只用于 `n-radio` |
| value | `string` | `undefined` |  |
| on-update:checked | `(check: boolean) => void` | `undefined` |  |

### RadioGroup Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| disabled | `boolean` | `false` |  |
| name | `string` | `undefined` | The name attribute of the radio elements inside the group. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` |  |
| value | `string \| null` | `null` |  |
| on-update:value | `(value: string) => void` | `undefined` |  |
