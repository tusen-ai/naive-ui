# 图标
添加图标
```html
<n-input v-model="value" placeholder="搜索">
  <template v-slot:affix>
    <n-icon>
      <md-search/>
    </n-icon>
  </template>
</n-input>
<n-input v-model="value" round placeholder="搜索">
  <template v-slot:affix>
    <n-icon>
      <md-search/>
    </n-icon>
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