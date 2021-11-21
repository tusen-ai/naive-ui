# Word limit

Don't waste words.

```html
<n-space vertical>
  <n-input maxlength="30" show-count clearable />
  <n-input default-value="Yes" show-count #count="{ value }" clearable>
    {{ value.includes('Yes') ? '99+' : value.length }}
  </n-input>
  <n-input type="textarea" maxlength="30" show-count />
  <n-input type="textarea" show-count #count="{ value }">
    <n-input type="textarea" default-value="What" show-count #count="{ value }">
      {{ value.includes('What') ? '99+' : value.length }}
    </n-input>
  </n-input>
</n-space>
```
