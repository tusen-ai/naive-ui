# Time Picker
Like a digital clock.
## Demos
```demo
basic
size
disabled-time
format
```
## V-model
|prop|event|
|-|-|
|value|change|

## Props
|Name|Type|Default|Description|
|-|-|-|-|
|clearable|`boolean`|`false`||
|format|`string`|`'HH:mm:ss'`||
|is-hour-disabled|`(hour: number) => boolean`|`() => false`||
|is-minute-disabled|`(minute: number, hour: number) => boolean`|`() => false`||
|is-second-disabled|`(second: number, minute: number, hour: number) => boolean`|`() => false`||
|placeholder|`string`|`'Select Time'`||
|size|`'small' \| 'medium' \| 'large'`|`'medium'`||
|theme|`'light' \| 'dark' \| null`|`null`||
|value|`number`|`null`||
|disabled|`boolean`|`false`||


## Events
|Name|Parameters|Description|
|-|-|-|
|blur|`(value: number \| null)`||
|change|`(value: number \| null)`||