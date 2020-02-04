# 级联选择 Cascader
用来选一些树型信息。
## 演示
```demo
single-leaf-only
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
|名称|类型|默认值|介绍|
|-|-|-|-|
|options|`Array<CascaderOption>`|`null`||
|value|`string \| number`|Value should be unique in options.|
|placeholder|`string`|`Please Select`||
|multiple|`boolean`|`false`||
|size|`'small' \| 'medium' \| 'large'`|`'medium'`||
|filterable|`boolean`|`false`|Can't be `true` with `remote` prop at same time.|
|disabled|`boolean`|`false`||
|expand-trigger|`'click' \| 'hover'`|`'click'`||
|leaf-only|`boolean`|`true`||
|clearable|`boolean`|`false`||
|remote|`boolean`|`false`||
|on-load|`(option: CascaderOption, resolve: (children: Array<CascaderOption>): void) : {}`|`() => {}`|Callback when click at unloaded nodes. Pass resolved children to `resolve` function to set children of the node.|
|splitor|`string`|`'/'`||
|filter|`(pattern: string, option: CascaderOption, path: Array<CascaderOption>) : boolean`|A string based filter.||

## Events
|名称|参数|介绍|
|-|-|-|
|change|`(value: string \| number \| Array<string \| number>)`
