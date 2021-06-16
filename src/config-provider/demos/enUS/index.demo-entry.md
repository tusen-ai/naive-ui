# Config Provider

Config Provider is used to set global theme, set global language and set namespace for components (detached parts).

For more info about theming, see [Customizing Theme](../docs/customize-theme).

## Demos

```demo
theme
namespace
inherit-theme
os-theme
language
transparent
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| abstract | `boolean` | `false` | If `n-config-provider` has no wrapper DOM |
| cls-prefix | `string` | `n` | The class prefix of all inner components. It's applied in the first time. |
| date-locale | `DateLocale \| null` | `undefined` | The date locale object to be consumed by its child. If set to `null` it will use the default `enUS` locale. If set to `undefined` it will inherit its parent `n-config-provider`. |
| tag | `string` | `'div'` | What tag `n-config-provider` will be rendered as |
| locale | `Locale \| null` | `undefined` | The locale object to be consumed by its child. If set to `null` it will use the default `enUS` locale. If set to `undefined` it will inherit its parent `n-config-provider`. |
| namespace | `string` | `undefined` | Class name of detached parts of components inside `n-config-provider` |
| theme | `Theme \| null` | `undefined` | The theme object to be consumed by its child. If set to `null` it will use the default light theme. If set to `undefined` it will inherit its parent `n-config-provider`. For more details please see [Customizing Theme](docs/customize-theme). |
| theme-overrides | `ThemeOverrides \| null` | `undefined` | The theme vars overrides to be consumed by its child. If set to `null` it will clear all theme vars. If set to `undefined` it will inherit its parent `n-config-provider`. For more details please see [Customizing Theme](docs/customize-theme). |
