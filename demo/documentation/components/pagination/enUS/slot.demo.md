# Page Slot
The pagination has a property `page-slot`, try it and you will understand. It aims to solving misclicks caused by the length changing of pagination.
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