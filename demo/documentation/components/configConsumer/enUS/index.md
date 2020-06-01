# Config Consumer
Config Consumer is built for getting config (usually as global config) of Config Provider. It will be helpful when you want to build a component which supports themes or other theme-related mutable features.
## Demos
```demo
basic
theme-environment
color
```
## Events
|Name|Parameters|Description|
|-|-|-|
|theme-change|`(theme: string)`||
|namespace-change|`(namespace: string)`||
|language-change|`(language: string)`||

## Slots
|Name|Parameters|Description|
|-|-|-|
|default|`(options: { theme: string, namespace: string, language: string, themeEnvironment: any, styleScheme: Object })`||