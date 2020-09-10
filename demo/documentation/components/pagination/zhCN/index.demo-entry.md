# 分页 Pagination
<!--single-column-->
长数据之友。
## 演示
```demo
basic
slot
quick-jumper
size-picker
disabled
```
## V-model
|Prop|Event|
|-|-|
|page|change|

## Props
|名称|类型|默认值|说明|
|-|-|-|-|
|theme|`'light' \| 'dark' \| null \| string`|`null`||
|page|`number`|`null`||
|page-count|`number`|`null`||
|page-size|`number`|`null`||
|page-sizes|`Array<number>`|`[]`||
|show-size-picker|`boolean`|`false`||
|show-quick-jumper|`boolean`|`false`||
|page-slot|`number`|`9`||
|on-page-size-change|`(pageSize: number) => any`|`null`||
|on-change|`(page: number) => any`|`null`||

## Events
|名称|参数|说明|
|-|-|-|
|change|`(page: number)`||
|page-size-chagne|`(pageSize: number)`||