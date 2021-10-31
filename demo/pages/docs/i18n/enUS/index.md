<!--anchor:on-->

# Internationalization

Naive-ui provide `n-config-provider` to customize the internationalization. By default, all components are in English.

Learn more about `n-config-provider`, see [Config Provider](../components/config-provider).

## Configure

Set `n-config-provider`'s `locale` prop to `zhCN` imported from naive-ui to set Chinese theme inside `n-config-provider`.

Set `n-config-provider`'s `date-locale` prop to `dateZhCN` imported from naive-ui to set Chinese theme's date inside `n-config-provider`.

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

## Supported languages

| Language             | Config | Date config |
| -------------------- | ------ | ----------- |
| English              | enUS   | dateEnUS    |
| Japanese             | jaJP   | dateJaJP    |
| Russian              | ruRU   | dateRuRU    |
| Ukrainian            | ukUA   | dateUkUA    |
| Chinese (Simplified) | zhCN   | dateZhCN    |
| Indonesian           | idID   | dateIdID    |
