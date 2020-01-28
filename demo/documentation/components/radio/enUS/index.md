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
### Radio
|Prop|Event|
|-|-|
|checked-value|change|

### Radio Group
|Prop|Event|
|-|-|
|value|change|

## Props
### Radio
|Name|Type|Default|Description|
|-|-|-|-|
|checked-value|`string \| number \| boolean`|`null`||
|value|`string \| number \| boolean`|`null`||
|disabled|`boolean`|`false`||

### Radio Button
|Name|Type|Default|Description|
|-|-|-|-|
|checked-value|`string \| number \| boolean`|`null`||
|value|`string \| number \| boolean`|`null`||
|disabled|`boolean`|`false`||

### Radio Group
|Name|Type|Default|Description|
|-|-|-|-|
|size|`'small' \| 'medium' \| 'large'`|`small`||
|value|`string \| number \| boolean`|`null`||
|disabled|`boolean`|`false`||

## Events
### Radio, Radio Button
|Name|Parameters|Description|
|-|-|-|
|change|(value)||

### Radio Group
|Name|Parameters|Description|
|-|-|-|
|change|(value)||
