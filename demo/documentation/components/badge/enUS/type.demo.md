# Type
Badge has `default`, `error`, `info`, `success`, `warning` types.
```html
<n-badge dot>
  <n-avatar />
</n-badge>
<n-badge dot type="error">
  <n-avatar />
</n-badge>
<n-badge dot type="info">
  <n-avatar />
</n-badge>
<n-badge dot type="success">
  <n-avatar />
</n-badge>
<n-badge dot type="warning">
  <n-avatar />
</n-badge>
```
```js
export default {
  data() {
    return {
      value: 10
    };
  }
};
```
```css
.n-badge {
  margin: 0 32px 8px 0;
}
```