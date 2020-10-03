# 下拉菜单 Dropdown
当你想触发一些操作的时候。

## 演示
```demo
basic
trigger
cascade
placement
size
```

## Props
|名称|类型|默认值|说明|
|-|-|-|-|
|size|`'small'\|'medium'\|'large'\|'huge'`|`'medium'`||
|options|`Array<DropdownOption \| DropdownDivider \| DropdownSubmenu>`|`[]`||
|keyboard|`boolean`|`true`|是否支持键盘操作（注意和其他内容键盘操作可能的冲突）|
|on-select|`(key: string \| number) => any`|`undefined`||

对于其他 Props，参考 [Popover Props](n-popover#Props)。注意 `arrow`, `raw` 属性不可用。

### DropdownOption Type
|属性|类型|说明|
|-|-|-|
|label|`string`||
|key|`string \| number`|需要唯一|
|icon|`() => VNode`||

### DropdownDivider Type
|属性|类型|说明|
|-|-|-|
|type|`'divider'`||

### DropdownSubmenu Type
|属性|类型|说明|
|-|-|-|
|type|`'submenu'`||
|label|`string`||
|icon|`() => VNode`||
|key|`string \| number`|需要唯一|
|children|`Array<DropdownOption \| DropdownDivider \| DropdownSubmenu>`||
