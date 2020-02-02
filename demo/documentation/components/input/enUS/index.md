# Input
Many years ago, people used punched card to input.
## Demos
```demo
basic
size
round
icon
password
event
disabled
clearable
autosize
split
lazy-focus
```
## V-model
|Prop|Event|
|-|-|
|value|input|

## Props
|Name|Type|Default|Description|
|-|-|-|-|
|type|`'text' \| 'password' \| 'textarea'`|`'text'`||
|value|`string \| [string \| null, string \| null]`|`null`||
|disabled|`boolean`|`false`||
|size|`'small' \| 'medium' \| 'large'`|`'medium'`||
|rows|`number`|`3`||
|round|`boolean`|`false`||
|minlength|`number`|`null`||
|maxlength|`number`|`null`||
|clearable|`boolean`|`false`||
|autosize|`boolean \| { minRows: number \| undefined, maxRows: number \| undefined }`|`false`||
|pair|`boolean`|`false`||
|seperator|`string`|`null`||
|readonly|`boolean`|`false`||

## Slots
|Name|Parameters|Description|
|-|-|-|
|affix|`()`||
|suffix|`()`||

## Events
|Name|Parameters|Description|
|-|-|-|
|input|`(value: string)`||
|change|`(value: string)`||
|blur|`()`||
|focus|`()`||
