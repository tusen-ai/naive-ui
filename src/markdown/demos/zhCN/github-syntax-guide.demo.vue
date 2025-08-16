<markdown>
# Github Alerts
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const options = {
  isBreaks: true
}

const markdownText = ref(`

## Github Alerts

> [!NOTE]
> Highlights information that users should take into account, even when skimming.

> [!TIP]
> Optional information to help a user be more successful.

> [!IMPORTANT]
> Crucial information necessary for users to succeed.

> [!WARNING]
> Critical content demanding immediate user attention due to potential risks.

> [!CAUTION]
> Negative potential consequences of an action.

## Github Tasks

- [x] 架构选型 unified 渲染markdown
- [x] 实现hast转换vnode
- [x] 实现自定义组件映射
- [x] 实现自定义插件
- [x] 提出unified 相关插件分包
- [x] 高亮
- [ ] 代码框折叠
- [ ] 引文
- [ ] 图片组预览
- [ ] Mermaid
`)
</script>

<template>
  <n-markdown :content="markdownText" v-bind="options" />
</template>
