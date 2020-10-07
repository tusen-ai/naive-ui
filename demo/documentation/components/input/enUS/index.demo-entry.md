# Input
Many years ago, people used punched card to input.

<n-alert title="Caveat" type="warning">`n-input` is a controlled component. If you don't handle with its `input` event, its value will never be changed. (v-model doesn't matter, since it is an abbreviation for controlled data-bindings)</n-alert>
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

## Props
### Input Props
|Name|Type|Default|Description|
|-|-|-|-|
|theme|`'light' \| 'dark' \| null \| string`|`null`||
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
|separator|`string`|`null`|The separator bewteen pairwise inputs.|
|placeholder|`string \| [string, string]`|`null`|Placeholder of input. When `pair` is `true`, placeholder is an array.|
|passively-activated|`boolean`|`false`||
|autofocus|`boolean`|`false`||

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
|update:value|`(value: string \| [string, string])`||
|change|`(value: string \| [string, string])`||
|blur|`()`||
|focus|`()`||
|clear|`()`||
