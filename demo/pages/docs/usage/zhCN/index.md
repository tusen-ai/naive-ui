<!--anchor:on-->

# 使用方式

## 快速开始

在你项目的 javascript 入口文件添加下列代码。

```js
import { createApp } from 'vue'
import naive from 'naive-ui'

const app = createApp()
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

naive-ui 支持 tree shaking，你可以使用直接引入或全局安装的方式的方式。

### 直接引入

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

### 全局安装

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
