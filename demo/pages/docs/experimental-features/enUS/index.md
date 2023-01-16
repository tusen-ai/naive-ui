<!--anchor:on-->

# Experimental Features

<n-alert type="warning" title="Caveats" :bordered="false">
  The following features are <n-text strong>unstable</n-text>. Use them if you really need and perpare to follow the API changes.
</n-alert>

## Use TuSimple Theme

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
