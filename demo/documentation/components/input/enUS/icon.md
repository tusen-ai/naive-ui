# Icon
Use icon in input.
```html
<n-input v-model="value" placeholder="Search">
  <template v-slot:affix>
    <n-icon>
      <md-search/>
    </n-icon>
  </template>
</n-input>
<n-input v-model="value" round placeholder="Search">
  <template v-slot:affix>
    <n-icon>
      <md-search/>
    </n-icon>
  </template>
</n-input>
<n-input v-model="value" round placeholder="Search">
  <template v-slot:suffix>
    <n-icon>
      <md-search/>
    </n-icon>
  </template>
</n-input>
```
```js
import mdSearch from 'naive-ui/packages/icons/md-search'

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