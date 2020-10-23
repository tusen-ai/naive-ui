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

## Props
### Radio Props, RadioButton Props
|Name|Type|Default|Description|
|-|-|-|-|
|checked-value|`string \| number \| boolean`|`null`||
|disabled|`boolean`|`false`||
|name|`string`|`undefined`|The name attribute of the radio element. If not set, name of `radio-group` will be used.|
|theme|`'light' \| 'dark'  \| string`|`undefined`||
|value|`string \| number \| boolean`|required||
|on-update:checked-value|`(checkedValue: string \| number \| boolean) => any`|`undefined`||

### RadioGroup Props
|Name|Type|Default|Description|
|-|-|-|-|
|disabled|`boolean`|`false`||
|name|`string`|`undefined`|The name attribute of the radio elements inside the group.|
|size|`'small' \| 'medium' \| 'large'`|`'small'`||
|size|`'small' \| 'medium' \| 'large'`|`small`||
|theme|`'light' \| 'dark'  \| string`|`undefined`||
|value|`string \| number \| boolean`|`null`||
|on-update:value|`(checkedValue: string \| number \| boolean) => any`|`undefined`||