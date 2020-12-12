# Prefix & Suffix

Fill content in prefix or suffix of the input.

```html
<n-space vertical>
  <n-input v-model:value="value" placeholder="Search">
    <template v-slot:prefix>
      <n-icon>
        <search-outline />
      </n-icon>
    </template>
  </n-input>
  <n-input v-model:value="value" round placeholder="1,400,000">
    <template v-slot:suffix> $ </template>
  </n-input>
  <n-input v-model:value="value" round placeholder="Search">
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
  data () {
    return {
      value: null
    }
  }
}
```
