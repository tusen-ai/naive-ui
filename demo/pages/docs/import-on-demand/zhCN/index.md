# 按需引入（Tree Shaking）

Naive UI 支持 tree shaking，组件、语言、主题均可 tree-shaking。

默认情况组件主题为亮色，语言为英文，无需额外导入。

了解更多关于主题设定的信息，参见[调整主题](customize-theme)。

## 手动引入

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

## 自动引入

可以使用 `unplugin-auto-import` 插件来自动导入 API。

如果使用模板方式进行开发，可以使用 `unplugin-vue-components` 插件来按需自动加载组件，插件会自动解析模板中的使用到的组件，并导入组件。

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar'
          ]
        }
      ]
    }),
    Components({
      resolvers: [NaiveUiResolver()]
    })
  ]
})
```

## 按需全局安装组件（手动）

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

安装后，你可以这样在 SFC 中使用你安装的组件。

```html
<template>
  <n-button>naive-ui</n-button>
</template>
```
