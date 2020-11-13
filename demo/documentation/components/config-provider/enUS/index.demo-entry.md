# Config Provider
Config Provider is used to set global theme, set global language and set namespace for components (detached parts).
## Demos
```demo
theme
namespace
inherit-theme
os-theme
language
transparent
theme-environment
```
## Props
|Name|Type|Default|Description|
|-|-|-|-|
|abstract|`boolean`|`false`|If `n-config-provider` has no wrapper DOM|
|tag|`string`|`'div'`|What tag `n-config-provider` will be rendered as|
|language|`string`|`'en-US'`|Language of components inside `n-config-provider`|
|namespace|`string`|`undefined`|Class name of detached parts of components inside `n-config-provider`|
|theme|`string`|`undefined`|Theme name of components inside `n-config-provider`|
