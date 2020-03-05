# Input
Many years ago, people used punched card to input.
## Demos
```demo
basic
size
round
icon
password
disabled
clearable
autosize
pair
input-group
passively-activated
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
|pair|`boolean`|`false`|Whether to input pairwise value.|
|value|`string \| [string, string]`|`null`|Value of input. When `pair` is `true`, `value` is an array.|
|disabled|`boolean`|`false`||
|size|`'small' \| 'medium' \| 'large'`|`'medium'`||
|rows|`number`|`3`||
|round|`boolean`|`false`||
|minlength|`number`|`null`||
|maxlength|`number`|`null`||
|clearable|`boolean`|`false`||
|autosize|`boolean \| { minRows?: number, maxRows?: number }`|`false`||
|readonly|`boolean`|`false`||
|seperator|`string`|`null`|The seperator bewteen pairwise inputs.|
|placeholder|`string \| [string, string]`|`null`|Placeholder of input. When `pair` is `true`, placeholder is an array.|

## Slots
### Input Slots
|Name|Parameters|Description|
|-|-|-|
|prefix|`()`||
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
|input|`(value: string \| [string, string])`||
|change|`(value: string \| [string, string])`||
|blur|`()`||
|focus|`()`||
|clear|`()`||
