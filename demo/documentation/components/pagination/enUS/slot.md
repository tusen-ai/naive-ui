# Slot
```html
<n-pagination
  v-model="page"
  :page-count="100"
/>
<n-pagination
  v-model="page"
  :page-count="100"
  :page-slot="8"
/>
<n-pagination
  v-model="page"
  :page-count="100"
  :page-slot="7"
/>
```

```js
export default {
  data () {
    return {
      page: 2
    }
  }
}
```

```css
.n-pagination {
  margin-bottom: 12px;
}
```