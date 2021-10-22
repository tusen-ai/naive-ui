# Line debug

```html
<n-button @click="name = 'the beatles'">Set Name to the Beatles</n-button>

<n-card title="song" style="margin-bottom: 16px;">
  <n-tabs v-model:value="name">
    <n-tab-pane name="oasis" tab="Oasis"> Wonderwall </n-tab-pane>
    <n-tab-pane name="the beatles" tab="the Beatles"> Hey Jude </n-tab-pane>
    <n-tab-pane name="jay chou" tab="jay chou"> 七里香 </n-tab-pane>
  </n-tabs>
</n-card>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      name: ref('oasis')
    }
  }
})
```

```css
.n-button {
  margin-top: 12px;
}
```
