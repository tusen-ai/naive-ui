# Time Picker
Like a digital clock.
## Demos
```demo
basic
disabledTime
```
## V-model
|prop|event|
|-|-|
|value|change|

## Props
|Name|Type|Default|Description|
|-|-|-|-|
|placeholder|`string`|`null`||
|value|`number`|`null`||
|is-hour-disabled|`(hour: number) => boolean`|`() => false`||
|is-minute-disabled|`(minute: number, hour: number) => boolean`|`() => false`||
|is-second-disabled|`(second: number, minute: number, hour: number) => boolean`|`() => false`||

## Events
|Name|Parameters|Description|
|-|-|-|
|change|(value)||
|blur|(value)||