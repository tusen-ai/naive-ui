# 全局化配置 Config Provider

全局化配置设置内部组件的主题、语言和组件卸载于其他位置的 DOM 的类名。

了解更多关于主题设定的信息，参见[调整主题](../docs/customize-theme)。

## 演示

```demo
theme.vue
namespace.vue
inherit-theme.vue
os-theme.vue
language.vue
transparent.vue
inline-theme-disabled.vue
```

## API

### ConfigProvider Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| abstract | `boolean` | `false` | 是否不存在 DOM 包裹 |  |
| breakpoints | `{ [k: string]: number }` | `{ xs: 0, s: 640, m: 1024, l: 1280, xl: 1536, xxl: 1920 }` | 屏幕响应式断点，对 `n-grid` 生效。这个属性不是响应式的，你需要在组件第一次挂载时就设定好 |  |
| cls-prefix | `string` | `n` | 内部所有组件的类的前缀，仅首次设定会生效 |  |
| date-locale | `DateLocale \| null` | `undefined` | 对后代组件生效的日期语言对象，为 `null` 时会使用默认 `dateEnUS`，为 `undefined` 时会继承上级 `n-config-provider` |  |
| inline-theme-disabled | `boolean` | `false` | 是否禁用 inline css 主题变量，如果你不会频繁调整主题变量，并且需要 SSR 或者想让 devtools 看起来更干净，可以打开这个选项。注意，这个属性不是响应式的 | 2.26.0 |
| katex | `object` | `undefined` | 公式组件需要的 katex 对象 | 2.34.0 |
| locale | `Locale \| null` | `undefined` | 对后代组件生效的语言对象，为 `null` 时会使用默认 `enUS`，为 `undefined` 时会继承上级 `n-config-provider` |  |
| namespace | `string` | `undefined` | `n-config-provider` 内部组件被卸载于其他位置的 DOM 的类名 |  |
| preflight-style-disabled | `boolean` | `false` | 是否禁用默认样式，如果你禁用了它，便可以完全控制全局样式。你也可以使用 `n-global-style` 去挂载全局样式（推荐，样式是响应式的） | 2.29.0 |
| tag | `string` | `'div'` | `n-config-provider` 被渲染成的元素 |  |
| theme | `Theme \| null` | `undefined` | 对后代组件生效的主题对象，为 `null` 时会使用默认亮色，为 `undefined` 时会继承上级 `n-config-provider`。更多信息参见[调整主题](../docs/customize-theme) |  |
| theme-overrides | `ThemeOverrides \| null` | `undefined` | 对后代组件生效的主题变量覆盖，为 `null` 时会清除全部覆盖变量，为 `undefined` 时会继承上级 `n-config-provider`。更多信息参见[调整主题](../docs/customize-theme) |  |
