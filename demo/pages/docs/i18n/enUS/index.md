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

| Language                     | Config | Date config | Version |
| ---------------------------- | ------ | ----------- | ------- |
| Afrikaans (South Africa)     | afZA   | dateAfZA    |         |
| Amharic (Ethiopia)           | amET   | dateAmET    |         |
| Arabic (العربية)             | arDZ   | dateArDZ    | 2.34.0  |
| Azerbaijani (Azərbaycanca)   | azAZ   | dateAzAZ    | 2.39.0  |
| Belarusian (Belarus)         | beBY   | dateBeBY    |         |
| Bulgarian (Bulgaria)         | bgBG   | dateBgBG    |         |
| Bengali (Bangladesh)         | bnBD   | dateBnBD    |         |
| Catalan (Spain)              | caES   | dateCaES    |         |
| Czech (Czechia)              | csCZ   | dateCsCZ    | 2.38.2  |
| Danish (Denmark)             | daDK   | dateDaDK    | 2.43.0  |
| German (Germany)             | deDE   | dateDeDE    |         |
| Greek (Greece)               | elGR   | dateElGR    |         |
| English (British)            | enGB   | dateEnGB    | 2.25.1  |
| English                      | enUS   | dateEnUS    |         |
| Esperanto                    | eo     | dateEo      | 2.25.2  |
| Spanish (Argentina)          | esAR   | dateEsAR    | 2.24.2  |
| Spanish (Spain)              | esES   | dateEsES    |         |
| Estonian                     | etEE   | dateEtEE    | 2.38.0  |
| Basque (Spain)               | euES   | dateEuES    |         |
| Persian                      | faIR   | dateFaIR    | 2.34.4  |
| Finnish (Finland)            | fiFI   | dateFiFI    |         |
| Filipino (Philippines)       | filPH  | dateFilPH   |         |
| French                       | frFR   | dateFrFR    |         |
| Galician (Spain)             | glES   | dateGlES    |         |
| Gujarati (India)             | guIN   | dateGuIN    |         |
| Hebrew (Israel)              | heIL   | dateHeIL    |         |
| Hindi (India)                | hiIN   | dateHiIN    |         |
| Croatian (Croatia)           | hrHR   | dateHrHR    |         |
| Hungarian (Hungary)          | huHU   | dateHuHU    |         |
| Armenian (Armenia)           | hyAM   | dateHyAM    |         |
| Bahasa Indonesia             | idID   | dateIdID    |         |
| Icelandic (Iceland)          | isIS   | dateIsIS    |         |
| Italiano                     | itIT   | dateItIT    | 2.24.2  |
| Japanese                     | jaJP   | dateJaJP    |         |
| Georgian (Georgia)           | kaGE   | dateKaGE    |         |
| Kazakh (Kazakhstan)          | kkKZ   | dateKkKZ    |         |
| Khmer (Cambodia)             | kmKH   | dateKmKH    | 2.41.0  |
| Kannada (India)              | knIN   | dateKnIN    |         |
| Korean (South Korea)         | koKR   | dateKoKR    | 2.28.1  |
| Kyrgyz (Kyrgyzstan)          | kyKG   | dateKyKG    |         |
| Lao (Laos)                   | loLA   | dateLoLA    |         |
| Lithuanian (Lithuania)       | ltLT   | dateLtLT    |         |
| Latvian (Latvia)             | lvLV   | dateLvLV    |         |
| Macedonian (North Macedonia) | mkMK   | dateMkMK    |         |
| Malayalam (India)            | mlIN   | dateMlIN    |         |
| Mongolian (Mongolia)         | mnMN   | dateMnMN    |         |
| Marathi (India)              | mrIN   | dateMrIN    |         |
| Malay (Malaysia)             | msMY   | dateMsMY    |         |
| Burmese (Myanmar)            | myMM   | dateMyMM    |         |
| Norwegian Bokmål (Norway)    | nbNO   | dateNbNO    |         |
| Nepali (Nepal)               | neNP   | dateNeNP    |         |
| Dutch (Netherlands)          | nlNL   | dateNlNL    | 2.29.0  |
| Norwegian Nynorsk (Norway)   | nnNO   | dateNnNO    |         |
| Punjabi (India)              | paIN   | datePaIN    |         |
| Polish (Poland)              | plPL   | datePlPL    | 2.25.2  |
| Portuguese (Brazil)          | ptBR   | datePtBR    | 2.28.1  |
| Portuguese (Portugal)        | ptPT   | datePtPT    |         |
| Romansh (Switzerland)        | rmCH   | dateRmCH    |         |
| Romanian (Romania)           | roRO   | dateRoRO    |         |
| Russian                      | ruRU   | dateRuRU    |         |
| Sinhala (Sri Lanka)          | siLK   | dateSiLK    |         |
| Slovak                       | skSK   | dateSkSK    | 2.25.3  |
| Slovenian (Slovenia)         | slSI   | dateSlSI    |         |
| Albanian (Albania)           | sqAL   | dateSqAL    |         |
| Serbian (Serbia)             | srRS   | dateSrRS    |         |
| Swedish                      | svSE   | dateSvSE    | 2.35.0  |
| Swahili (Kenya)              | swKE   | dateSwKE    |         |
| Tamil (India)                | taIN   | dateTaIN    |         |
| Telugu (India)               | teIN   | dateTeIN    |         |
| Thai (Thailand)              | thTH   | dateThTH    | 2.27.0  |
| Turkish                      | trTR   | dateTrTR    | 2.34.0  |
| Uyghur (China)               | ugCN   | dateUgCN    |         |
| Ukrainian                    | ukUA   | dateUkUA    |         |
| Urdu (Pakistan)              | urPK   | dateUrPK    |         |
| Uzbek (Uzbekistan)           | uzUZ   | dateUzUZ    | 2.39.0  |
| Vietnamese (Vietnam)         | viVN   | dateViVN    | 2.30.7  |
| Chinese (Simplified)         | zhCN   | dateZhCN    |         |
| Chinese (Traditional)        | zhTW   | dateZhTW    |         |
| Zulu (South Africa)          | zuZA   | dateZuZA    |         |

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
