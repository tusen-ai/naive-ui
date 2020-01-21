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
## API
### V-model
|prop|event|
|-|-|
|value|change|

### Props
|Name|Type|Default|Description|
|-|-|-|-|
|loading|`boolean`|`false`||
|clearable|`boolean`|`false`||
|value|`Array \| string \| number`|`false`||
|placeholder||||
|multiple|`boolean`|`false`||
|size|`'small' \| 'medium' \| 'large'`|`'medium'`||
|disabled|`boolean`|`false`||
|options|`Array`|`[]`||
|remote|`boolearn`|`false`|If you want to async get options|
|filter|`(pattern: string, option: Object) => boolean`|`null`||

### Slots
|Name|Description|
|-|-|
|empty||

### Event
|Name|Parameter|Description|
|-|-|-|
|change|`(value: Array \| string \| number \| null)`||
|search|`(value: string)`||
|blur|`()`|When picker of select blur|
|scroll|`(e: Event)`|When select menu scrolls|

