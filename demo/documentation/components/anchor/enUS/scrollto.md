# Scroll To
```html
<div style="height: 200px; padding-left: 200px;">
  <n-anchor affix :offset-top="24" :top="88" :bound="24" style="z-index: 1;" ref="anchor">
    <n-anchor-link title="Demos" href="#Demos">
      <n-anchor-link title="Basic" href="#basic"/>
      <n-anchor-link title="Affix" href="#affix"/>
      <n-anchor-link title="Scroll To" href="#scrollto"/>
    </n-anchor-link>
    <n-anchor-link title="Props" href="#Props" />
  </n-anchor>
</div>
<div style="padding-left: 400px;">
  <n-button @click="scrollTo('#basic')">Basic</n-button>
  <n-button @click="scrollTo('#affix')">Affix</n-button>
</div>
```
```js
export default {
  methods: {
    scrollTo (href) {
      this.$refs.anchor.scrollTo(href)
    }
  }
}
```
```css
.n-button {
  margin: 0 8px 12px 0;
}
```
