# 配置提供者 Config Provider

配置提供者设置内部组件的主题、语言和组件卸载于其他位置的 DOM 的类名。

## 演示

```demo
theme
namespace
inherit-theme
os-theme
language
transparent
theme-environment-debug
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| abstract | `boolean` | `false` | 是否不存在 DOM 包裹 |
| tag | `string` | `'div'` | `n-config-provider` 被渲染成的元素 |
| language | `string` | `'en-US'` | `n-config-provider` 内部的组件语言 |
| namespace | `string` | `undefined` | `n-config-provider` 内部组件被卸载于其他位置的 DOM 的类名 |
| theme | `string` | `undefined` | `n-config-provider` 内部组件的主题 |
