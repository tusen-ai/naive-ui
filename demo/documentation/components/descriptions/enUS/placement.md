# Label Placement
You can set label placement to 'top' or 'left'
```html
<n-descriptions label-placement="left" title="Description">
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
  <n-descriptions-item label="Supper">
    Apple
  </n-descriptions-item>
  <n-descriptions-item label="Midnight Snack">
    Apple
  </n-descriptions-item>
</n-descriptions>
```