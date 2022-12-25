<!--anchor:on-->

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
```

## 支持语言

欢迎提交 PR 来支持尚未支持的语言。

以下列表依据“配置”列排序。

| 语言              | 配置 | 日期配置 | 版本   |
| ----------------- | ---- | -------- | ------ |
| 阿拉伯语          | arDZ | dateArDZ | 2.34.0 |
| 德语              | deDE | dateDeDe |        |
| 英国英语          | enGB | dateEnGB | 2.25.1 |
| 英语              | enUS | dateEnUS |        |
| 世界语            | eo   | dateEo   | 2.25.2 |
| 西班牙语（阿根廷) | esAR | dateEsAR | 2.24.2 |
| 法语              | frFR | dateFrFR |        |
| 印度尼西亚语      | idID | dateIdID |        |
| 意大利语          | itIT | dateItIT | 2.24.2 |
| 日语              | jaJP | dateJaJP |        |
| 韩语              | koKR | dateKoKR | 2.28.1 |
| 书面挪威语        | nbNO | dateNbNO |        |
| 荷兰语（荷兰）    | nlNL | dateNlNL | 2.29.0 |
| 波兰语（波兰）    | plPL | datePlPL | 2.25.2 |
| 葡萄牙语 (巴西)   | ptBR | datePtBR | 2.28.1 |
| 俄罗斯语          | ruRU | dateRuRU |        |
| 斯洛伐克语        | skSK | dateSkSK | 2.25.3 |
| 泰语（泰国）      | thTH | dateThTH | 2.27.0 |
| 土耳其语          | trTR | dateTrTR | 2.34.0 |
| 乌克兰语          | ukUA | dateUkUA |        |
| 越南语（越南）    | viVN | dateViVN | 2.30.7 |
| 简体中文          | zhCN | dateZhCN |        |
| 繁体中文          | zhTW | dateZhTW |        |

## 在现有国际化基础上调整

你可以使用 `createLocale` 在现有国际化基础上调整。

```html
<template>
  <n-config-provider :locale="locale" :date-locale="dateZhCN">
    <app />
  </n-config-provider>
</template>

<script>
  import { defineComponent } from 'vue'
  import { NConfigProvider, createLocale, zhCN } from 'naive-ui'
  import { zhCN, dateZhCN } from 'naive-ui'

  const customizedLocale = createLocale(
    {
      Input: {
        placeholder: '不提申请不构成加班'
      }
    },
    zhCN
  )

  export default defineComponent({
    components: {
      NConfigProvider
    },
    setup() {
      return {
        locale: customizedLocale,
        dateZhCN
      }
    }
  })
</script>
```
