# Input Number
If you want just input number, use it.
## Demos
```demo
basic
disabled
event
min-max
size
step
validator
```
## V-model
|Prop|Event|
|-|-|
|value|change|

## Props
|Name|Type|Default|Description|
|-|-|-|-|
|value|`number`|`null`||
|step|`number`|`1`||
|min|`number`|`null`||
|max|`number`|`null`||
|size|`'small' \| 'medium' \| 'large'`|`medium`||
|disabled|`boolean`|`false`||
|validator|`(value) => boolean`|`null`||
|placeholder|`string`|`null`||

## Events
|Name|Parameters|Description|
|-|-|-|
|change|`(value: number)`||
|blur|`(value: number \| null)`||