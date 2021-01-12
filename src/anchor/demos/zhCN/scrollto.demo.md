# 滚动到

```html
<div style="height: 200px; padding-left: 200px;">
  <n-anchor
    affix
    :offset-top="24"
    :top="88"
    :bound="24"
    style="z-index: 1;"
    ref="anchor"
  >
    <n-anchor-link title="演示" href="#演示">
      <n-anchor-link title="基础用法" href="#basic" />
      <n-anchor-link title="忽略间隔" href="#ignore-gap" />
      <n-anchor-link title="固定" href="#affix" />
      <n-anchor-link title="滚动到" href="#scrollto" />
    </n-anchor-link>
    <n-anchor-link title="Props" href="#Props" />
  </n-anchor>
</div>
<n-space style="padding-left: 400px;">
  <n-button @click="scrollTo('#basic')">基础用法</n-button>
  <n-button @click="scrollTo('#affix')">固定</n-button>
</n-space>
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
