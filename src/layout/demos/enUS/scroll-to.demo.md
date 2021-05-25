# Scroll To

```html
<n-space vertical size="large">
  <n-space>
    <n-button @click="$refs.sider.scrollTo({ top: 120, behavior: 'smooth' })">
      Sider scroll to 120px
    </n-button>
    <n-button @click="$refs.content.scrollTo({ top: 120, behavior: 'smooth' })">
      Content scroll to 120px
    </n-button>
  </n-space>
  <n-layout style="height: 360px;">
    <n-layout-header style="height: 64px; padding: 24px;" bordered
      >Yiheyuan Road</n-layout-header
    >
    <n-layout has-sider position="absolute" style="top: 64px; bottom: 64px;">
      <n-layout-sider ref="sider" bordered content-style="padding: 24px;">
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
      <n-layout-content
        ref="content"
        content-style="padding: 24px;"
        :native-scrollbar="false"
      >
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
      </n-layout-content>
    </n-layout>
    <n-layout-footer
      bordered
      position="absolute"
      style="height: 64px; padding: 24px;"
    >
      Chengfu Road
    </n-layout-footer>
  </n-layout>
</n-space>
```
