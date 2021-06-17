# 固定

在固定模式下，Anchor 还接受和 Affix 一样的 Props。

```html
<div style="height: 200px;">
  <n-anchor affix :trigger-top="24" :top="88" style="z-index: 1;" :bound="24">
    <n-anchor-link title="演示" href="#演示">
      <n-anchor-link title="基础用法" href="#basic" />
      <n-anchor-link title="忽略间隔" href="#ignore-gap" />
      <n-anchor-link title="固定" href="#affix" />
      <n-anchor-link title="滚动到" href="#scrollto" />
    </n-anchor-link>
    <n-anchor-link title="Props" href="#Props" />
  </n-anchor>
</div>
```
