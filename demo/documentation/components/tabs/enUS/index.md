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
|Prop|Event|
|-|-|
|active-name|active-name-change|

## Props
### Tabs Props
|Name|Type|Default|Description|
|-|-|-|-|
|theme|`'light' \| 'dark' \| null`|`null`||
|active-name|`string \| number`|`null`||
|type|`'line' \| 'card'`|`'line'`||
|closable|`boolean`|`false`||
|justify-content|`'space-between' \| 'space-around' \| 'space-evenly'`|`null`||
|label-size|`'small' \| 'medium' \| 'large' \| 'huge'`|`'medium'`|The size of label, only works when type is line|

### Tab Pane Props
|Name|Type|Default|Description|
|-|-|-|-|
|label|`string`|`null`||
|name|`string \| number`|`null`|**required**|
|disabled|`boolean`|`false`||
|display-directive|`'if' \| 'show'`|`'if'`|The directive to use in conditionally rendering. 'if' will use 'v-if' and 'show' will use 'v-show'. When use show directive, the status of tab won't be reset after tab changes.|

## Slots
### Tabs, Tab Pane Slots
|Name|Parameters|Description|
|-|-|-|
|default|`()`||


## Events
|Name|Parameters|Description|
|-|-|-|
|active-name-change|`(activeName: string \| number)`||