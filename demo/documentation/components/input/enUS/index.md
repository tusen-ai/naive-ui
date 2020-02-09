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
input-group
```
## V-model
|Prop|Event|
|-|-|
|value|input|

## Props
### Input Props
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
|autosize|`boolean \| { minRows?: number, maxRows?: number }`|`false`||
|readonly|`boolean`|`false`||
|placeholder|`string`|`null`||

## Slots
### Input Slots
|Name|Parameters|Description|
|-|-|-|
|affix|`()`||
|suffix|`()`||

### Input Group Slots
|Name|Parameters|Description|
|-|-|-|
|default|`()`||

### Input Group Label Slots
|Name|Parameters|Description|
|-|-|-|
|default|`()`||

## Events
### Input Events
|Name|Parameters|Description|
|-|-|-|
|input|`(value: string)`||
|change|`(value: string)`||
|blur|`()`||
|focus|`()`||
