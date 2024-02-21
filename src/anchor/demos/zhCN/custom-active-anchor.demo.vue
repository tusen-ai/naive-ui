<markdown>
# 自定义高亮的锚点

即使滚到底了，点击锚点链接依然能高亮。
</markdown>

<template>
  <div style="height: 200px">
    <n-anchor
      affix
      listen-to=".document-scroll-container"
      :trigger-top="288"
      :top="288"
      offset-target="#doc-layout"
      ignore-gap
      :get-current-anchor="getCurrentAnchor"
      style="z-index: 1"
    >
      <n-anchor-link title="演示" href="#演示">
        <n-anchor-link title="基础用法" href="#basic.vue" />
        <n-anchor-link title="忽略间隔" href="#ignore-gap.vue" />
        <n-anchor-link title="固定" href="#affix.vue" />
        <n-anchor-link
          title="自定义导航高亮"
          href="#custom-active-anchor.vue"
        />
        <n-anchor-link title="滚动到" href="#scrollto.vue" />
      </n-anchor-link>
      <n-anchor-link title="API" href="#API" />
      <n-anchor-link title="Anchor Props" href="#Anchor-Props" />
      <n-anchor-link title="Anchor Methods" href="#Anchor-Methods" />
    </n-anchor>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      getCurrentAnchor (activeHref: string | null) {
        return activeHref
      }
    }
  }
})
</script>
