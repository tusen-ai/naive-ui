# Tabs
Switch contents in same area.
## Demos
```demo
basic
flex-label
card
display-directive
```
## V-model
V-model is not exposed now.
## Props
### Tabs Props
|Name|Type|Default|Description|
|-|-|-|-|
|type|`'line' \| 'card'`|`'line'`||
|closable|`boolean`|`false`||
|justify-content|`'space-between' \| 'space-around' \| 'space-evenly'`|`null`||
|display-directive|`'if' \| 'show'`|`'if'`|The directive to use in conditionally rendering. 'if' will use 'v-if' and 'show' will use 'v-show'. When use show directive, the status of tab won't be reset after tab changes.|

### Tab Panel Props
|Name|Type|Default|Description|
|-|-|-|-|
|label|`string`|`null`||
|name|`string \| number`|`null`|**required**|
|disabled|`boolean`|`false`||

## Slots
### Tabs, Tab Panel Slots
|Name|Parameters|Description|
|-|-|-|
|default|`()`||