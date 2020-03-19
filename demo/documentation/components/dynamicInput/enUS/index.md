# Dynamic Input
<!--single-column-->
This component name has been changed many times.

Innitially, it was created for input environment variables.
## 演示
```demo
basic
pair
custom
form
```
## Props
### Dynamic Input Props
|Name|Type|Default|Description|
|-|-|-|-|
|preset|`'input' \| 'preset'`|`'input'`|The preset for dynamicInput, it work when `$scopedSlots.default` is not set.|
|value|`Array`|-|**required**|
|max|`number`|`null`|Max number of items.|
|key-field|`string`|`null`||
|on-create|`(index: number) => any`|`null`|The callback when click the add button. If set, the return value will be used as the initial value for the new item. `index` is the number of the new item, counting from 0 (the second item) .|
|on-clear|`() => any`|`null`|The callback when clear the last item. If set, the return value will be used as the value after the last item is cleared. If it is a custom content and no return value is set, the last item is not allowed to be cleared. Delete button is not clickable|

### Dynamic Input Props(Input Preset)
|Name|Type|Default|Description|
|-|-|-|-|
|value|`Array<string>`|-|**required**|
|placeholder|`string`|`''`||

### Dynamic Input Props(Pair Preset)
|Name|Type|Default|Description|
|-|-|-|-|
|value|`Array<{ key: string, value: string }>`|-|**required**|
|key-placeholder|`string`|`''`||
|value-placeholder|`string`|`''`||

## Slots
|Name|Parameters|Description|
|-|-|-|
|default|`({ value: any, index: number })`|The content of each item, `value` is the value of current item, `index` is the index of the current item.|

## Events
|Name|Parameters|Description|
|-|-|-|
|create|`(index: Number)`|`index` is the index of the new item.|
|clear|`()`||
|remove|`(index: Number)`|`index` is the index of the removed item.| 