# Config Consumer
Config Consumer is built for getting config (usually as global config) of Config Provider. It will be helpful when you want to build a component which supports themes or other theme-related mutable features.
## Demos
```demo
basic
theme-environment-debug
color-debug
```
## Events
|Name|Parameters|Default|Description|
|-|-|-|-|
|on-theme-change|`(theme: string) => any`|`undefined`||
|on-namespace-change|`(namespace: string) => any`|`undefined`||
|on-language-change|`(language: string) => any`|`undefined`||

## Slots
|Name|Parameters|Description|
|-|-|-|
|default|`(options: { theme: string, namespace: string, language: string })`||