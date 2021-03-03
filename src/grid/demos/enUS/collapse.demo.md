# Collapse

You can controlled whether to collapse the items that overflows. At the same time you can place at most one `suffix=true` `n-grid-item` as a suffix node. The suffix node will always appear at the end of a row.

Collapsing works in responsive layout.

```html
<n-row>
  <n-form-item-col label="Item Count" span="12">
    <n-input-number v-model:value="gridItemCount" :min="1" />
  </n-form-item-col>
  <n-form-item-col label="Max Rows After Collapsed" span="12">
    <n-input-number v-model:value="gridCollapsedRows" :min="1" />
  </n-form-item-col>
  <n-form-item-col label="Show Suffix Node" span="12">
    <n-switch v-model:value="showSuffix" />
  </n-form-item-col>
  <n-form-item-col label="Grid Collapsed" span="12">
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
      {{ overflow ? 'Node Overflows Exists' : 'No Node Overflows' }}
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
