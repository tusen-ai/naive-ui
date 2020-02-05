# Bordered
If there are too many multiple line fields, you can set it to `bordered`.
```html
<n-descriptions bordered>
  <n-descriptions-item>
    <template v-slot:label>
      Breakfast
    </template>
    Apple
  </n-descriptions-item>
  <n-descriptions-item label="Lunch">
    Apple
  </n-descriptions-item>
  <n-descriptions-item label="Supper">
    Apple
  </n-descriptions-item>
  <n-descriptions-item label="Why Long">
    Why <br> Long <br> Long <br> Long <br> Long <br> Long
  </n-descriptions-item>
  <n-descriptions-item label="Why Long">
    Why <br> Long <br> Long <br> Long <br> Long <br> Long
  </n-descriptions-item>
  <n-descriptions-item label="Why Long">
    Why <br> Long <br> Long <br> Long <br> Long <br> Long
  </n-descriptions-item>
</n-descriptions>
<n-descriptions label-placement="left" bordered>
  <n-descriptions-item>
    <template v-slot:label>
      Breakfast
    </template>
    Apple
  </n-descriptions-item>
  <n-descriptions-item label="Lunch">
    Apple
  </n-descriptions-item>
  <n-descriptions-item label="Supper">
    Apple
  </n-descriptions-item>
  <n-descriptions-item label="Why Long">
    Why <br> Long <br> Long <br> Long <br> Long <br> Long
  </n-descriptions-item>
  <n-descriptions-item label="Why Long">
    Why <br> Long <br> Long <br> Long <br> Long <br> Long
  </n-descriptions-item>
  <n-descriptions-item label="Why Long">
    Why <br> Long <br> Long <br> Long <br> Long <br> Long
  </n-descriptions-item>
</n-descriptions>
```
```css
.n-descriptions {
  margin-top: 16px;
}
```