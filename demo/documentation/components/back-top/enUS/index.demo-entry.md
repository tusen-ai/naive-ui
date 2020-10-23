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
|listen-to|`string \| HTMLElement`|`undefined`|The element to be listened to scroll event. If it is `undefined` back top will listen to the nearest scrollable parent.|
|right|`number \| string`|`40`||
|show|`boolean`|`undefined`|Whether to show BackTop|
|themed-style|`{ [themeName: string]: Object }`|`undefined`||
|theme|`'light' \| 'dark' \| string`|`undefined`||
|to|`string \| HTMLElement`|`'body'`|Container node to show BackTop|
|visibility-height|`number`|`180`||
|on-update:show|`(value: boolean) => any`|`undefined`||
