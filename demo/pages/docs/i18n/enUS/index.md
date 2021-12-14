<!--anchor:on-->

# Internationalization

Naive-ui provide `n-config-provider` to customize the internationalization. By default, all components are in English.

Learn more about `n-config-provider`, see [Config Provider](../components/config-provider).

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

PR is welcomed for locales that is not supported yet!

| Language                  | Config | Date config |
| ------------------------- | ------ | ----------- |
| English                   | enUS   | dateEnUS    |
| Japanese                  | jaJP   | dateJaJP    |
| Russian                   | ruRU   | dateRuRU    |
| Ukrainian                 | ukUA   | dateUkUA    |
| Chinese (Simplified)      | zhCN   | dateZhCN    |
| Chinese (Traditional)     | zhTW   | dateZhTW    |
| German - Germany          | deDE   | dateDeDe    |
| Norwegian Bokmål (Norway) | nbNO   | dateNbNO    |
| French                    | frFR   | dateFrFR    |

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
        placeholder: '不提申请不构成加班'
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
