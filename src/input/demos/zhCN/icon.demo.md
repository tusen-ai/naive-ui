# 前缀 & 后缀

在前缀后缀添加内容。

```html
<n-space vertical>
  <n-input placeholder="搜索">
    <template #prefix>
      <n-icon>
        <search-outline />
      </n-icon>
    </template>
  </n-input>
  <n-input round placeholder="100,000,000">
    <template #suffix> 元 </template>
  </n-input>
  <n-input round placeholder="搜索">
    <template #suffix>
      <n-icon>
        <search-outline />
      </n-icon>
    </template>
  </n-input>
</n-space>
```

```js
import { SearchOutline } from '@vicons/ionicons5'

export default {
  components: {
    SearchOutline
  }
}
```
