# Checkbox
Yo, yo, check it out.
## Demos
```demo
basic
group
grid
indeterminate
controlled
event
```
## V-model
### Checkbox V-model
|Prop|Event|
|-|-|
|change|checked|

### Checkbox Group V-model
|Prop|Event|
|-|-|
|change|value|

## Props
### Checkbox Props
|Name|Type|Default|Description|
|-|-|-|-|
|theme|`'light' \| 'dark' \| null \| string`|`null`||
|value|`string \| number`|`null`||
|checked|`boolean`|`false`||
|disabled|`boolean`|`false`||
|label|`string \| function`|`null`|Could be a render function.|

### Checkbox Group Props
|Name|Type|Default|Description|
|-|-|-|-|
|theme|`'light' \| 'dark' \| null \| string`|`null`||
|value|`Array<string \| number>`|`null`||
|disabled|`boolean`|`false`||

## Slots
### Checkbox Slots

<n-alert title="Caveat" type="warning" style="margin-bottom: 16px">
  Don't use the slot in a massive checkbox group. Since it will cause re-rendering of all the checkboxes everytime when the group value changes. In that case you may use <n-text code>label</n-text> prop instead.
</n-alert>

|Name|Parameters|Description|
|-|-|-|
|default|`()`||

### Checkbox Group Slots
|Name|Parameters|Description|
|-|-|-|
|default|`()`||

## Events
### Checkbox Events
|Name|Parameters|Description|
|-|-|-|
|change|`(checked: boolean)`||

### Checkbox Group Events
|Name|Paramaters|Description|
|-|-|-|
|change|`(value: string \| number)`||