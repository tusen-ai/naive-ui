# Select
Select something!
## Demo
```demo
basic
size
multiple
events
filterable
tag
remote
remote-multiple
clearable
scroll-event
group
many-options
custom-option
action
fallback-option
```
## V-model
|prop|event|
|-|-|
|value|change|

## Props
|Name|Type|Default|Description|
|-|-|-|-|
|theme|`'light' \| 'dark'`|`null`||
|loading|`boolean`|`false`||
|clearable|`boolean`|`false`||
|value|`Array<string \| number> \| string \| number`|`false`||
|placeholder|`string`|`'Please Select'`||
|multiple|`boolean`|`false`||
|size|`'small' \| 'medium' \| 'large'`|`'medium'`||
|disabled|`boolean`|`false`||
|options|`Array<SelectOption \| SelectOptionGroup>`|`[]`||
|remote|`boolean`|`false`|If you want to async get options. Note that if remote is set, `filter` & `tag` won't work on `options`. At that time, you are taking all control of `options`.|
|filterable|`boolean`|`false`|Whether it can filter options.|
|filter|`(pattern: string, option: Object) => boolean`|A basic string based search method.||
|tag|`boolean`|`false`|Whether it can create new option, should be used with `filterable`.|
|on-create|`(label: string) => SelectOption`|`label => ({ label, value: label })`|How to create a option when you input a string to create a option. Note that `filter` will be applied to the created option too. And make sure the value of the created option is not the same as any other option.|
|fallback-option|`false \| (value: string \| number) => SelectOption`|`value => ({ label: '' + value, value })`|The option to be created according the value which has no corresponding option in the options of the component. If set to `false`, the fallback option won't be created and displayed and the value has no corresponding option will be viewed as a invalid value and it will be removed in the operations of the component.|

### SelectOption Properties
|Name|Type|Description|
|-|-|-|
|label|`string`||
|value|`string \| number`|Should be unique in options.|
|disabled|`boolean`||
|render|`function`||

### SelectOptionGroup Properties
|Name|Type|Description|
|-|-|-|
|type|`'group'`||
|name|`string`||
|children|`Array<SelectOption>`||

## Slots
|Name|Parameters|Description|
|-|-|-|
|action|`()`||

## Event
|Name|Parameters|Description|
|-|-|-|
|change|`(value: Array \| string \| number \| null)`||
|search|`(value: string)`||
|blur|`()`|When picker of select blur|
|scroll|`(e: Event)`|When select menu scrolls|

