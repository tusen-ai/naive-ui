# 前缀 & 后缀
在前缀后缀添加内容。
```html
<n-input v-model="value" placeholder="搜索">
  <template v-slot:prefix>
    <n-icon>
      <search-outline/>
    </n-icon>
  </template>
</n-input>
<n-input v-model="value" round placeholder="100,000,000">
  <template v-slot:suffix>
    元
  </template>
</n-input>
<n-input v-model="value" round placeholder="搜索">
  <template v-slot:suffix>
    <n-icon>
      <search-outline/>
    </n-icon>
  </template>
</n-input>
```
```js
import searchOutline from 'naive-ui/lib/icons/search-outline'

export default {
  components: {
    searchOutline
  },
  data() {
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