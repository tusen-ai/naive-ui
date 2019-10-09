# Processing
Set `processing` prop to indicate it is processing.
```html
<n-badge dot processing>
  <div class="block" />
</n-badge>
<n-badge :value="20" processing>
  <div class="block" />
</n-badge>
<n-badge dot type="info" processing>
  <div class="block" />
</n-badge>
```
```css
.n-badge {
  margin: 0 32px 8px 0;
}
.block {
  width: 32px;
  height: 32px;
  background-color: #dddddd;
  border-radius: 4px;
  transition: background-color .3s cubic-bezier(.4, 0, .2, 1);
}
.n-dark-theme .block {
  background-color: rgba(255, 255, 255, .15);
}
```