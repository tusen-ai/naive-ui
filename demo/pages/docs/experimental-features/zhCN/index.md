<!--anchor:on-->

# 试验性特性

<n-alert type="warning" title="注意">
  下列的所有功能都是<n-text strong>不稳定</n-text>的。只在真的需要的时候再使用他们，API 有可能在未来被改变。
</n-alert>

## 定制主题

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

具体可使用变量请参考 `GlobalThemeOverrides` 类型提示。

## 使用图森主题

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
