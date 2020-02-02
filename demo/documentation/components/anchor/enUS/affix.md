# Affix
When in affix mode, Anchor can recieve addition props as same as Affix.
```html
<div style="height: 200px;">
  <n-anchor affix :offset-top="24" :top="88" style="z-index: 1;" :bound="24">
    <n-anchor-link title="Demos" href="#Demos">
      <n-anchor-link title="Basic" href="#basic"/>
      <n-anchor-link title="Affix" href="#affix"/>
      <n-anchor-link title="Scroll To" href="#scrollto"/>
    </n-anchor-link>
    <n-anchor-link title="Props" href="#Props" />
  </n-anchor>
</div>
```