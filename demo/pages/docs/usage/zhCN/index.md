<!--anchor:on-->

# 使用方式

## 快速开始

### 直接引入

直接引入组件并使用

```html
<template>
  <n-button>naive-ui</n-button>
</template>

<script>
  import { NButton } from 'naive-ui'

  export default {
    components: {
      NButton
    }
  }
</script>
```

### 全量引入（不推荐）

失去 tree-shaking 的能力，打包有冗余代码。

```js
import { createApp } from 'vue'
import naive from 'naive-ui'

const app = createApp(App)
app.use(naive)
```

## 配置字体

naive ui 可以和 [vfonts](https://github.com/07akioni/vfonts) 配合，你可以简单的引入 `vfonts` 中的字体，包含常规字体和等宽字体。

```js
import { createApp } from 'vue'
import naive from 'naive-ui'

// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'

const app = createApp()
app.use(naive)
```

## 按需引入（Tree Shaking）

naive-ui 支持 tree shaking，组件、语言、主题均可 tree-shaking。

默认情况组件主题为亮色，语言为英文，无需额外导入。

了解更多关于主题设定的信息，参见[调整主题](customize-theme)。

```html
<script>
  import { NConfigProvider, NButton, NDatePicker } from 'naive-ui'
  // theme
  import { createTheme, buttonDark, datePickerDark } from 'naive-ui'
  // locale & dateLocale
  import { zhCN, dateZhCN } from 'naive-ui'

  ...
</script>

<template>
  <n-config-provider :theme="darkTheme" :locale="zhCN" :date-locale="enUS">
    <n-button>naive-ui</n-button>
    <n-date-picker />
  </n-config-provider>
</template>
```

### 全局安装

不推荐，对类型提示不友好

```js
import { createApp } from 'vue'
import {
  // create naive ui
  create,
  // component
  NButton
} from 'naive-ui'

const naive = create({
  components: [NButton]
})

const app = createApp()
app.use(naive)
```
