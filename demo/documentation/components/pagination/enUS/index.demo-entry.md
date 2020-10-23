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

## Props
|Name|Type|Default|Description|
|-|-|-|-|
|page-count|`number`|required||
|page-sizes|`Array<number>`|`[]`||
|page-size|`number`|`undefined`||
|page-slot|`number`|`9`||
|page|`number`|required||
|show-quick-jumper|`boolean`|`false`||
|show-size-picker|`boolean`|`false`||
|theme|`'light' \| 'dark'  \| string`|`undefined`||
|on-update:page|`(page: number) => any`|`undefined`||
|on-update:page-size|`(pageSize: number) => any`|`undefined`||
