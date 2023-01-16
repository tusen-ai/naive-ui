<markdown>
# Affix

When in affix mode, Anchor can recieve addition props as same as Affix.
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
      <n-anchor-link title="Demos" href="#Demos">
        <n-anchor-link title="Basic" href="#basic.vue" />
        <n-anchor-link title="Ignore-Gap" href="#ignore-gap.vue" />
        <n-anchor-link title="Affix" href="#affix.vue" />
        <n-anchor-link title="Scroll To" href="#scrollto.vue" />
      </n-anchor-link>
      <n-anchor-link title="API" href="#API" />
    </n-anchor>
  </div>
</template>
