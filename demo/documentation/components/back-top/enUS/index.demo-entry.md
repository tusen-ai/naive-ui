# Back Top
<!--single-column-->
It helps you back to where you were. However, time never goes back.
## Demos
Scroll down to see demos work.

```demo
basic
visibility-height
change-position
target-container-selector
```

## Props
|Name|Type|Default|Description|
|-|-|-|-|
|bottom|`number \| string`|`40`||
|listen-to|`() => HTMLElement`|a function that returns the nearest scrollable ascendant element||
|right|`number \| string`|`40`||
|show|`boolean`|`undefined`|Whether to show BackTop|
|themed-style|`{ [themeName: string]: Object } \| null`|`null`||
|theme|`'light' \| 'dark' \| null \| string`|`null`||
|to|`string \| HTMLElement`|`'body'`|Container node to show BackTop|
|visibility-height|`number`|`180`||
|on-update:show|`(value: boolean) => any`|`undefined`||
