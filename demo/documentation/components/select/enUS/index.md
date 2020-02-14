# Select
Select something!
## Demo
```demo
basic
size
multiple
events
filterable
remote
remote-multiple
clearable
scroll-event
group
many-options
custom-option
action
```
## V-model
|prop|event|
|-|-|
|value|change|

## Props
|Name|Type|Default|Description|
|-|-|-|-|
|loading|`boolean`|`false`||
|clearable|`boolean`|`false`||
|value|`Array \| string \| number`|`false`||
|placeholder|`string`|`'Please Select'`||
|multiple|`boolean`|`false`||
|size|`'small' \| 'medium' \| 'large'`|`'medium'`||
|disabled|`boolean`|`false`||
|options|`Array<SelectOption \| SelectOptionGroup>`|`[]`||
|remote|`boolean`|`false`|If you want to async get options|
|filter|`(pattern: string, option: Object) => boolean`|`null`||

## API
### SelectOption Type
|Property|Type|Description|
|-|-|-|
|label|`string`||
|value|`string \| number`|Should be unique in options.|
|disabled|`boolean`||
|render|`function`||

### SelectOptionGroup Type
|Property|Type|Description|
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

