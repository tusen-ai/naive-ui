<!--anchor:on-->

# Customizing Theme

Naive-ui provide `n-config-provider` to customize the theme.

By default all the component is light themed, without any configuration.

Learn more about `n-config-provider`, see [Config Provider](../components/config-provider).

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
  import { defineComponent } from 'vue'
  import { darkTheme } from 'naive-ui'

  export default defineComponent({
    setup() {
      return {
        darkTheme
      }
    }
  })
</script>
```

## Customizing Theme Vars (Design Tokens)

No CSS (Scss, Less) needed.

The configured global theme variables will overwrite the theme variables that take effect on descendant components.

Set `n-config-provider`'s `theme-overrides` to customize theme vars. Naive-ui exports type `GlobalThemeOverrides` to help you define `theme-overrides`.

For available vars please follow the type hint of `GlobalThemeOverrides`.

If you want to view more theme variables, you can view them in the edit button at the bottom right corner of the Naive UI homepage.

You can modify the corresponding theme variable, you can get the themeOverrides object after export.

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

## Customizing Component Theme Vars

The use of component theme variables is the same as the use of global theme variables, and the component theme variables will override the global theme variables.

```html
<script>

  /**
   * @type import('naive-ui').GlobalThemeOverrides
   */
  const themeOverrides = {
    Button: {
      textColor: '#FF0000'，
      border: '1px solid #FF0000'
    }
  }

  // ...
</script>

<template>
  <n-button :theme-overrides="themeOverrides"> theme </n-button>
</template>
```

## Customizing Theme Vars Under Different Theme

If you want to use different theme variables on light and dark theme at the same time, you can take a look at this.

```html
<script>
  import { NConfigProvider, darkTheme } from 'naive-ui'

  /**
   * @type import('naive-ui').GlobalThemeOverrides
   */
  const lightThemeOverrides = {
    common: {
      primaryColor: '#000000'
    }
    // ...
  }

  const darkThemeOverrides = {
    common: {
      primaryColor: '#FFFFFF'
    }
    // ...
  }

  const theme = null
  // ...
</script>

<template>
  <n-config-provider
    :theme="theme"
    :theme-overrides="theme === null ? lightThemeOverrides : darkThemeOverrides"
  >
    <my-app />
  </n-config-provider>
</template>
```

## Sync Style of the Body Element

For the following reasons, you may need to set some styles on `document.body`.

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

The theme editor is not included in global installation (`app.use(naive)`). You need to import it explicitly to use it.

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
