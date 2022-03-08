<markdown>
# Absolute position

All layout components can use absolute positioning. It can be used when you want content scrolling inside fixed area.
</markdown>

<template>
  <div style="height: 360px; position: relative">
    <n-layout position="absolute">
      <n-layout-header style="height: 64px; padding: 24px" bordered>
        Yiheyuan Road
      </n-layout-header>
      <n-layout has-sider position="absolute" style="top: 64px; bottom: 64px">
        <n-layout-sider bordered content-style="padding: 24px;">
          Handian Bridge
        </n-layout-sider>
        <n-layout content-style="padding: 24px;">
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
        bordered
        position="absolute"
        style="height: 64px; padding: 24px"
      >
        城府路
      </n-layout-footer>
    </n-layout>
  </div>
</template>
