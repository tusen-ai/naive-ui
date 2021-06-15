# Scroll To

```html
<div style="height: 200px; padding-left: 200px;">
  <n-anchor
    affix
    :trigger-top="24"
    :top="88"
    :bound="24"
    style="z-index: 1;"
    ref="anchorRef"
  >
    <n-anchor-link title="Demos" href="#Demos">
      <n-anchor-link title="Basic" href="#basic" />
      <n-anchor-link title="Ignore-Gap" href="#ignore-gap" />
      <n-anchor-link title="Affix" href="#affix" />
      <n-anchor-link title="Scroll To" href="#scrollto" />
    </n-anchor-link>
    <n-anchor-link title="Props" href="#Props" />
  </n-anchor>
</div>
<n-space style="padding-left: 400px;">
  <n-button @click="scrollTo('#basic')">Basic</n-button>
  <n-button @click="scrollTo('#affix')">Affix</n-button>
</n-space>
```

```js
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup () {
    const anchorRef = ref(null)
    const scrollTo = (href) => {
      anchorRef.value.scrollTo(href)
    }
    return {
      anchorRef,
      scrollTo
    }
  }
})
```
