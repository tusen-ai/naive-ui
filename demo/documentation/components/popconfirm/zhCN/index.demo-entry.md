# 弹出确认 Popconfirm
一个确认，弹出来的。

## 演示
```demo
basic
custom-action
custom-icon
event
no-icon
```

## Props
|名称|类型|默认值|说明|
|-|-|-|-|
|negative-text|`string`|`'取消'`||
|positive-text|`string`|`'确认'`||
|show-icon|`boolean`|`true`||
|on-positive-click|`() => boolean \| Promise<boolean> \| any`|`undefined`||
|on-negative-click|`() => boolean \| Promise<boolean> \| any`|`undefined`||

更多 props 请参考 [Popover](n-popover#Props).

## Slots
|名称|参数|说明|
|-|-|-|
|action|`()`||
|default|`()`||
|icon|`()`||