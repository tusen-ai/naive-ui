# 图标

添加图标

```html
<n-input v-model:value="value" placeholder="搜索" clearable>
  <template v-slot:prefix>
    <n-icon>
      <md-search />
    </n-icon>
  </template>
</n-input>
<n-input v-model:value="value" placeholder="搜索" clearable>
  <template v-slot:suffix> DOLLAR </template>
</n-input>
<n-input v-model:value="value" round placeholder="搜索" size="small" clearable>
  <template v-slot:suffix>
    <n-icon>
      <md-search />
    </n-icon>
  </template>
  <template v-slot:prefix>
    <n-icon>
      <md-search />
    </n-icon>
  </template>
</n-input>
<n-input v-model:value="value" placeholder="搜索" size="large" clearable>
  <template v-slot:suffix>
    <n-icon>
      <md-search />
    </n-icon>
  </template>
  <template v-slot:prefix>
    <n-icon>
      <md-search />
    </n-icon>
  </template>
</n-input>
<n-input v-model:value="value" placeholder="搜索" size="small" clearable>
  <template v-slot:suffix>
    <n-icon>
      <md-search />
    </n-icon>
  </template>
  <template v-slot:prefix>
    <n-icon>
      <md-search />
    </n-icon>
  </template>
</n-input>
<n-input
  v-model:value="value"
  placeholder="搜索"
  pair
  size="large"
  separator="-"
  clearable
>
  <template v-slot:suffix>
    <n-icon>
      <md-search />
    </n-icon>
  </template>
  <template v-slot:prefix>
    <n-icon>
      <md-search />
    </n-icon>
  </template>
</n-input>
<n-input
  v-model:value="value"
  placeholder="搜索"
  pair
  size="small"
  separator="-"
  clearable
>
  <template v-slot:suffix>
    <n-icon>
      <md-search />
    </n-icon>
  </template>
  <template v-slot:prefix>
    <n-icon>
      <md-search />
    </n-icon>
  </template>
</n-input>
<n-input v-model:value="value" round placeholder="搜索" size="large" clearable>
  <template v-slot:suffix>
    <n-icon>
      <md-search />
    </n-icon>
  </template>
  <template v-slot:prefix>
    <n-icon>
      <md-search />
    </n-icon>
  </template>
</n-input>
<n-input v-model:value="value" round placeholder="搜索" clearable>
  <template v-slot:suffix>
    <n-icon>
      <md-search />
    </n-icon>
  </template>
</n-input>
```

```js
import { MdSearch } from '@vicons/ionicons-v4'

export default {
  components: {
    MdSearch
  },
  data () {
    return {
      value: null
    }
  }
}
```

```css
.n-input {
  margin-bottom: 8px;
}
```
