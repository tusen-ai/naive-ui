# Import on Demand (Tree Shaking)

Naive UI support tree shaking for components, locales and themes.

By default the component theme is light, locale is enUS, no extra imports is needed.

For more info about theming, see [Customizing Theme](customize-theme).


## On-demand Import(Auto)

If you develop using the template approach, you can use the `unplugin-vue-components` plugin to automatically load components on demand.

The plugin will automatically parse the components used in the template and import the components.

```ts
// vite.config.ts
import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    Components({
      resolvers: [
        NaiveUiResolver()
      ]
    })
  ]
});
```
Note: This method does not work with composables such as `useMessage`, and the user still needs to import the corresponding composable manually.

`import { useMessage } from 'naive-ui'`

## Import Directly(Manual)

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

## Install on Demand Globally (Manually)

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
