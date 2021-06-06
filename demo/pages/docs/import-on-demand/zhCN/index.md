# 按需引入（Tree Shaking）

Naive UI 支持 tree shaking，组件、语言、主题均可 tree-shaking。

默认情况组件主题为亮色，语言为英文，无需额外导入。

了解更多关于主题设定的信息，参见[调整主题](customize-theme)。

```html
<script>
  import { defineComponent } from 'vue'
  import { NConfigProvider, NInput, NDatePicker } from 'naive-ui'
  // theme
  import { createTheme, inputDark, datePickerDark } from 'naive-ui'
  // locale & dateLocale
  import { zhCN, dateZhCN } from 'naive-ui'

  export default defineComponent({
    components: {
      NConfigProvider,
      NInput,
      NDatePicker
    },
    setup() {
      return {
        darkTheme: createTheme([inputDark, datePickerDark]),
        zhCN,
        dateZhCN
      }
    }
  })
</script>

<template>
  <n-config-provider :theme="darkTheme" :locale="zhCN" :date-locale="dateZhCN">
    <n-space vertical>
      <n-input />
      <n-date-picker />
    </n-space>
  </n-config-provider>
</template>

<style>
  body {
    background: black;
  }
</style>
```
