# Time Picker
Like a digital clock.
## Demos
```demo
basic
size
disabledTime
format
```
## V-model
|prop|event|
|-|-|
|value|change|

## Props
|Name|Type|Default|Description|
|-|-|-|-|
|theme|`'light' \| 'dark' \| null`|`null`||
|placeholder|`string`|`'Select Time'`||
|value|`number`|`null`||
|format|`string`|`'HH:mm:ss'`||
|is-hour-disabled|`(hour: number) => boolean`|`() => false`||
|is-minute-disabled|`(minute: number, hour: number) => boolean`|`() => false`||
|is-second-disabled|`(second: number, minute: number, hour: number) => boolean`|`() => false`||
|size|`'small' \| 'medium' \| 'large'`|`'medium'`||

## Events
|Name|Parameters|Description|
|-|-|-|
|change|`(value: number \| null)`||
|blur|`(value: number \| null)`||