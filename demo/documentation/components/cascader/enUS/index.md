# Cascader
Cascader can be used to select some tree structured data.
## Demos
```demo
single-leaf-only
size
trigger
multiple-leaf-only
single
multiple
single-leaf-only-search
multiple-leaf-only-search
single-search
multiple-search
single-leaf-only-lazy
multiple-leaf-only-lazy
single-lazy
multiple-lazy
filter
```
## V-model
|Prop|Event|
|-|-|
|value|change|

## Props
|Name|Type|Default|Description|
|-|-|-|-|
|theme|`'light' \| 'dark' \| null`|`null`||
|options|`Array<CascaderOption>`|`null`||
|value|`string \| number`|`null`||
|placeholder|`string`|`'Please Select'`||
|multiple|`boolean`|`false`||
|size|`'small' \| 'medium' \| 'large'`|`'medium'`||
|filterable|`boolean`|`false`|Can't be `true` with `remote` prop at same time.|
|disabled|`boolean`|`false`||
|expand-trigger|`'click' \| 'hover'`|`'click'`||
|leaf-only|`boolean`|`true`||
|clearable|`boolean`|`false`||
|remote|`boolean`|`false`||
|on-load|`(option: CascaderOption, resolve: (children: Array<CascaderOption>) => void) => any`|`() => {}`|Callback when click at unloaded nodes. Pass resolved children to `resolve` function to set children of the node.|
|seperator|`string`|`'/'`||
|filter|`(pattern: string, option: CascaderOption, path: Array<CascaderOption>) => boolean`|A string based filter.||

## Events
|Name|Parameters|Description|
|-|-|-|
|change|`(value: string \| number \| Array<string \| number>)`||
|blur|`()`||