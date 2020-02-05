# Radio
<!--single-column-->
When I was young, I was fond of listening to the radio, such as FM 106.8 or FM 92.1.
## Demos
```demo
basic
group
button-group
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
|checked-value|`string \| number \| boolean`|`null`||
|value|`string \| number \| boolean`|`null`||
|disabled|`boolean`|`false`||

### Radio Button Props
|Name|Type|Default|Description|
|-|-|-|-|
|checked-value|`string \| number \| boolean`|`null`||
|value|`string \| number \| boolean`|`null`||
|disabled|`boolean`|`false`||

### Radio Group Props
|Name|Type|Default|Description|
|-|-|-|-|
|size|`'small' \| 'medium' \| 'large'`|`small`||
|value|`string \| number \| boolean`|`null`||
|disabled|`boolean`|`false`||

## Events
### Radio, Radio Button Events
|Name|Parameters|Description|
|-|-|-|
|change|`(checkedValue: string \| number \| boolean)`||

### Radio Group Events
|Name|Parameters|Description|
|-|-|-|
|change|`(checkedValue: string \| number \| boolean)`||
