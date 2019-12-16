# Scroll To
```html
<div style="height: 200px; padding-left: 200px;">
  <n-anchor affix :offset-top="24" :top="88" style="z-index: 1;" ref="anchor">
    <n-anchor-link title="The Narrator" href="#the-narrator"/>
    <n-anchor-link title="The Narrator's Shadow" href="#the-narrator-s-shadow"/>
    <n-anchor-link title="The Gatekeeper" href="#the-gatekeeper"/>
    <n-anchor-link title="The Librarian" href="#the-librarian">
      <n-anchor-link title="The Colonel" href="#the-colonel"/>
      <n-anchor-link title="The Caretaker" href="#the-caretaker"/> 
    </n-anchor-link>
  </n-anchor>
</div>
<div style="padding-left: 400px;">
  <n-button @click="scrollTo('#the-librarian')">Librarian</n-button>
  <n-button @click="scrollTo('#the-caretaker')">Caretaker</n-button>
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
