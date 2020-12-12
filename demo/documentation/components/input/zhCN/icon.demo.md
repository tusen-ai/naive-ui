# 前缀 & 后缀

在前缀后缀添加内容。

```html
<n-space vertical>
  <n-input v-model:value="value" placeholder="搜索">
    <template v-slot:prefix>
      <n-icon>
        <search-outline />
      </n-icon>
    </template>
  </n-input>
  <n-input v-model:value="value" round placeholder="100,000,000">
    <template v-slot:suffix> 元 </template>
  </n-input>
  <n-input v-model:value="value" round placeholder="搜索">
    <template v-slot:suffix>
      <n-icon>
        <search-outline />
      </n-icon>
    </template>
  </n-input>
</n-space>
```

```js
import { SearchOutline } from '@vicons/ionicons-v5'

export default {
  components: {
    SearchOutline
  },
  data() {
    return {
      value: null
    }
  }
}
```
