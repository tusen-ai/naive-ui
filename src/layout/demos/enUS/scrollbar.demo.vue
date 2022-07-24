<markdown>
# Use built-in scrollbar

Sometimes you will find native scrollbar doesn't meet the style of naive-ui. You can use built-in scrollbar of naive-ui (on `n-layout-sider`, `n-layout` or `n-content`).
</markdown>

<template>
  <n-layout style="height: 360px">
    <n-layout-header style="height: 64px; padding: 24px" bordered>
      Yiheyuan Road
    </n-layout-header>
    <n-layout position="absolute" style="top: 64px; bottom: 64px" has-sider>
      <n-layout-sider
        content-style="padding: 24px;"
        :native-scrollbar="false"
        bordered
      >
        <n-h2>Handian Bridge</n-h2>
        <n-h2>Handian Bridge</n-h2>
        <n-h2>Handian Bridge</n-h2>
        <n-h2>Handian Bridge</n-h2>
        <n-h2>Handian Bridge</n-h2>
        <n-h2>Handian Bridge</n-h2>
        <n-h2>Handian Bridge</n-h2>
        <n-h2>Handian Bridge</n-h2>
        <n-h2>Handian Bridge</n-h2>
        <n-h2>Handian Bridge</n-h2>
        <n-h2>Handian Bridge</n-h2>
        <n-h2>Handian Bridge</n-h2>
      </n-layout-sider>
      <n-layout content-style="padding: 24px;" :native-scrollbar="false">
        <n-h2>Pingshan Road</n-h2>
        <n-h2>Pingshan Road</n-h2>
        <n-h2>Pingshan Road</n-h2>
        <n-h2>Pingshan Road</n-h2>
        <n-h2>Pingshan Road</n-h2>
        <n-h2>Pingshan Road</n-h2>
        <n-h2>Pingshan Road</n-h2>
        <n-h2>Pingshan Road</n-h2>
        <n-h2>Pingshan Road</n-h2>
        <n-h2>Pingshan Road</n-h2>
        <n-h2>Pingshan Road</n-h2>
        <n-h2>Pingshan Road</n-h2>
      </n-layout>
    </n-layout>
    <n-layout-footer
      position="absolute"
      style="height: 64px; padding: 24px"
      bordered
    >
      城府路
    </n-layout-footer>
  </n-layout>
</template>
