# Menu
<!--single-column-->
No Food.
## Demos
```demo
horizontal
defaultOpenNames
indent
collapse
```

## V-model
|Prop|Event|
|-|-|
|value|select|

## Props
### Menu Props
|Name|Type|Default|Description|
|-|-|-|-|
|collapsed|`boolean`|`false`|The collapsed status of menu, only works when menu is vertical.|
|collapsed-width|`number`|`null`|The menu width after collapsed.|
|icon-size|`number`|`20`|The icon size when menu is not collapsed.|
|collapsed-icon-size|`number`|`null`|The icon size when menu is collapsed. If not set, menu will use `icon-size` in place of it.|
|overlay-width|`number`|`null`|The width of submenu popover. Works when menu is horizontal or collapsed.|
|overlay-min-width|`number`|`180`|The min width of submenu popover. Works when menu is horizontal or collapsed.|
|root-indent|`number`|`null`|The indent of menu's first level children. If not set, menu will use `indent` in place of it.|
|indent|`number`|`32`|The indend of menu|
|default-open-names|`Array<string>`|`[]`|The default expanded submenu names of menu in uncontrolled manner.|
|openNames|`Array<string>`|`undefined`|The expanded submenu names. If set, menu will work in controlled manner and `default-open-names` won't work.|
|value|`string`|`null`|The selected name of menu.|
|mode|`'vertical' \| 'horizontal'`|`'vertical'`||

### Menu Item Props
|Name|Type|Default|Description|
|-|-|-|-|
|title|`string`|`null`||
|title-extra|`string`|`null`||
|name|`string`||The indentifier of the menu item. **required**|
|disabled|`boolean`|||

### Submenu Props
|Name|Type|Default|Description|
|-|-|-|-|
|title|`string`|`null`||
|title-extra|`string`|`null`||
|name|`string`||The indentifier of the submenu. **required**|
|disabled|`boolean`|||

### Menu Item Group Props
|Name|Type|Default|Description|
|-|-|-|-|
|title|`string`|`null`||

## Slots
### Menu Slots
|Name|Parameters|Description|
|-|-|-|
|default|`()`||

### Menu Item Slots
|Name|Parameters|Description|
|-|-|-|
|default|`()`||
|extra|`()`|Meta info near title|
|icon|`()`||

### Submenu Slots
|Name|Parameters|Description|
|-|-|-|
|default|`()`||
|header|`()`||
|header-extra|`()`||
|icon|`()`||

### Menu Item Group Slots
|Name|Parameters|Description|
|-|-|-|
|default|`()`||
|header|`()`||

## Events
### Menu Events
|Name|Parameters|Description|
|-|-|-|
|select|`(selectedName: string)`||
|open-names-change|`(openNames: Array<string>)`||

