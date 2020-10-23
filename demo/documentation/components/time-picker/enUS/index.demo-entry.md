# Time Picker
Like a digital clock.

## Demos
```demo
basic
size
disabled-time
format
```

## Props
|Name|Type|Default|Description|
|-|-|-|-|
|clearable|`boolean`|`false`||
|disabled|`boolean`|`false`||
|format|`string`|`'HH:mm:ss'`||
|is-hour-disabled|`(hour: number) => boolean`|`() => false`||
|is-minute-disabled|`(minute: number, hour: number) => boolean`|`() => false`||
|is-second-disabled|`(second: number, minute: number, hour: number) => boolean`|`() => false`||
|placeholder|`string`|`'Select Time'`||
|size|`'small' \| 'medium' \| 'large'`|`'medium'`||
|theme|`'light' \| 'dark' \| string`|`undefined`||
|value|`number`|`null`||
|on-blur|`() => any`|`undefined`||
|on-focus|`() => any`|`undefined`||
|on-update:value|`(value: number \| null) => any`|`undefined`||
