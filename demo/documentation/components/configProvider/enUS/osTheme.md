# Use OS Theme
Naive-ui provides `$NOs.theme` property to get the current theme of your OS.
```html
<n-config-provider :theme="$NOs.theme">
  <n-card>
    Your current system theme is {{ JSON.stringify($NOs.theme) }}.
  </n-card>
</n-config-provider>
```
