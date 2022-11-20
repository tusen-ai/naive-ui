<!--anchor:on-->

# Internationalization

Naive-ui provides `n-config-provider` to customize the internationalization. By default, all components are in English.

To learn more about `n-config-provider`, see [Config Provider](../components/config-provider).

## Configure

Set `n-config-provider`'s `locale` prop to `enUS` imported from naive-ui to set Chinese theme inside `n-config-provider`.

Set `n-config-provider`'s `date-locale` prop to `dateEnUS` imported from naive-ui to set Chinese theme's date inside `n-config-provider`.

```html
<template>
  <n-config-provider :locale="enUS" :date-locale="dateEnUS">
    <app />
  </n-config-provider>
</template>

<script>
  import { defineComponent } from 'vue'
  import { NConfigProvider } from 'naive-ui'
  import { enUS, dateEnUS } from 'naive-ui'

  export default defineComponent({
    components: {
      NConfigProvider
    },
    setup() {
      return {
        enUS,
        dateEnUS
      }
    }
  })
</script>
```

## Supported languages

PRs are welcomed for locales that are not supported yet!

The following list is sorted by 'Config' column.

| Language                  | Config | Date config | Version |
| ------------------------- | ------ | ----------- | ------- |
| Arabic (العربية)          | arDZ   | dateArDZ    | 2.34.0  |
| German (Germany)          | deDE   | dateDeDe    |         |
| English (British)         | enGB   | dateEnGB    | 2.25.1  |
| English                   | enUS   | dateEnUS    |         |
| Esperanto                 | eo     | dateEo      | 2.25.2  |
| Spanish (Argentina)       | esAR   | dateEsAR    | 2.24.2  |
| French                    | frFR   | dateFrFR    |         |
| Bahasa Indonesia          | idID   | dateIdID    |         |
| Italiano                  | itIT   | dateItIT    | 2.24.2  |
| Japanese                  | jaJP   | dateJaJP    |         |
| Korean (South Korea)      | koKR   | dateKoKR    | 2.28.1  |
| Norwegian Bokmål (Norway) | nbNO   | dateNbNO    |         |
| Dutch (Netherlands)       | nlNL   | dateNlNL    | 2.29.0  |
| Polish (Poland)           | plPL   | datePlPL    | 2.25.2  |
| Portuguese (Brazil)       | ptBR   | datePtBR    | 2.28.1  |
| Russian                   | ruRU   | dateRuRU    |         |
| Slovak                    | skSK   | dateSkSK    | 2.25.3  |
| Thai (Thailand)           | thTH   | dateThTH    | 2.27.0  |
| Turkish                   | trTR   | dateTrTR    | 2.34.0  |
| Ukrainian                 | ukUA   | dateUkUA    |         |
| Vietnamese (Vietnam)      | viVN   | dateViVN    | 2.30.7  |
| Chinese (Simplified)      | zhCN   | dateZhCN    |         |
| Chinese (Traditional)     | zhTW   | dateZhTW    |         |

## Customize the existing locale

You can use `createLocale` to customize the existing locale.

```html
<template>
  <n-config-provider :locale="locale" :date-locale="dateEnUS">
    <app />
  </n-config-provider>
</template>

<script>
  import { defineComponent } from 'vue'
  import { NConfigProvider, createLocale, enUS } from 'naive-ui'
  import { enUS, dateEnUS } from 'naive-ui'

  const customizedLocale = createLocale(
    {
      Input: {
        placeholder: 'Okay'
      }
    },
    enUS
  )

  export default defineComponent({
    components: {
      NConfigProvider
    },
    setup() {
      return {
        locale: customizedLocale,
        dateEnUS
      }
    }
  })
</script>
```
