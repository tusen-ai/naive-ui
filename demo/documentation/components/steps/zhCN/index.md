# 步骤 Steps
<!--single-column-->
1、2、3...成了！
## 演示
```demo
basic
size
vertical
content
```

## Props
### Steps Props
|名称|类型|默认值|说明|
|-|-|-|-|
|theme|`'light' \| 'dark'`|`null`||
|current|`number`|`null`||
|status|`'process' \| 'finish' \| 'error' \| 'wait'`|`'process'`||
|size|`'small' \| 'medium'`|`'medium'`||
|vertical|`boolean`|`false`||

### Step Props
|名称|类型|默认值|说明|
|-|-|-|-|
|title|`string`|`null`||
|description|`string`|`null`||
|content|`function`|`null`|`当content和description 同时存在时, 优先使用content, 并会省略descriptions`||
|status|`'process' \| 'finish' \| 'error' \| 'wait'`|`'process'`||

## Slots
### Steps Slots
|名称|参数|说明|
|-|-|-|
|default|`()`||