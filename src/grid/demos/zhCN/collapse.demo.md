# 折叠

你可以控制栅格溢出的行数是否折叠。同时可以放置最多一个 `suffix=true` 的 `n-gi` 作为后缀，后缀节点永远会在一行的最结尾处。

折叠在响应式布局下依然生效。

```html
<n-row>
  <n-form-item-col label="数量" span="12">
    <n-input-number v-model:value="gridItemCount" :min="1" />
  </n-form-item-col>
  <n-form-item-col label="折叠后行数" span="12">
    <n-input-number v-model:value="gridCollapsedRows" :min="1" />
  </n-form-item-col>
  <n-form-item-col label="打开后缀节点" span="12">
    <n-switch v-model:value="showSuffix" />
  </n-form-item-col>
  <n-form-item-col label="折叠栅格" span="12">
    <n-switch v-model:value="gridCollapsed" />
  </n-form-item-col>
</n-row>
<n-grid
  :cols="5"
  :collapsed="gridCollapsed"
  :collapsed-rows="gridCollapsedRows"
>
  <n-gi
    v-for="i in gridItemCount"
    :key="i"
    :class="i % 2 ? 'green' : 'light-green'"
  >
    {{ i }}
  </n-gi>
  <n-gi suffix class="suffix" v-if="showSuffix">
    <template #="{ overflow }">
      {{ overflow ? '存在溢出' : '不存在溢出' }}
    </template>
  </n-gi>
</n-grid>
```

```js
import { ref } from 'vue'

export default {
  setup () {
    return {
      gridCollapsed: ref(false),
      gridCollapsedRows: ref(1),
      gridItemCount: ref(4),
      showSuffix: ref(true)
    }
  }
}
```

```css
.suffix {
  height: 108px;
  border: 1px solid rgba(0, 128, 0, 0.36);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}
.light-green {
  height: 108px;
  background-color: rgba(0, 128, 0, 0.12);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}
.green {
  height: 108px;
  background-color: rgba(0, 128, 0, 0.24);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}
```
