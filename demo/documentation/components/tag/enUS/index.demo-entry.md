# Tag
Always it's for showing attribute. Sometimes it's for toggle options.
## Demos
```demo
basic
closable
disabled
size
checkable
shape
dynamic-tags
```

## Props
### Tag
|Name|Type|Default|Description|
|-|-|-|-|
|checkable|`boolean`|`false`||
|checked|`boolean`|`false`||
|closable|`boolean`|`false`||
|disabled|`boolean`|`false`||
|round|`boolean`|`false`||
|size|`'small' \| 'medium' \| 'large'`|`'medium'`||
|theme|`'light' \| 'dark'  \| string`|`undefined`||
|type|`'default' \| 'info' \| 'success' \| 'warning' \| 'error'`|`'default'`||
|on-update:checked|`(value: boolean) => any`|`undefined`||

### DynamicTags
|Name|Type|Default|Description|
|-|-|-|-|
|closable|`boolean`|`false`||
|disabled|`boolean`|`false`||
|input-style|`Object`|`{ width: '50px' }`||
|round|`boolean`|`false`||
|size|`'small' \| 'medium' \| 'large'`|`'medium'`||
|tag-style|`Object`|`{ marginRight: '5px', marginBottom: '5px' }`||
|theme|`'light' \| 'dark'  \| string`|`undefined`||
|type|`'default' \| 'info' \| 'success' \| 'warning' \| 'error'`|`'default'`||
|value|`Array<string>`|`[]`||
|on-update:value|`(value: boolean) => any`|`undefined`||

## Slots
### Tag
|Name|Parameters|Description|
|-|-|-|
|default|`()`||
