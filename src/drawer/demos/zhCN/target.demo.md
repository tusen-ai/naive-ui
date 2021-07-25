# 显示在指定区域

```html
<n-button-group>
  <n-button @click="activate('top')">上</n-button>
  <n-button @click="activate('right')">右</n-button>
  <n-button @click="activate('bottom')">下</n-button>
  <n-button @click="activate('left')">左</n-button>
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
  显示区域
</div>
<n-drawer
  v-model:show="active"
  :width="200"
  :height="200"
  :placement="placement"
  to="#drawer-target"
>
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
