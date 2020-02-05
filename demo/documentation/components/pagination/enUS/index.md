# Pagination
<!--single-column-->
Long data's friend.
## Demos
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
|Name|Type|Default|Description|
|-|-|-|-|
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
|Name|Parameters|Description|
|-|-|-|
|change|`(page: number)`||
|page-size-chagne|`(pageSize: number)`||