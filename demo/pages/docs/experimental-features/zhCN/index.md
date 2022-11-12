<!--anchor:on-->

# 试验性特性

<n-alert type="warning" title="注意" :bordered="false">
  下列的所有功能都是<n-text strong>不稳定</n-text>的。只在真的需要的时候再使用他们，API 有可能在未来被改变。
</n-alert>

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
