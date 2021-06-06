<!--anchor:on-->

# Customizing Theme

Naive-ui provide `n-config-provider` to customize the theme.

By default all the component is light themed, without any configuration.

## Use Dark Theme

Set `n-config-provider`'s `theme` prop to `darkTheme` imported from naive-ui to set dark theme inside `n-config-provider`.

If `theme` is `undefined` it won't affect the theme of components inside.

```html
<template>
  <n-config-provider :theme="darkTheme">
    <app />
  </n-config-provider>
</template>

<script>
  import { darkTheme } from 'naive-ui'

  export default {
    setup() {
      return {
        darkTheme
      }
    }
  }
</script>
```

## Customizing Theme Vars (Design Tokens)

No CSS (Scss, Less) needed.

Set `n-config-provider`'s `theme-overrides` to customize theme vars. Naive-ui exports type `GlobalThemeOverrides` to help you define `theme-overrides`.

For available vars please follow the type hint of `GlobalThemeOverrides`.

```html
<script>
  import { NConfigProvider } from 'naive-ui'

  /**
   * @type import('naive-ui').GlobalThemeOverrides
   */
  const themeOverrides = {
    common: {
      primaryColor: '#FF0000'
    },
    Button: {
      textColor: '#FF0000'
    },
    Select: {
      peers: {
        InternalSelection: {
          textColor: '#FF0000'
        }
      }
    }
    // ...
  }

  // ...
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <my-app />
  </n-config-provider>
</template>
```

## Sync Style of the Body Element

For the following reasons, you may need to set some styles on `document.body`

1. Naive-ui will mount some global style that is unresponsive (to theme, not media query). For example `font-family`. The style works fine by default, however they won't change when theme is changed.
2. `n-config-provider` can't sync global style (for example, body's background color) outside it.

You can use `n-global-style` to sync common global style to the body element. In the following example, `n-global-style` will sync the theme provided by `n-config-provider` to `document.body`.

```html
<template>
  <n-config-provider ...>
    <app />
    <n-global-style />
  </n-config-provider>
</template>
```

## Theme Editor

Naive-ui provides theme editor to help you edit theme and export the corresponding configuration. It can be placed inside `n-config-provider`.

The theme editor is not included in global installation (`app.use(naive)`). You need to import it explicitly to use it

```html
<template>
  <n-theme-editor>
    <app />
  </n-theme-editor>
</template>

<script>
  import { defineComponent } from 'vue'
  import { NThemeEditor } from 'naive-ui'

  export default defineComponent({
    components: {
      NThemeEditor
    }
  })
</script>
```
