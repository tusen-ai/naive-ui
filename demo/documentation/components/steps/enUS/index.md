# Steps
<!--single-column-->
1, 2, 3... done!
## Demos
```demo
basic
size
vertical
content
```

## Props
### Steps Props
|Name|Type|Default|Description|
|-|-|-|-|
|theme|`'light' \| 'dark'`|`null`||
|current|`number`|`null`||
|status|`'process' \| 'finish' \| 'error' \| 'wait'`|`'process'`||
|size|`'small' \| 'medium'`|`'medium'`||
|vertical|`boolean`|`false`||

### Step Props
|Name|Type|Default|Description|
|-|-|-|-|
|title|`string`|`null`||
|description|`string`|`null`||
|content|`string`|`null`|`when both description and content exist, content has priority, means that the descriptions will be omitted`||
|status|`'process' \| 'finish' \| 'error' \| 'wait'`|`'process'`||

## Slots
### Steps Slots
|Name|Parameters|Description|
|-|-|-|
|default|`()`||