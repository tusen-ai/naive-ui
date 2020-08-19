# 菜单 Menu
没有吃的。
<!--single-column-->
## 演示
```demo
horizontal
defaultExpandedNames
indent
collapse
```

## V-model
|Prop|Event|
|-|-|
|value|select|

## Props
### Menu Props
|名称|类型|默认值|说明|
|-|-|-|-|
|collapsed|`boolean`|`false`|菜单是否折叠，值在菜单为垂直时有用|
|collapsed-icon-size|`number`|`null`|菜单折叠时图标的大小，如果为设定则使用 `icon-size` 代替|
|collapsed-width|`number`|`null`|折叠后菜单的宽度|
|default-expanded-names|`Array<string>`|`[]`|在非受控状态下默认展开的子菜单标识符数组|
|expandedNames|`Array<string>`|`undefined`|展开的子菜单标识符数组，如果设定了，菜单的展开将会进入受控状态，`default-expanded-names` 不会生效|
|icon-size|`number`|`20`|菜单未折叠时图标的大小|
|indent|`number`|`32`|菜单每级的缩进|
|mode|`'vertical' \| 'horizontal'`|`'vertical'`||
|overlay-width|`number \| string`|`null`|弹出子菜单的宽度，只在菜单为水平或者折叠时生效|
|overlay-min-width|`number \| string`|`180`|弹出子菜单的最小宽度，只在菜单为水平或者折叠时生效|
|root-indent|`number`|`null`|菜单第一级的缩进，如果没有设定，使用 `indent` 代替|
|theme|`'light' \| 'dark' \| null`|`null`||
|value|`string`|`null`|菜单当前的选中值|

### MenuItem Properties
|名称|类型|说明|
|-|-|-|
|disabled|`boolean`||
|icon|`(h: createElement) => VNode`||
|name|`string`|菜单项的标识符，**必需**|
|title|`string`||
|title-extra|`string`||

### Submenu Properties
|名称|类型|说明|
|-|-|-|
|children|`Array<MenuItem \| Submenu \| MenuItemGroup>`|**必需**|
|disabled|`boolean`||
|icon|`(h: createElement) => VNode`||
|name|`string`|菜单项的标识符，**必需**|
|title|`string`||
|title-extra|`string`||
|type|`'submenu'`|**必需**|

### MenuItemGroup Properties
|名称|类型|说明|
|-|-|-|
|children|`Array<MenuItem \| Submenu \| MenuItemGroup>`|**必需**|
|title|`string`||
|type|`'group'`|**必需**|

## Events
### Menu Events
|名称|参数|说明|
|-|-|-|
|expanded-names-change|`(expandedNames: Array<string>)`||
|select|`(selectedName: string)`||

