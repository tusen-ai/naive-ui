# 前缀 & 后缀
在前缀后缀添加内容。
```html
<n-input v-model="value" placeholder="搜索">
  <template v-slot:prefix>
    <n-icon>
      <md-search/>
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
      <md-search/>
    </n-icon>
  </template>
</n-input>
```
```js
import mdSearch from 'naive-ui/lib/icons/md-search'

export default {
  components: {
    mdSearch
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