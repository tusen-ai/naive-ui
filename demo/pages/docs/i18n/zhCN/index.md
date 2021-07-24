# 国际化

Naive-ui 通过使用 `n-config-provider` 调整语言，默认情况下所有组件均为英语。

了解更多关于 `n-config-provider` 的信息，参见 [全局化配置](../components/config-provider)。

## 配置

将 `n-config-provider` 的 `locale` 设为从 naive-ui 导入的 `zhCN` 来设定全局中文。

将 `n-config-provider` 的 `date-locale` 设为从 naive-ui 导入的 `dateZhCN` 来设定全局日期中文。

```html
<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <app />
  </n-config-provider>
</template>

<script>
  import { defineComponent } from 'vue'
  import { NConfigProvider } from 'naive-ui'
  import { zhCN, dateZhCN } from 'naive-ui'

  export default defineComponent({
    components: {
      NConfigProvider
    },
    setup() {
      return {
        zhCN,
        dateZhCN
      }
    }
  })
</script>

<style>
  body {
    background: black;
  }
</style>
```

目前 Naive-ui 只支持中文和英文，其他语言暂不支持。
