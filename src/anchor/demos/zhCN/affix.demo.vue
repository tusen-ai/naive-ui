<markdown>
# 固定

在固定模式下，Anchor 还接受和 Affix 一样的 Props。
</markdown>

<template>
  <div style="height: 200px">
    <n-anchor
      affix
      listen-to=".document-scroll-container"
      :trigger-top="24"
      :top="88"
      style="z-index: 1"
      :bound="24"
    >
      <n-anchor-link title="演示" href="#演示">
        <n-anchor-link title="基础用法" href="#basic.vue" />
        <n-anchor-link title="忽略间隔" href="#ignore-gap.vue" />
        <n-anchor-link title="固定" href="#affix.vue" />
        <n-anchor-link title="滚动到" href="#scrollto.vue" />
      </n-anchor-link>
      <n-anchor-link title="API" href="#API" />
    </n-anchor>
  </div>
</template>
