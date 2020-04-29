# Collapse
I saw it appears in many side control panels.
## Demos
```demo
basic
arrow-placement
accordion
nested
item-header-click
```
## V-model
|Prop|Event|
|-|-|
|expanded-names|expanded-names-change|

## Props
### Collapse
|Name|Type|Default|Description|
|-|-|-|-|
|accordion|`boolean`|`false`||
|arrow-placement|`'left' \| 'right'`|`'left'`||
|expanded-names|`Array<string \| number>`|`null`||
|theme|`'light' \| 'dark'`|`null`||


### Collapse Item
|Name|Type|Default|Description|
|-|-|-|-|
|title|`string`|`null`||
|name|`string \| number`||**required**|

## Slots
### Collapse Slots
|Name|Parameters|Description|
|-|-|-|
|default|`()`||

### Collapse Item Slots
|Name|Parameters|Description|
|-|-|-|
|default|`()`||
|header|`()`||
|arrow|`({ collapsed: boolean })`||

## Event
### Collapse Event
|Name|Parameters|Description|
|-|-|-|
|expanded-names-change|`(expandedNames: Array<string>)`||
|item-header-click|`({ name: string, expanded: boolean, event: MouseEvent })`||