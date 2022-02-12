<markdown>
# Border

You can set `bordered` on sider、footer、header.
</markdown>

<template>
  <n-layout has-sider>
    <n-layout-sider bordered content-style="padding: 24px;">
      Handian Bridge
    </n-layout-sider>
    <n-layout>
      <n-layout-header bordered>
        Yiheyuan Road
      </n-layout-header>
      <n-layout-content content-style="padding: 24px;">
        Pingshan Road
      </n-layout-content>
      <n-layout-footer bordered>
        Chengfu Road
      </n-layout-footer>
    </n-layout>
  </n-layout>
</template>

<style>
.n-layout-header {
  padding: 24px;
}

.n-layout-footer {
  padding: 24px;
}
</style>
