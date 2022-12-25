# Config Provider

Config Provider is used to set global theme, set global language and set namespace for components (detached parts).

For more info about theming, see [Customizing Theme](../docs/customize-theme).

## Demos

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

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| abstract | `boolean` | `false` | If `n-config-provider` has no wrapper DOM |  |
| breakpoints | `{ [k: string]: number }` | `{ xs: 0, s: 640, m: 1024, l: 1280, xl: 1536, xxl: 1920 }` | Responsive breakpoints, it will be used in `n-grid`. The prop is not responsive, you need to set it on its first mount. |  |
| cls-prefix | `string` | `n` | The class prefix of all inner components. It's applied in the first time. |  |
| date-locale | `DateLocale \| null` | `undefined` | The date locale object to be consumed by its child. If set to `null` it will use the default `dateEnUS` locale. If set to `undefined` it will inherit its parent `n-config-provider`. |  |
| inline-theme-disabled | `boolean` | `false` | Whether to disabled inline theme CSS variables. If you won't change theme overrides frequently in client side, and need SSR or make devtools looks clear. You can enable the prop. Note that the prop is not responsive. | 2.26.0 |
| katex | `object` | `undefined` | Katex object for `n-equation`. | 2.34.0 |
| locale | `Locale \| null` | `undefined` | The locale object to be consumed by its child. If set to `null` it will use the default `enUS` locale. If set to `undefined` it will inherit its parent `n-config-provider`. |  |
| namespace | `string` | `undefined` | Class name of detached parts of components inside `n-config-provider` |  |
| preflight-style-disabled | `boolean` | `false` | Whether to disabled preflight style of naive-ui. If you disable it, you can take control of all global css. Also you can use `n-global-style` to apply global style (which is recommend since global style will be reactive). | 2.29.0 |
| tag | `string` | `'div'` | What tag `n-config-provider` will be rendered as |  |
| theme | `Theme \| null` | `undefined` | The theme object to be consumed by its child. If set to `null` it will use the default light theme. If set to `undefined` it will inherit its parent `n-config-provider`. For more details please see [Customizing Theme](../docs/customize-theme). |  |
| theme-overrides | `ThemeOverrides \| null` | `undefined` | The theme vars overrides to be consumed by its child. If set to `null` it will clear all theme vars. If set to `undefined` it will inherit its parent `n-config-provider`. For more details please see [Customizing Theme](../docs/customize-theme). |  |
