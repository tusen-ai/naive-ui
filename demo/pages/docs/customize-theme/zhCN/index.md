<!--anchor:on-->

# 调整主题

Naive UI 通过使用 `n-config-provider` 调整主题。

默认情况下所有组件均为亮色主题，无需任何配置。

了解更多关于 `n-config-provider` 的信息，参见 [全局化配置](../components/config-provider)。

## 使用暗色主题

将 `n-config-provider` 的 `theme` 设为从 naive-ui 导入的 `darkTheme` 来设定暗色主题。

若 `theme` 为 `undefined` 则不会影响内部组件的主题。

```html
<template>
  <n-config-provider :theme="darkTheme">
    <app />
  </n-config-provider>
</template>

<script>
  import { defineComponent } from 'vue'
  import { darkTheme } from 'naive-ui'

  export default defineComponent({
    setup() {
      return {
        darkTheme
      }
    }
  })
</script>
```

## 调整主题变量

你不需要写任何 CSS（Scss、Less...）。

配置的全局主题变量会对后代组件生效的主题变量覆盖。

通过设定 `n-config-provider` 的 `theme-overrides` 来调整主题变量。naive-ui 导出了 `GlobalThemeOverrides` 类型帮助你定义主题。

具体可使用变量请参考 `GlobalThemeOverrides` 类型提示。

如果想要查看更多的主题变量，可在 Naive UI 主页的右下角的 edit 按钮查看。

可以修改对应的主题变量，导出后可以拿到 themeOverrides 对象。

```html
<script>
  import { NConfigProvider } from 'naive-ui'

  /**
   * @type import('naive-ui').GlobalThemeOverrides
   */
  const themeOverrides = {
    common: {
      primaryColor: '#FF0000'
    },
    Button: {
      textColor: '#FF0000'
    },
    Select: {
      peers: {
        InternalSelection: {
          textColor: '#FF0000'
        }
      }
    }
    // ...
  }

  // ...
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <my-app />
  </n-config-provider>
</template>
```

## 调整组件主题变量

组件主题变量使用方法同全局主题变量使用方法，并且组件主题变量会覆盖全局主题变量。

```html
<script>

  /**
   * @type import('naive-ui').GlobalThemeOverrides
   */
  const themeOverrides = {
    Button: {
      textColor: '#FF0000'，
      border: '1px solid #FF0000'
    }
  }

  // ...
</script>

<template>
  <n-button :theme-overrides="themeOverrides"> theme </n-button>
</template>
```

## 不同主题下调整主题变量

如果你想要在亮色和暗色上同时使用不同的主题变量，可以来看看这个。

```html
<script>
  import { NConfigProvider, darkTheme } from 'naive-ui'

  /**
   * @type import('naive-ui').GlobalThemeOverrides
   */
  const lightThemeOverrides = {
    common: {
      primaryColor: '#000000'
    }
    // ...
  }

  const darkThemeOverrides = {
    common: {
      primaryColor: '#FFFFFF'
    }
    // ...
  }

  const theme = null
  // ...
</script>

<template>
  <n-config-provider
    :theme="theme"
    :theme-overrides="theme === null ? lightThemeOverrides : darkThemeOverrides"
  >
    <my-app />
  </n-config-provider>
</template>
```

## 同步 body 元素的样式

出于以下原因，你可能需要将某些样式设定在 `document.body` 上。

1. naive-ui 会设定一些非响应式的全局样式（例如字体），它们在默认状况下工作良好，但是不能响应主题的变化。
2. `n-config-provider` 无法将全局样式同步到它以外的地方（例如 body 背景色）。

通过使用 `n-global-style` 可以将常见的全局样式同步到 body 上。在下面的例子中，`n-global-style` 会将 `n-config-provider` 提供的主题同步到 `document.body` 上。

```html
<template>
  <n-config-provider>
    <app />
    <n-global-style />
  </n-config-provider>
</template>
```

## 主题编辑器

naive-ui 提供主题编辑器帮助你方便的编辑主题并导出对应配置。它可以被嵌套于 `n-config-provider` 中。

主题编辑器不包含在全局安装中（`app.use(naive)`）。你需要显式引入来使用它。

```html
<template>
  <n-theme-editor>
    <app />
  </n-theme-editor>
</template>

<script>
  import { defineComponent } from 'vue'
  import { NThemeEditor } from 'naive-ui'

  export default defineComponent({
    components: {
      NThemeEditor
    }
  })
</script>
```
