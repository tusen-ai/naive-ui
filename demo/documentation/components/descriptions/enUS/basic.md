# Basic
```html
<n-descriptions label-placement="top" header="Description">
  <n-descriptions-item>
    <template v-slot:label>
      Breakfast
    </template>
    Apple
  </n-descriptions-item>
  <n-descriptions-item label="Brunch">
    Apple
  </n-descriptions-item>
  <n-descriptions-item label="Lunch">
    Apple
  </n-descriptions-item>
  <n-descriptions-item label="Supper" :span="2">
    Two<br>
    Apples
  </n-descriptions-item>
  <n-descriptions-item label="Midnight Snack">
    Apple
  </n-descriptions-item>
</n-descriptions>
```