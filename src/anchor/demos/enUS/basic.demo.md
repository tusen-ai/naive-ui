# Basic

```html
<n-space style="margin-bottom: 12px;">
  <n-switch v-model:value="showRail" /> Show Rail
  <n-switch v-model:value="showBackground" /> Show Background
</n-space>
<n-anchor>
  <n-anchor-link title="Demos" href="#Demos">
    <n-anchor-link title="Basic" href="#basic" />
    <n-anchor-link title="Ignore-Gap" href="#ignore-gap" />
    <n-anchor-link title="Affix" href="#affix" />
    <n-anchor-link title="Scroll To" href="#scrollto" />
  </n-anchor-link>
  <n-anchor-link title="Props" href="#Props" />
</n-anchor>
```

```js
import { ref } from 'vue'

export default {
  setup () {
    return {
      showRail: ref(true),
      showBackground: ref(true)
    }
  }
}
```
