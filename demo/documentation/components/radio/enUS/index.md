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
## V-model
### Radio V-model
|Prop|Event|
|-|-|
|checked-value|change|

### Radio Group V-model
|Prop|Event|
|-|-|
|value|change|

## Props
### Radio Props
|Name|Type|Default|Description|
|-|-|-|-|
|theme|`'light' \| 'dark'`|`null`||
|name|`string`|`undefined`|The name attribute of the radio element. If not set, name of `radio-group` will be used.|
|checked-value|`string \| number \| boolean`|`null`||
|value|`string \| number \| boolean`|`null`||
|disabled|`boolean`|`false`||

### Radio Button Props
|Name|Type|Default|Description|
|-|-|-|-|
|name|`string`|`undefined`|The name attribute of the radio element. If not set, name of `radio-group` will be used.|
|checked-value|`string \| number \| boolean`|`null`||
|value|`string \| number \| boolean`|`null`||
|disabled|`boolean`|`false`||

### Radio Group Props
|Name|Type|Default|Description|
|-|-|-|-|
|theme|`'light' \| 'dark'`|`null`||
|name|`string`|`null`|The name attribute of the radio elements inside the group.|
|size|`'small' \| 'medium' \| 'large'`|`small`||
|value|`string \| number \| boolean`|`null`||
|disabled|`boolean`|`false`||
|size|`'small' \| 'medium' \| 'large'`|`'small'`||

## Events
### Radio, Radio Button Events
|Name|Parameters|Description|
|-|-|-|
|change|`(checkedValue: string \| number \| boolean)`||

### Radio Group Events
|Name|Parameters|Description|
|-|-|-|
|change|`(checkedValue: string \| number \| boolean)`||
