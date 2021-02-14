<!--anchor:on-->

# Experimental Features

<n-alert type="warning" title="Caveats">
  The following features are <n-text strong>unstable</n-text>. Use them if you really need and perpare to follow the API changes.
</n-alert>

## Customize Theme

```html
<script>
  import { NConfigProvider } from 'naive-ui'

  /**
   * @type import('../src').GlobalThemeOverrides
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

For specific variables, please follow `GlobalThemeOverrides` type hint.

## Use Tusimple Theme

```html
<script>
  import { TsConfigProvider, useDialog, useMessage } from '@naive-ui/tusimple-theme'

  // danger typed api
  const dialog = useDialog()
  dialog.danger(...)

  const message = useMessage()
  message.danger(...)
</script>

<template>
  <ts-config-provider>
    <my-app />
  </ts-config-provider>
</template>
```
