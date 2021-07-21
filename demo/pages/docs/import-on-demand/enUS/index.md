# Import on Demand (Tree Shaking)

Naive UI support tree shaking for components, locales and themes.

By default the component theme is light, locale is enUS, no extra imports is needed.

For more info about theming, see [Customizing Theme](customize-theme).

## Import Directly

```html
<script>
  import { defineComponent } from 'vue'
  import { NConfigProvider, NInput, NDatePicker, NSpace } from 'naive-ui'
  // theme
  import { createTheme, inputDark, datePickerDark } from 'naive-ui'
  // locale & dateLocale
  import { zhCN, dateZhCN } from 'naive-ui'

  export default defineComponent({
    components: {
      NConfigProvider,
      NInput,
      NDatePicker,
      NSpace
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

## Install on Demand Globally

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

After the installation. You can use the components you installed in SFC like this.

```html
<template>
  <n-button>naive-ui</n-button>
</template>
```
