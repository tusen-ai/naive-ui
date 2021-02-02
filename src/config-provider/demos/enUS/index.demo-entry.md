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
theme-environment-debug
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| abstract | `boolean` | `false` | If `n-config-provider` has no wrapper DOM |
| date-locale | `DateLocale \| null` | `undefined` | The date locale object to be consumed by its child. If set to `null` it will use the default `enUS` locale. If set to `undefined` it will inherit its parent `n-config-provider`. |
| tag | `string` | `'div'` | What tag `n-config-provider` will be rendered as |
| locale | `Locale \| null` | `undefined` | The locale object to be consumed by its child. If set to `null` it will use the default `enUS` locale. If set to `undefined` it will inherit its parent `n-config-provider`. |
| namespace | `string` | `undefined` | Class name of detached parts of components inside `n-config-provider` |
| theme | `Theme \| null` | `undefined` | The theme object to be consumed by its child. If set to `null` it will use the default light theme. If set to `undefined` it will inherit its parent `n-config-provider`. |
