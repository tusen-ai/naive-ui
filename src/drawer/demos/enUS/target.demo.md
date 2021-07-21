# Target

```html
<n-button-group>
  <n-button @click="activate('top')">Top</n-button>
  <n-button @click="activate('right')">Right</n-button>
  <n-button @click="activate('bottom')">Bottom</n-button>
  <n-button @click="activate('left')">Left</n-button>
</n-button-group>
<div
  id="drawer-target"
  style="
    position:relative;
    width: 100%;
    height: 300px;
    border: 1px solid rgba(128, 128, 128, .2);
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  "
>
  Target Area
</div>
<n-drawer
  v-model:show="active"
  :width="200"
  :height="200"
  :placement="placement"
  to="#drawer-target"
>
  <n-drawer-content title="Stoner">
    Stoner is a 1965 novel by the American writer John Williams.
  </n-drawer-content>
</n-drawer>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const active = ref(false)
    const placement = ref('right')
    const activate = (place) => {
      active.value = true
      placement.value = place
    }
    return {
      active,
      placement,
      activate
    }
  }
})
```
