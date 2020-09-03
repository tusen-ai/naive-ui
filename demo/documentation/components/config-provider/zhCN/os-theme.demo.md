# 使用操作系统主题
Naive-ui 提供 `$NOs.theme` 属性来获取当前操作系统的主题。
```html
<n-config-provider :theme="$NOs.theme">
  <n-card>
    当前操作系统的主题是 {{ JSON.stringify($NOs.theme) }}。
  </n-card>
</n-config-provider>
```
