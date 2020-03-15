# 处理中
设定 `processing` 来表明正在处理。
```html
<n-badge dot processing>
  <n-avatar />
</n-badge>
<n-badge :value="20" processing>
  <n-avatar />
</n-badge>
<n-badge dot type="info" processing>
  <n-avatar />
</n-badge>
```
```css
.n-badge {
  margin: 0 32px 8px 0;
}
```