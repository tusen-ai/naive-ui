# Cascader
Cascader can be used to select some tree structured data.

## Demos
```demo
single
multiple
size
single-lazy
multiple-lazy
```

## Props
|Name|Type|Default|Description|
|-|-|-|-|
|cascade|`boolean`|`true`|Whether to cascade checkbox when multiple.|
|clearable|`boolean`|`false`||
|disabled|`boolean`|`false`||
|expand-trigger|`'click' \| 'hover'`|`'click'`|If `remote` is set, `'hover'` won't work.|
|filterable|`boolean`|`false`|If `remote` is set, it won't work.|
|filter|`(pattern: string, option: CascaderOption, path: Array<CascaderOption>) => boolean`|A string based filter algorithm.||
|leaf-only|`boolean`|`false`|If only allow value of leaf node to be in `value`.|
|multiple|`boolean`|`false`||
|options|`Array<CascaderOption>`|required||
|placeholder|`string`|`'Please Select'`||
|remote|`boolean`|`false`||
|separator|`string`|`' / '`||
|show-path|`boolean`|`true`|Whether to show path in selector.|
|size|`'small' \| 'medium' \| 'large'`|`'medium'`||
|theme|`'light' \| 'dark'  \| string`|`undefined`||
|value|`string \| number \| Array<number \| string>`|`null`||
|on-blur|`() => any`|`undefined`||
|on-focus|`() => any`|`undefined`|
|on-load|`(option: CascaderOption) => Promise<any>`|`undefined`|Callback when click unloaded node. Set `option.children` in the returned promise. Loading is end after the promise is resolved or rejected.|
|on-update:value|`(value: string \| number \| Array<string \| number>) => any`|`undefined`||
