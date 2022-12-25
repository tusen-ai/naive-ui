# 公式 Equation

没有人会想到一个组件库会有这种组件，但是作者的一位朋友需要这个。

<n-alert title="注意" type="warning" style="margin-bottom: 16px;" :bordered="false">
  由于包体积原因，Naive UI 不内置 katex。如果你需要使用公式组件，请确保你在使用之前已经设定了 katex。
</n-alert>

下面的代码展示了如何为 Equation 设定 katex。

```html
<template>
  <n-config-provider :katex="katex">
    <my-app />
  </n-config-provider>
</template>

<script>
  import { defineComponent } from 'vue'
  import katex from 'katex'
  import 'katex/dist/katex.css'

  export default defineComponent({
    setup() {
      return {
        katex
      }
    }
  })
</script>
```

## 演示

```demo
basic.vue
katex-options.vue
```

## API

### Equation Props

| 名称          | 类型     | 默认值      | 说明                   | 版本   |
| ------------- | -------- | ----------- | ---------------------- | ------ |
| katex         | `object` | `undefined` | Katex                  | 2.34.0 |
| katex-options | `object` | `undefined` | Katex 公式的配置       | 2.34.0 |
| value         | `string` | `undefined` | Latex 格式的公式表达式 | 2.34.0 |
