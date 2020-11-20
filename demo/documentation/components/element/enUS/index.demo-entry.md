# Element
Element can be render as a custom tag with the ability of accessing some configurations provided by `n-config-provider`.

## Demos
```demo
basic
color-debug
```
## Props
|Name|Type|Default|Description|
|-|-|-|-|
|tag|`string`|`'div'`|The tag `n-element` should be rendered as.|
|on-theme-change|`(theme: string) => any`|`undefined`||

## Slots
|Name|Parameters|Description|
|-|-|-|
|default|`(theme: string, namespace: string)`||
