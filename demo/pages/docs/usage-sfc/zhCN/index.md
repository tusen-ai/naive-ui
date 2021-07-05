<!--anchor:on-->

# 在 SFC 中使用

你可以选择直接引入或全局安装在 Vue App 中。

## 直接引入（推荐）

你可以直接导入组件并使用它。这种情况下，只有导入的组件才会被打包。

如果你想知道如何按需引入主题和语言包，请参考[按需引入](import-on-demand)。

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

如果你可以使用 setup script，你可以用下面的方式使用组件。

```html
<template>
  <n-button>naive-ui</n-button>
</template>

<script setup>
  import { NButton } from 'naive-ui'
</script>
```

## 全局安装（不推荐）

### 安装全部组件

失去 tree-shaking 的能力，打包有冗余代码。

如果你想全局安装但是不想安装全部组件，请参考[按需引入](import-on-demand)。

```js
import { createApp } from 'vue'
import naive from 'naive-ui'

const app = createApp(App)
app.use(naive)
```

安装后，你可以这样在 SFC 中使用全部组件。

```html
<template>
  <n-button>naive-ui</n-button>
</template>
```
