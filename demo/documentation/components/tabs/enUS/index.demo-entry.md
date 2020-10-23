# Tabs
Switch contents in same area.
## Demos
```demo
basic
flex-label
card
display-directive
```

## Props
### Tabs Props
|Name|Type|Default|Description|
|-|-|-|-|
|closable|`boolean`|`false`||
|justify-content|`'space-between' \| 'space-around' \| 'space-evenly'`|`undefined`||
|label-size|`'small' \| 'medium' \| 'large' \| 'huge'`|`'medium'`|标签的尺寸，只对线型的 Tabs 生效|
|theme|`'light' \| 'dark' \| string`|`undefined`||
|type|`'line' \| 'card'`|`'line'`||
|value|`string \| number`|required||
|on-update:value|`(value: string \| number) => any`|`undefined`||

### Tab Pane Props
|Name|Type|Default|Description|
|-|-|-|-|
|disabled|`boolean`|`false`||
|display-directive|`'if' \| 'show'`|`'if'`|The directive to use in conditionally rendering. 'if' will use 'v-if' and 'show' will use 'v-show'. When use show directive, the status of tab won't be reset after tab changes.|
|label|`string`|`undefined`||
|name|`string \| number`|required||

## Slots
### Tabs, Tab Pane Slots
|Name|Parameters|Description|
|-|-|-|
|default|`()`||
