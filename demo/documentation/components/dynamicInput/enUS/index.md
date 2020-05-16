# Dynamic Input
<!--single-column-->
This component's name has been changed many times.

In the beginning, it was created for inputing environment variables.
## Demos
```demo
basic
pair
custom
form
```

## V-model
|Prop|Event|
|-|-|
|value|input|

## Props
### Dynamic Input Props
|Name|Type|Default|Description|
|-|-|-|-|
|preset|`'input' \| 'preset'`|`'input'`|The preset of `n-dynamic-input`, it work when `$scopedSlots.default` is not set.|
|value|`Array`|-|**required**|
|max|`number`|`null`|Max number of items.|
|key-field|`string`|`null`||
|on-create|`(index: number) => any`|`null`|The callback when click at the add button. If set, the return value will be used as the initial value of the new item. `index` is the the new item's corresponding index in the value array, which starts from 1 (the second item).|
|on-clear|`() => any`|`null`|The callback when clear the last one item. If set, the return value will be used as the value after the last item is cleared. If item content item is custom and `on-clear` is not set, the last item will not be allowed to be cleared.|

### Dynamic Input Props (Input Preset)
|Name|Type|Default|Description|
|-|-|-|-|
|value|`Array<string>`|-|**required**|
|placeholder|`string`|`''`||

### Dynamic Input Props (Pair Preset)
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
|create|`(index: number)`|`index` is the index of the new item.|
|clear|`()`||
|remove|`(index: number)`|`index` is the index of the removed item.| 