# Config Provider
Config Provider is used to set global theme, set global language and set namespace for components (detached parts).
## Demos
```demo
theme
namespace
inherit-theme
theme-environment
os-theme
language
transparent
```
## Props
|Name|Type|Default|Description|
|-|-|-|-|
|abstract|`boolean`|`false`|If `n-config-provider` has no wrapper DOM|
|as|`string`|`'div'`|What tag `n-config-provider` will be rendered as|
|language|`string`|`'en-US'`|Language of components inside `n-config-provider`|
|namespace|`string`|`null`|Class name of detached parts of components inside `n-config-provider`|
|theme|`string`|`null`|Theme name of components inside `n-config-provider`|
|theme-environments|`{ [themeName: string]: any }`|`null`|An object with some value which can be accessed by `n-config-consumer` or `n-element` inside `n-config-provider`|
