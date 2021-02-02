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
| date-locale | `DateLocale \| null` | `undefined` | 对后代组件生效的日期语言对象，为 `null` 时会使用默认 `enUS`，为 `undefined` 时会继承上级 `n-config-provider` |
| tag | `string` | `'div'` | `n-config-provider` 被渲染成的元素 |
| locale | `Locale \| null` | `undefined` | 对后代组件生效的语言对象，为 `null` 时会使用默认 `enUS`，为 `undefined` 时会继承上级 `n-config-provider` |
| namespace | `string` | `undefined` | `n-config-provider` 内部组件被卸载于其他位置的 DOM 的类名 |
| theme | `Theme \| null` | `undefined` | 对后代组件生效的主题对象，为 `null` 时会使用默认亮色，为 `undefined` 时会继承上级 `n-config-provider` |
