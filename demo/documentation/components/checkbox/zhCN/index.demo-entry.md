# 复选框 Checkbox
哟，哟，Check it out。
## 演示
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
|名称|类型|默认值|说明|
|-|-|-|-|
|theme|`'light' \| 'dark' \| null`|`null`||
|value|`string \| number`|`null`||
|checked|`boolean`|`false`||
|disabled|`boolean`|`false`||
|label|`string \| function`|`null`|可以是渲染函数|

### Checkbox Group Props
|名称|类型|默认值|说明|
|-|-|-|-|
|theme|`'light' \| 'dark' \| null`|`null`||
|value|`Array<string \| number>`|`null`||
|disabled|`boolean`|`false`||

## Slots
### Checkbox Slots

<n-alert title="Caveat" type="warning" style="margin-bottom: 16px">
	不要在一个巨量的选项组中使用 Checkbox 的 slot，因为它会导致每次选项组值变更的时候对每个 Checkbox 做一次重新渲染。在这种情况下你可以使用 <n-text code>label</n-text> 属性来替代。
</n-alert>


|名称|参数|说明|
|-|-|-|
|default|`()`||

### Checkbox Group Slots
|名称|参数|说明|
|-|-|-|
|default|`()`||

## Events
### Checkbox Events
|名称|参数|说明|
|-|-|-|
|change|`(checked: boolean)`||

### Checkbox Group Events
|名称|参数|说明|
|-|-|-|
|change|`(value: string \| number)`||