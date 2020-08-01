# Cover
Card can have a cover.
```html
<n-card title="Card with Cover">
  <template v-slot:cover>
    <img src="https://naiveui.oss-cn-hongkong.aliyuncs.com/07akioni.jpeg">
  </template>
  Card Content
</n-card>
```
```css
.n-card {
  max-width: 300px;
}
```