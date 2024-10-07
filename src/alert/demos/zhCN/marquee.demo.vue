<markdown>
# 消息轮播

使用 `marquee` 属性实现消息轮播。使用 `marquee-speed` 属性可以控制轮播速度。
</markdown>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  components: {}
})
</script>

<template>
  <n-flex vertical>
    <n-alert type="info" marquee>
      Naive UI 是一个 Vue3 的组件库，比较完整，主题可调，使用 TypeScript, 快,
      有超过 90 个组件, 顺便一提，它们全都可以 treeshaking。 我们提供了一个使用
      TypeScript 构建的先进的类型安全主题系统， 全量使用 TypeScript 编写，和你的
      TypeScript 项目无缝衔接。
    </n-alert>

    <n-alert type="info" marquee :marquee-speed="15">
      Naive UI 是一个 Vue3 的组件库，比较完整，主题可调，使用 TypeScript, 快,
      有超过 90 个组件, 顺便一提，它们全都可以 treeshaking。 我们提供了一个使用
      TypeScript 构建的先进的类型安全主题系统， 全量使用 TypeScript 编写，和你的
      TypeScript 项目无缝衔接。
    </n-alert>
  </n-flex>
</template>
