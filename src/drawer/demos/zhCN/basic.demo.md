# 基础用法

```html
<n-button-group>
  <n-button @click="activate('top')">上</n-button>
  <n-button @click="activate('right')">右</n-button>
  <n-button @click="activate('bottom')">下</n-button>
  <n-button @click="activate('left')">左</n-button>
</n-button-group>
<n-drawer v-model:show="active" :width="502" :placement="placement">
  <n-drawer-content title="斯通纳">
    《斯通纳》是美国作家约翰·威廉姆斯在 1965 年出版的小说。
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
