<!--anchor:on-->

# Customizing theme

Naive-ui provides `n-config-provider` to customize the theme.

By default all of the components are light themed, without any configuration.

To learn more about `n-config-provider`, see [Config Provider](../components/config-provider).

## Use dark theme

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

## Customizing theme vars (design tokens)

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
   * Use this for type hints under js file
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

## Customizing theme vars in TypeScript

If you are using ts to write code, this one is more suitable for you.

```html
<script lang="ts">
  import { NConfigProvider, GlobalThemeOverrides } from 'naive-ui'

  const themeOverrides: GlobalThemeOverrides = {
    common: {
      primaryColor: '#FF0000'
    },
    Button: {
      textColor: '#FF0000'
    }
  }

  // ...
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <my-app />
  </n-config-provider>
</template>
```

## Customizing component theme vars

The use of component theme variables is the same as the use of global theme variables, and the component theme variables will override the global theme variables.

```html
<script lang="ts">
  import { SelectProps, ButtonProps } from 'naive-ui'

  type SelectThemeOverrides = NonNullable<SelectProps['themeOverrides']>
  type ButtonThemeOverrides = NonNullable<ButtonProps['themeOverrides']>

  const selectThemeOverrides: SelectThemeOverrides = {
    menuBoxShadow:
      '0 6px 16px -9px rgba(0, 0, 0, .08), 0 9px 28px 0 rgba(0, 0, 0, .05), 0 12px 48px 16px rgba(0, 0, 0, .03)',
    peers: {
      InternalSelection: {
        textColor: '#FF0000',
        heightMedium: '42px'
      }
    }
  }
  const buttonThemeOverrides: ButtonThemeOverrides = {
    heightMedium: '40px',
    textColor: 'rgba(24, 127, 231, 1)'
  }

  // ...
</script>

<template>
  <n-select
    v-model:value="value"
    :options="options"
    :theme-overrides="selectThemeOverrides"
  />
  <n-button :theme-overrides="buttonThemeOverrides">theme</n-button>
</template>
```

## Customizing theme vars under different themes

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

## Use the peers vars

In many cases, another component will be reused inside a component, so the theme variable of peers appears.

The theme variables related to peers have not been exposed yet. Use `GlobalThemeOverrides` to view the peers variables of the corresponding component.

The specific available peers will be updated later.

```html
<script lang="ts">
  import { NConfigProvider, GlobalThemeOverrides } from 'naive-ui'

  const themeOverrides: GlobalThemeOverrides = {
    Select: {
      peers: {
        InternalSelection: {
          textColor: '#FF0000'
        },
        InternalSelectMenu: {
          borderRadius: '6px'
        }
      }
    },
    DataTable: {
      paginationMargin: '40px 0 0 0',
      peers: {
        Empty: {
          textColor: '#ccc'
        },
        Pagination: {
          itemTextColor: '#ccc'
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

## Sync style of the body element

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

## Theme editor

Naive-ui provides a theme editor to help you edit theme and export the corresponding configuration. It can be placed inside `n-config-provider`.

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
