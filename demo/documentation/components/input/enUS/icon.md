# Prefix & Suffix
Fill content in prefix or suffix of the input.
```html
<n-input v-model="value" placeholder="Search">
  <template v-slot:prefix>
    <n-icon>
      <md-search/>
    </n-icon>
  </template>
</n-input>
<n-input v-model="value" round placeholder="1,400,000">
  <template v-slot:suffix>
    $
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