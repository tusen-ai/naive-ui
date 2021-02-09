# Prefix & Suffix

Fill content in prefix or suffix of the input.

```html
<n-space vertical>
  <n-input placeholder="Search">
    <template #prefix>
      <n-icon>
        <search-outline />
      </n-icon>
    </template>
  </n-input>
  <n-input round placeholder="1,400,000">
    <template #suffix> $ </template>
  </n-input>
  <n-input round placeholder="Search">
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
