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

| 语言                       | 配置  | 日期配置  | 版本   |
| -------------------------- | ----- | --------- | ------ |
| 南非荷兰语（南非）         | afZA  | dateAfZA  |        |
| 阿姆哈拉语（埃塞俄比亚）   | amET  | dateAmET  |        |
| 阿拉伯语                   | arDZ  | dateArDZ  | 2.34.0 |
| 阿塞拜疆语                 | azAZ  | dateAzAZ  | 2.39.0 |
| 白俄罗斯语（白俄罗斯）     | beBY  | dateBeBY  |        |
| 保加利亚语（保加利亚）     | bgBG  | dateBgBG  |        |
| 孟加拉语（孟加拉）         | bnBD  | dateBnBD  |        |
| 加泰罗尼亚语（西班牙）     | caES  | dateCaES  |        |
| 捷克语（捷克）             | csCZ  | dateCsCZ  | 2.38.2 |
| 丹麦                       | daDK  | dateDaDK  | 2.43.0 |
| 德语                       | deDE  | dateDeDE  |        |
| 希腊语（希腊）             | elGR  | dateElGR  |        |
| 英国英语                   | enGB  | dateEnGB  | 2.25.1 |
| 英语                       | enUS  | dateEnUS  |        |
| 世界语                     | eo    | dateEo    | 2.25.2 |
| 西班牙语（阿根廷）         | esAR  | dateEsAR  | 2.24.2 |
| 西班牙语（西班牙）         | esES  | dateEsES  |        |
| 爱沙尼亚语                 | etEE  | dateEtEE  | 2.38.0 |
| 巴斯克语（西班牙）         | euES  | dateEuES  |        |
| 波斯语                     | faIR  | dateFaIR  | 2.34.4 |
| 芬兰语（芬兰）             | fiFI  | dateFiFI  |        |
| 菲律宾语（菲律宾）         | filPH | dateFilPH |        |
| 法语                       | frFR  | dateFrFR  |        |
| 加利西亚语（西班牙）       | glES  | dateGlES  |        |
| 古吉拉特语（印度）         | guIN  | dateGuIN  |        |
| 希伯来语（以色列）         | heIL  | dateHeIL  |        |
| 印地语（印度）             | hiIN  | dateHiIN  |        |
| 克罗地亚语（克罗地亚）     | hrHR  | dateHrHR  |        |
| 匈牙利语（匈牙利）         | huHU  | dateHuHU  |        |
| 亚美尼亚语（亚美尼亚）     | hyAM  | dateHyAM  |        |
| 印度尼西亚语               | idID  | dateIdID  |        |
| 冰岛语（冰岛）             | isIS  | dateIsIS  |        |
| 意大利语                   | itIT  | dateItIT  | 2.24.2 |
| 日语                       | jaJP  | dateJaJP  |        |
| 格鲁吉亚语（格鲁吉亚）     | kaGE  | dateKaGE  |        |
| 哈萨克语（哈萨克斯坦）     | kkKZ  | dateKkKZ  |        |
| 高棉语（柬埔寨）           | kmKH  | dateKmKH  | 2.41.0 |
| 卡纳达语（印度）           | knIN  | dateKnIN  |        |
| 韩语                       | koKR  | dateKoKR  | 2.28.1 |
| 吉尔吉斯语（吉尔吉斯斯坦） | kyKG  | dateKyKG  |        |
| 老挝语（老挝）             | loLA  | dateLoLA  |        |
| 立陶宛语（立陶宛）         | ltLT  | dateLtLT  |        |
| 拉脱维亚语（拉脱维亚）     | lvLV  | dateLvLV  |        |
| 马其顿语（北马其顿）       | mkMK  | dateMkMK  |        |
| 马拉雅拉姆语（印度）       | mlIN  | dateMlIN  |        |
| 蒙古语（蒙古）             | mnMN  | dateMnMN  |        |
| 马拉地语（印度）           | mrIN  | dateMrIN  |        |
| 马来语（马来西亚）         | msMY  | dateMsMY  |        |
| 缅甸语（缅甸）             | myMM  | dateMyMM  |        |
| 书面挪威语                 | nbNO  | dateNbNO  |        |
| 尼泊尔语（尼泊尔）         | neNP  | dateNeNP  |        |
| 荷兰语（荷兰）             | nlNL  | dateNlNL  | 2.29.0 |
| 新挪威语                   | nnNO  | dateNnNO  |        |
| 旁遮普语（印度）           | paIN  | datePaIN  |        |
| 波兰语（波兰）             | plPL  | datePlPL  | 2.25.2 |
| 葡萄牙语 (巴西)            | ptBR  | datePtBR  | 2.28.1 |
| 葡萄牙语（葡萄牙）         | ptPT  | datePtPT  |        |
| 罗曼什语（瑞士）           | rmCH  | dateRmCH  |        |
| 罗马尼亚语（罗马尼亚）     | roRO  | dateRoRO  |        |
| 俄罗斯语                   | ruRU  | dateRuRU  |        |
| 僧伽罗语（斯里兰卡）       | siLK  | dateSiLK  |        |
| 斯洛伐克语                 | skSK  | dateSkSK  | 2.25.3 |
| 斯洛文尼亚语（斯洛文尼亚） | slSI  | dateSlSI  |        |
| 阿尔巴尼亚语（阿尔巴尼亚） | sqAL  | dateSqAL  |        |
| 塞尔维亚语（塞尔维亚）     | srRS  | dateSrRS  |        |
| 瑞典語                     | svSE  | dateSvSE  | 2.35.0 |
| 斯瓦希里语（肯尼亚）       | swKE  | dateSwKE  |        |
| 泰米尔语（印度）           | taIN  | dateTaIN  |        |
| 泰卢固语（印度）           | teIN  | dateTeIN  |        |
| 泰语（泰国）               | thTH  | dateThTH  | 2.27.0 |
| 土耳其语                   | trTR  | dateTrTR  | 2.34.0 |
| 维吾尔语                   | ugCN  | dateUgCN  | 2.41.0 |
| 乌克兰语                   | ukUA  | dateUkUA  |        |
| 乌尔都语（巴基斯坦）       | urPK  | dateUrPK  |        |
| 乌兹别克语                 | uzUZ  | dateUzUZ  | 2.39.0 |
| 越南语（越南）             | viVN  | dateViVN  | 2.30.7 |
| 简体中文                   | zhCN  | dateZhCN  |        |
| 繁体中文                   | zhTW  | dateZhTW  |        |
| 祖鲁语（南非）             | zuZA  | dateZuZA  |        |

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
