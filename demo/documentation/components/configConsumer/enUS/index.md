# Config Consumer
Config Consumer is built for getting config (usually as global config) of Config Provider. It will be helpful when you want to build a component which supports themes or other mutable features.
## Demos
```demo
basic
theme-environment
color
```
## Props

## Events
|Name|Parameters|
|-|-|
|theme-change|(theme, oldTheme)|
|namespace-change|(namespace, oldNamespace)|
|language-change|(language, oldLanguage)|

## Slots
|Name|Parameters|
|-|-|
|default|({ theme, namespace, language, themeEnvironment, styleScheme })|