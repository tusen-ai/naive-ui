# 级联选择 Cascader
用来选一些树型信息。
## 演示
```demo
single
multiple
single-lazy
multiple-lazy
```
size

## Props
|名称|类型|默认值|说明|
|-|-|-|-|
|theme|`'light' \| 'dark' \| null \| string`|`null`||
|options|`Array<CascaderOption>`|`null`||
|value|`string \| number`|`null`||
|placeholder|`string`|`'请选择'`||
|multiple|`boolean`|`false`||
|size|`'small' \| 'medium' \| 'large'`|`'medium'`||
|filterable|`boolean`|`false`|不能和 `remote` 同时为 `true`|
|disabled|`boolean`|`false`||
|expand-trigger|`'click' \| 'hover'`|`'click'`|在 remote 为 `true` 时不可设为 `'hover'`|
|leaf-only|`boolean`|`false`||
|clearable|`boolean`|`false`||
|remote|`boolean`|`false`||
|on-load|`(option: CascaderOption) => Promise<any>`|`undefined`|在点击未加载完成节点时的回调，在回调中设定 `option.children`，在返回的 promise resolve 或 reject 之后加载完成|
|separator|`string`|`' / '`||
|filter|`(pattern: string, option: CascaderOption, path: Array<CascaderOption>) => boolean`|一个基于字符串的过滤算法||
|on-focus|`() => any`|`undefined`||
|on-blur|`() => any`|`undefined`||
|on-update:value|`(value: string \| number \| Array<string \| number>) => any`|`undefined`||
